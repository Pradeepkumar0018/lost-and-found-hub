import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_REPORTS, INITIAL_MYSTERY_ITEMS } from '../data/initialMockData';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { findMatchesForReport } from '../utils/matchingAlgorithm';

const LostFoundContext = createContext();

export const LostFoundProvider = ({ children }) => {
  const [reports, setReports] = useState(() => {
    const saved = getStorageItem('laf_reports', null);
    if (!saved || !Array.isArray(saved) || saved.length < INITIAL_REPORTS.length) {
      return INITIAL_REPORTS;
    }
    return saved;
  });

  const [mysteryItems, setMysteryItems] = useState(() => {
    const saved = getStorageItem('laf_mystery', null);
    if (!saved || !Array.isArray(saved) || saved.length < INITIAL_MYSTERY_ITEMS.length) {
      return INITIAL_MYSTERY_ITEMS;
    }
    return saved;
  });

  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    setStorageItem('laf_reports', reports);
  }, [reports]);

  useEffect(() => {
    setStorageItem('laf_mystery', mysteryItems);
  }, [mysteryItems]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add Lost or Found Report
  const addReport = (reportData) => {
    const prefix = reportData.type === 'lost' ? 'LF' : 'FF';
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randId = Math.floor(1000 + Math.random() * 9000);
    const newId = `${prefix}-${dateStr}-${randId}`;

    const newReport = {
      ...reportData,
      id: newId,
      status: reportData.type === 'lost' ? 'lost' : 'found',
      trail: [
        {
          id: 'tr-' + Date.now(),
          status: reportData.type === 'lost' ? 'lost' : 'found',
          title: reportData.type === 'lost' ? 'Reported Missing' : 'Reported Found',
          location: `${reportData.location.area}, ${reportData.location.city}`,
          timestamp: new Date().toISOString(),
          description: reportData.item.description || 'Report created.',
          contributor: reportData.reporter.name || 'Anonymous Reporter',
          icon: reportData.type === 'lost' ? 'AlertCircle' : 'CheckCircle2'
        }
      ],
      sightings: [],
      claims: [],
      matches: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setReports((prev) => [newReport, ...prev]);
    showToast(`✅ ${reportData.type === 'lost' ? 'Lost' : 'Found'} Report published! ID: ${newId}`);
    return newReport;
  };

  // Update existing Report (Edit flow)
  const updateReport = (reportId, updatedFields) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const updated = {
            ...r,
            item: {
              ...r.item,
              ...(updatedFields.item || {})
            },
            location: {
              ...r.location,
              ...(updatedFields.location || {})
            },
            date: updatedFields.date || r.date,
            time: updatedFields.time || r.time,
            updatedAt: new Date().toISOString()
          };

          // Append an update event to the trail
          const updateEvent = {
            id: 'tr-' + Date.now(),
            status: r.status,
            title: 'Report Details Updated',
            location: `${updated.location.area}, ${updated.location.city}`,
            timestamp: new Date().toISOString(),
            description: updatedFields.editSummary || 'Owner updated item listing details and location notes.',
            contributor: r.reporter?.name || 'Reporter',
            icon: 'FileText'
          };
          updated.trail = [...r.trail, updateEvent];

          return updated;
        }
        return r;
      })
    );
    showToast('✏️ Report updated successfully!');
  };

  // Close / Archive Report
  const closeReport = (reportId) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const closeEvent = {
            id: 'tr-' + Date.now(),
            status: 'closed',
            title: 'Report Closed by Reporter',
            location: `${r.location.area}, ${r.location.city}`,
            timestamp: new Date().toISOString(),
            description: 'Report was closed by the user.',
            contributor: r.reporter?.name || 'Reporter',
            icon: 'CheckCircle'
          };
          return {
            ...r,
            status: 'closed',
            trail: [...r.trail, closeEvent],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
    showToast('🔒 Report has been closed.');
  };

  // Get Report By ID
  const getReportById = (id) => {
    return reports.find((r) => r.id === id);
  };

  // Add Community Sighting to Lost Report
  const addSighting = (reportId, sightingData) => {
    const targetReport = getReportById(reportId);
    if (!targetReport) return false;

    const newSighting = {
      id: 'sg-' + Date.now(),
      ...sightingData,
      timestamp: new Date().toISOString()
    };

    const newTrailEvent = {
      id: 'tr-' + Date.now(),
      status: 'spotted',
      title: `Spotted near ${sightingData.location}`,
      location: sightingData.location,
      timestamp: new Date().toISOString(),
      description: sightingData.notes,
      contributor: `${sightingData.reporterName || 'Community Helper'} (Sighting)`,
      image: sightingData.image,
      icon: 'Eye'
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const updatedTrail = [...r.trail, newTrailEvent];
          const newStatus = r.status === 'lost' ? 'spotted' : r.status;
          return {
            ...r,
            status: newStatus,
            sightings: [newSighting, ...(r.sightings || [])],
            trail: updatedTrail,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    showToast('👀 Community sighting recorded on Missing Trail!');
    return true;
  };

  // Ownership Verification Check
  const verifyOwnershipDetail = (reportId, enteredDetail) => {
    const report = getReportById(reportId);
    if (!report || !report.privateVerificationDetail) return false;

    const actual = report.privateVerificationDetail.toLowerCase().trim();
    const entered = enteredDetail.toLowerCase().trim();

    // Flexible matching comparison
    const isMatch = actual === entered || actual.includes(entered) || entered.includes(actual);

    if (isMatch) {
      const newTrailEvent = {
        id: 'tr-' + Date.now(),
        status: 'verified',
        title: 'Ownership Verified',
        location: 'Secure System Check',
        timestamp: new Date().toISOString(),
        description: 'Private detail verification successful. Identity verified by owner challenge.',
        contributor: 'System Secured',
        icon: 'ShieldCheck'
      };

      setReports((prev) =>
        prev.map((r) => {
          if (r.id === reportId) {
            return {
              ...r,
              status: 'verified',
              trail: [...r.trail, newTrailEvent],
              updatedAt: new Date().toISOString()
            };
          }
          return r;
        })
      );
      showToast('✅ Ownership verified successfully!');
      return true;
    } else {
      showToast('❌ Private detail verification failed. Please check your answer.', 'error');
      return false;
    }
  };

  // Submit Claim on a Found item
  const submitClaim = (reportId, claimData) => {
    const newClaim = {
      id: 'cl-' + Date.now(),
      ...claimData,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            claims: [newClaim, ...(r.claims || [])],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    showToast('✨ Claim submitted! The finder has been notified.');
    return newClaim;
  };

  // Approve a Claim (Finder action)
  const approveClaim = (reportId, claimId) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const updatedClaims = (r.claims || []).map((c) =>
            c.id === claimId ? { ...c, status: 'approved' } : c
          );
          const claimApprovedEvent = {
            id: 'tr-' + Date.now(),
            status: 'verified',
            title: 'Owner Claim Approved by Finder',
            location: `${r.location.area}, ${r.location.city}`,
            timestamp: new Date().toISOString(),
            description: 'Finder verified claimant ownership details and accepted the claim.',
            contributor: r.reporter?.name || 'Finder',
            icon: 'ShieldCheck'
          };
          return {
            ...r,
            status: 'verified',
            claims: updatedClaims,
            trail: [...r.trail, claimApprovedEvent],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
    showToast('🤝 Claim approved! Safe handover can now be coordinated.');
  };

  // Arrange Handover
  const arrangeHandover = (reportId, handoverDetails) => {
    const newTrailEvent = {
      id: 'tr-' + Date.now(),
      status: 'handover',
      title: 'Handover Meeting Arranged',
      location: handoverDetails.meetingLocation,
      timestamp: new Date().toISOString(),
      description: `Meeting scheduled for ${handoverDetails.date} at ${handoverDetails.time}. Public meetup spot: ${handoverDetails.meetingLocation}`,
      contributor: 'Finder & Owner Coordinated',
      icon: 'Handshake'
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status: 'handover',
            handover: {
              ...handoverDetails,
              messages: [
                {
                  id: 'msg-1',
                  sender: 'System Coordinator',
                  text: `Meeting confirmed at ${handoverDetails.meetingLocation} on ${handoverDetails.date} at ${handoverDetails.time}.`,
                  timestamp: new Date().toISOString()
                }
              ]
            },
            trail: [...r.trail, newTrailEvent],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    showToast('🤝 Safe Handover scheduled!');
  };

  // Add Message in simulated handover coordination chat
  const addHandoverMessage = (reportId, messageText, senderName) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId && r.handover) {
          const newMessage = {
            id: 'msg-' + Date.now(),
            sender: senderName || 'User',
            text: messageText,
            timestamp: new Date().toISOString()
          };
          return {
            ...r,
            handover: {
              ...r.handover,
              messages: [...(r.handover.messages || []), newMessage]
            },
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
  };

  // Mark as Returned or Reunited
  const markAsReturned = (reportId) => {
    const report = getReportById(reportId);
    if (!report) return;

    const isPet = report.category === 'pet';
    const finalStatus = isPet ? 'reunited' : 'returned';
    const finalTitle = isPet ? 'Pet Reunited with Family! 🐾' : 'Item Safely Returned to Owner 🔵';

    const newTrailEvent = {
      id: 'tr-' + Date.now(),
      status: finalStatus,
      title: finalTitle,
      location: `${report.location.area}, ${report.location.city}`,
      timestamp: new Date().toISOString(),
      description: isPet
        ? `${report.item.name} has returned home safely with their family!`
        : 'Item recovery journey completed successfully. Handover verified.',
      contributor: report.reporter.name || 'Owner & Community',
      icon: isPet ? 'Heart' : 'CheckCheck'
    };

    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            status: finalStatus,
            trail: [...r.trail, newTrailEvent],
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    showToast(isPet ? '🐾 Pet Reunited! Trail Completed!' : '🔵 Item marked Returned! Trail Completed!');
  };

  // Delete / Remove Report (Admin or User)
  const deleteReport = (reportId) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    showToast('🗑️ Report deleted.');
  };

  // Flag / Report Inappropriate Content (Admin Moderation)
  const flagReport = (reportId, reason) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            flagged: true,
            flagReason: reason || 'Suspicious or duplicate listing under review',
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
    showToast('🚩 Report flagged for administrator review.');
  };

  // Approve Report (Admin Moderation)
  const approveReport = (reportId) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return {
            ...r,
            flagged: false,
            flagReason: null,
            approvedByAdmin: true,
            updatedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );
    showToast('✅ Report approved by administrator.');
  };

  // Mystery Item Guesses
  const addMysteryGuess = (mysteryId, user, guess) => {
    setMysteryItems((prev) =>
      prev.map((item) => {
        if (item.id === mysteryId) {
          const newGuess = {
            id: 'g-' + Date.now(),
            user,
            guess,
            votes: 1
          };
          return {
            ...item,
            communityGuesses: [newGuess, ...item.communityGuesses]
          };
        }
        return item;
      })
    );
    showToast('💡 Your identification guess has been posted!');
  };

  const voteMysteryGuess = (mysteryId, guessId) => {
    setMysteryItems((prev) =>
      prev.map((item) => {
        if (item.id === mysteryId) {
          return {
            ...item,
            communityGuesses: item.communityGuesses.map((g) =>
              g.id === guessId ? { ...g, votes: g.votes + 1 } : g
            )
          };
        }
        return item;
      })
    );
    showToast('👍 Upvoted guess!');
  };

  // Calculate Matches for a Report
  const getMatches = (reportId) => {
    const report = getReportById(reportId);
    if (!report) return [];
    return findMatchesForReport(report, reports);
  };

  return (
    <LostFoundContext.Provider
      value={{
        reports,
        mysteryItems,
        toasts,
        showToast,
        removeToast,
        addReport,
        updateReport,
        closeReport,
        getReportById,
        addSighting,
        verifyOwnershipDetail,
        submitClaim,
        approveClaim,
        arrangeHandover,
        addHandoverMessage,
        markAsReturned,
        deleteReport,
        flagReport,
        approveReport,
        addMysteryGuess,
        voteMysteryGuess,
        getMatches
      }}
    >
      {children}
    </LostFoundContext.Provider>
  );
};

export const useLostFound = () => {
  const context = useContext(LostFoundContext);
  if (!context) {
    throw new Error('useLostFound must be used within a LostFoundProvider');
  }
  return context;
};
