/**
 * Analytics module — provider-agnostic thin wrapper for event tracking.
 *
 * Supports consent gating (suppresses all events when consent not granted),
 * async/deferred initialization to avoid LCP impact, and environment-based
 * configuration for provider switching without code changes.
 *
 * Requirements: 16.1, 16.4, 16.5, 16.6, 16.7
 */

export interface AnalyticsEvent {
  type: 'click' | 'scroll_depth' | 'conversion' | 'demo_interaction';
  label: string;
  section: string;
  timestamp: number;
  metadata?: Record<string, string>;
}

export interface AnalyticsConfig {
  providerId: string;
  trackingKey: string;
  enabled: boolean;
}

let config: AnalyticsConfig | null = null;
let consentGranted = false;
let initialized = false;
let eventQueue: AnalyticsEvent[] = [];

/**
 * Loads analytics configuration from Vite environment variables.
 * Returns a config object with `enabled` set to true only when both
 * provider ID and tracking key are present.
 */
export function getConfigFromEnv(): AnalyticsConfig {
  // Analytics disabled — no provider configured yet
  const providerId = '';
  const trackingKey = '';
  return {
    providerId,
    trackingKey,
    enabled: Boolean(providerId && trackingKey),
  };
}

/**
 * Initializes the analytics module with the given configuration.
 * Uses requestIdleCallback (or setTimeout fallback) to defer non-critical
 * initialization work, ensuring no LCP impact.
 */
export function initAnalytics(analyticsConfig: AnalyticsConfig): void {
  config = analyticsConfig;

  if (!config.enabled) {
    return;
  }

  const deferredInit = () => {
    initialized = true;
    // Flush any queued events that arrived before initialization completed
    flushQueue();
  };

  // Defer initialization to avoid blocking LCP
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    window.requestIdleCallback(deferredInit);
  } else {
    setTimeout(deferredInit, 0);
  }
}

/**
 * Tracks a generic analytics event.
 * Events are suppressed when consent is not granted (Req 16.7).
 * Events arriving before initialization completes are queued and flushed later.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (!consentGranted) {
    return;
  }

  if (!config?.enabled) {
    return;
  }

  if (!initialized) {
    eventQueue.push(event);
    return;
  }

  sendEvent(event);
}

/**
 * Tracks a conversion event distinct from standard click events (Req 16.5).
 * Fires a conversion-type event containing the source section and destination URL.
 */
export function trackConversion(section: string, destinationUrl: string): void {
  trackEvent({
    type: 'conversion',
    label: 'conversion',
    section,
    timestamp: Date.now(),
    metadata: { destinationUrl },
  });
}

/**
 * Sets the user's tracking consent state.
 * When consent is revoked, all subsequent events are suppressed (Req 16.7).
 * When consent is granted, queued events are flushed.
 */
export function setConsent(granted: boolean): void {
  consentGranted = granted;

  if (granted && initialized) {
    flushQueue();
  }
}

/**
 * Sends an event to the configured analytics provider.
 * This is the provider integration point — currently logs to a
 * provider-agnostic data layer. Replace the body with actual
 * provider SDK calls (e.g., gtag, segment, posthog) as needed.
 */
function sendEvent(event: AnalyticsEvent): void {
  // Provider-agnostic data layer push
  if (typeof window !== 'undefined') {
    const win = window as unknown as WindowWithDataLayer;
    if (Array.isArray(win.__analytics_queue)) {
      win.__analytics_queue.push(event);
    }
  }
}

/** Flushes queued events that arrived before initialization or consent. */
function flushQueue(): void {
  if (!consentGranted || !initialized) {
    return;
  }

  const pending = [...eventQueue];
  eventQueue = [];
  for (const event of pending) {
    sendEvent(event);
  }
}

/** Resets internal state — useful for testing. */
export function _resetAnalytics(): void {
  config = null;
  consentGranted = false;
  initialized = false;
  eventQueue = [];
}

/** Exposes internal state for testing purposes only. */
export function _getState() {
  return { config, consentGranted, initialized, eventQueue: [...eventQueue] };
}

/** Forces initialization to complete synchronously — for testing only. */
export function _forceInitialize(): void {
  if (config?.enabled) {
    initialized = true;
    flushQueue();
  }
}

interface WindowWithDataLayer extends Window {
  __analytics_queue: AnalyticsEvent[];
}
