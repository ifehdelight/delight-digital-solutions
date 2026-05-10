import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "delight_session_id";
const getSessionId = () => {
  let s = sessionStorage.getItem(SESSION_KEY);
  if (!s) {
    s = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, s);
  }
  return s;
};

// Lightweight analytics tracker — logs events locally and sends to
// any future endpoint (Google Analytics, Mixpanel, etc.)

interface AnalyticsEvent {
  event: string;
  page?: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

const STORAGE_KEY = "delight_analytics";

const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const storeEvent = (evt: AnalyticsEvent) => {
  const events = getStoredEvents();
  events.push(evt);
  // Keep last 500 events
  if (events.length > 500) events.splice(0, events.length - 500);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const trackEvent = (event: string, data?: Record<string, unknown>) => {
  const evt: AnalyticsEvent = {
    event,
    page: window.location.pathname,
    timestamp: Date.now(),
    data,
  };
  storeEvent(evt);

  // Log in dev for debugging
  if (import.meta.env.DEV) {
    console.log("[Analytics]", evt);
  }

  // Future: send to backend
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(evt) });
};

/** Auto-tracks page views on route change */
export const usePageView = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent("page_view", { path: location.pathname });
  }, [location.pathname]);
};

/** Returns a trackEvent helper scoped to the current page */
export const useTrackEvent = () => {
  return useCallback((event: string, data?: Record<string, unknown>) => {
    trackEvent(event, data);
  }, []);
};

export { getStoredEvents };
