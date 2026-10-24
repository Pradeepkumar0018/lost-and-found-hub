export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Optional field
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

export const maskPrivateText = (text) => {
  if (!text) return '***';
  if (text.length <= 4) return '****';
  return text.substring(0, 2) + '*'.repeat(text.length - 4) + text.substring(text.length - 2);
};

export const maskContactInfo = (contact) => {
  if (!contact) return 'Private';
  if (contact.includes('@')) {
    const [name, domain] = contact.split('@');
    return name.substring(0, 2) + '***@' + domain;
  }
  if (contact.length >= 7) {
    return contact.substring(0, 3) + '****' + contact.substring(contact.length - 2);
  }
  return 'Protected Contact';
};
