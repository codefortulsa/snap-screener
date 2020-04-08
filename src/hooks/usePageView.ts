// Core
import { useEffect } from 'react';
import { analytics } from '../lib/firebase';

// Hook
export default function usePageView(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title && title !== prevTitle) {
      // Change document title
      document.title = title;

      // Register page view with Firebase analytics
      analytics.logEvent('page_view', { page_title: title });
    }
  }, [title]);
}
