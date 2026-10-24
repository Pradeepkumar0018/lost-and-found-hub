import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationItem } from '../components/notifications/NotificationItem';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification, unreadCount } = useNotifications();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <Bell className="w-7 h-7 text-brand-500" />
            Activity Notifications
            {unreadCount > 0 && (
              <span className="text-xs bg-brand-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Updates on your lost reports, community sightings, ownership verifications, and smart matches.
          </p>
        </div>

        {notifications.length > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="secondary"
            size="sm"
            icon={CheckCheck}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          title="No Notifications"
          description="You don't have any activity notifications right now."
          icon={Bell}
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={markAsRead}
              onClear={clearNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
};
