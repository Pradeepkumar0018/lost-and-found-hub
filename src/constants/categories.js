export const CATEGORIES = [
  { id: 'phone', label: 'Phones', icon: 'Smartphone', description: 'iPhones, Android, Foldables' },
  { id: 'document', label: 'Documents', icon: 'FileText', description: 'ID Cards, Passports, Driving Licenses' },
  { id: 'bag', label: 'Bags & Backpacks', icon: 'ShoppingBag', description: 'Handbags, Backpacks, Luggage' },
  { id: 'pet', label: 'Pets', icon: 'Dog', description: 'Dogs, Cats, Birds, Exotic Pets' },
  { id: 'electronics', label: 'Electronics', icon: 'Laptop', description: 'Laptops, Tablets, Headphones, Cameras' },
  { id: 'keys', label: 'Keys', icon: 'Key', description: 'Car Keys, House Keys, Fobs' },
  { id: 'wallet', label: 'Wallets & Purses', icon: 'CreditCard', description: 'Wallets, Purses, Cardholders' },
  { id: 'accessories', label: 'Accessories', icon: 'Watch', description: 'Watches, Jewelry, Glasses' },
  { id: 'mystery', label: 'Mystery Items', icon: 'HelpCircle', description: 'Unidentified or unusual items' },
  { id: 'other', label: 'Other', icon: 'Box', description: 'Miscellaneous lost or found items' },
];

export const getCategoryById = (id) => {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
};
