import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';

const NotificationContext = createContext();

const MOCK_NOTIFICATIONS = [
  {
    id: 'nt-1',
    title: 'New Sighting Reported',
    message: 'Ananya Roy submitted a sighting for your Lost iPhone 15 Pro.',
    type: 'sighting',
    link: '/item/LF-20260808-1001',
    read: false,
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'nt-2',
    title: 'Smart Match Detected 92%',
    message: 'Our system found a potential match for your lost iPhone 15 Pro.',
    type: 'match',
    link: '/trail/LF-20260808-1001',
    read: false,
    timestamp: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'nt-3',
    title: 'Item Returned!',
    message: 'Passport & License (LF-20260808-1003) was successfully marked Returned.',
    type: 'returned',
    link: '/item/LF-20260808-1003',
    read: true,
    timestamp: new Date(Date.now() - 86400000).toISOString()
  }
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => 
    getStorageItem('laf_notifications', MOCK_NOTIFICATIONS)
  );

  useEffect(() => {
    setStorageItem('laf_notifications', notifications);
  }, [notifications]);

  const addNotification = ({ title, message, type, link }) => {
    const newNotif = {
      id: 'nt-' + Date.now(),
      title,
      message,
      type: type || 'info',
      link: link || '/notifications',
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        unreadCount
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
