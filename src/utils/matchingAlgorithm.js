// Smart Matching Algorithm for Lost & Found Hub

const calculateTextSimilarity = (str1 = '', str2 = '') => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1.0;
  if (s1.includes(s2) || s2.includes(s1)) return 0.85;

  const words1 = new Set(s1.split(/\s+/));
  const words2 = new Set(s2.split(/\s+/));

  const intersection = new Set([...words1].filter(w => words2.has(w) && w.length > 2));
  const union = new Set([...words1, ...words2]);

  if (union.size === 0) return 0;
  return intersection.size / Math.min(words1.size, words2.size);
};

export const calculateMatchScore = (targetItem, candidateItem) => {
  // Opposites must match (one lost, one found)
  if (targetItem.type === candidateItem.type) return null;
  
  // Category mismatch reduces base match drastically
  const sameCategory = targetItem.category === candidateItem.category;
  if (!sameCategory) return null;

  let totalScore = 0;
  const breakdown = {};

  // 1. Item Name & Brand & Model Similarity (Weight: 35%)
  const nameSim = calculateTextSimilarity(targetItem.item?.name, candidateItem.item?.name);
  const brandSim = calculateTextSimilarity(targetItem.item?.brand, candidateItem.item?.brand);
  const modelSim = calculateTextSimilarity(targetItem.item?.model, candidateItem.item?.model);
  
  const itemMatchScore = Math.max(nameSim, (nameSim * 0.5 + brandSim * 0.3 + modelSim * 0.2));
  breakdown.item = Math.round(itemMatchScore * 100);
  totalScore += itemMatchScore * 0.35;

  // 2. Color Similarity (Weight: 15%)
  const colorSim = calculateTextSimilarity(targetItem.item?.color, candidateItem.item?.color);
  breakdown.color = Math.round(colorSim * 100);
  totalScore += colorSim * 0.15;

  // 3. Location Proximity (Weight: 25%)
  const areaSim = calculateTextSimilarity(targetItem.location?.area, candidateItem.location?.area);
  const citySim = calculateTextSimilarity(targetItem.location?.city, candidateItem.location?.city);
  
  const locationScore = (areaSim * 0.7) + (citySim * 0.3);
  breakdown.location = Math.round(locationScore * 100);
  totalScore += locationScore * 0.25;

  // 4. Time Proximity (Weight: 15%)
  let timeScore = 0.5;
  try {
    const t1 = new Date(targetItem.date).getTime();
    const t2 = new Date(candidateItem.date).getTime();
    const diffDays = Math.abs(t1 - t2) / (1000 * 3600 * 24);
    
    if (diffDays <= 1) timeScore = 1.0;
    else if (diffDays <= 3) timeScore = 0.85;
    else if (diffDays <= 7) timeScore = 0.65;
    else if (diffDays <= 14) timeScore = 0.40;
    else timeScore = 0.20;
  } catch (e) {
    timeScore = 0.5;
  }
  breakdown.time = Math.round(timeScore * 100);
  totalScore += timeScore * 0.15;

  // 5. Description Similarity (Weight: 10%)
  const descSim = calculateTextSimilarity(targetItem.item?.description, candidateItem.item?.description);
  breakdown.description = Math.round(descSim * 100);
  totalScore += descSim * 0.10;

  const overallConfidence = Math.round(totalScore * 100);

  // Return match object only if confidence threshold >= 40%
  if (overallConfidence < 40) return null;

  return {
    candidateId: candidateItem.id,
    candidateItem,
    overallConfidence,
    breakdown
  };
};

export const findMatchesForReport = (targetItem, allReports) => {
  if (!targetItem || !allReports) return [];
  
  const matches = allReports
    .map(report => calculateMatchScore(targetItem, report))
    .filter(Boolean)
    .sort((a, b) => b.overallConfidence - a.overallConfidence);

  return matches;
};
