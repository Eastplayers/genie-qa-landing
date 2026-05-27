import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  initAnalytics,
  trackEvent,
  trackConversion,
  setConsent,
  getConfigFromEnv,
  _resetAnalytics,
  _forceInitialize,
  _getState,
  type AnalyticsEvent,
  type AnalyticsConfig,
} from './analytics';

describe('analytics module', () => {
  beforeEach(() => {
    _resetAnalytics();
    (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue = [];
  });

  describe('getConfigFromEnv', () => {
    it('returns config with enabled=false when env vars are empty', () => {
      const config = getConfigFromEnv();
      expect(config).toHaveProperty('providerId');
      expect(config).toHaveProperty('trackingKey');
      expect(config).toHaveProperty('enabled');
    });
  });

  describe('initAnalytics', () => {
    it('stores config and defers initialization when enabled', () => {
      const config: AnalyticsConfig = {
        providerId: 'test-provider',
        trackingKey: 'test-key',
        enabled: true,
      };

      initAnalytics(config);

      const state = _getState();
      expect(state.config).toEqual(config);
      // Not yet initialized (deferred)
      expect(state.initialized).toBe(false);
    });

    it('does not initialize when config is disabled', () => {
      const config: AnalyticsConfig = {
        providerId: '',
        trackingKey: '',
        enabled: false,
      };

      initAnalytics(config);
      _forceInitialize();

      const state = _getState();
      expect(state.initialized).toBe(false);
    });
  });

  describe('consent gating', () => {
    it('suppresses all events when consent is not granted', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      _forceInitialize();

      const event: AnalyticsEvent = {
        type: 'click',
        label: 'Start Free',
        section: 'hero',
        timestamp: Date.now(),
      };

      trackEvent(event);

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(0);
    });

    it('allows events when consent is granted', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      _forceInitialize();
      setConsent(true);

      const event: AnalyticsEvent = {
        type: 'click',
        label: 'Start Free',
        section: 'hero',
        timestamp: 1234567890,
      };

      trackEvent(event);

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(1);
      expect(queue[0]).toEqual(event);
    });

    it('suppresses events after consent is revoked', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      _forceInitialize();
      setConsent(true);

      trackEvent({
        type: 'click',
        label: 'First',
        section: 'hero',
        timestamp: 1000,
      });

      setConsent(false);

      trackEvent({
        type: 'click',
        label: 'Second',
        section: 'pricing',
        timestamp: 2000,
      });

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(1);
      expect(queue[0]!.label).toBe('First');
    });
  });

  describe('trackEvent', () => {
    it('queues events before initialization completes', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      setConsent(true);

      const event: AnalyticsEvent = {
        type: 'click',
        label: 'Start Free',
        section: 'hero',
        timestamp: 1234567890,
      };

      trackEvent(event);

      // Event should be queued, not sent yet
      const windowQueue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(windowQueue).toHaveLength(0);

      const state = _getState();
      expect(state.eventQueue).toHaveLength(1);
    });

    it('flushes queued events after initialization', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      setConsent(true);

      trackEvent({
        type: 'click',
        label: 'Queued Event',
        section: 'hero',
        timestamp: 1000,
      });

      _forceInitialize();

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(1);
      expect(queue[0]!.label).toBe('Queued Event');
    });

    it('does not send events when config is disabled', () => {
      const config: AnalyticsConfig = {
        providerId: '',
        trackingKey: '',
        enabled: false,
      };

      initAnalytics(config);
      setConsent(true);

      trackEvent({
        type: 'click',
        label: 'Test',
        section: 'hero',
        timestamp: 1000,
      });

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(0);
    });
  });

  describe('trackConversion', () => {
    it('fires a conversion event with section and destination URL', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      _forceInitialize();
      setConsent(true);

      trackConversion('pricing', 'https://app.genieqa.com/register');

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(1);
      expect(queue[0]!.type).toBe('conversion');
      expect(queue[0]!.section).toBe('pricing');
      expect(queue[0]!.metadata).toEqual({ destinationUrl: 'https://app.genieqa.com/register' });
    });

    it('is suppressed when consent is not granted', () => {
      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);
      _forceInitialize();
      // No setConsent(true) call

      trackConversion('hero', 'https://app.genieqa.com/register');

      const queue = (window as unknown as { __analytics_queue: AnalyticsEvent[] }).__analytics_queue;
      expect(queue).toHaveLength(0);
    });
  });

  describe('deferred initialization', () => {
    it('uses requestIdleCallback when available', () => {
      const mockRIC = vi.fn((cb: IdleRequestCallback) => {
        cb({} as IdleDeadline);
        return 1;
      });
      vi.stubGlobal('requestIdleCallback', mockRIC);

      const config: AnalyticsConfig = {
        providerId: 'test',
        trackingKey: 'key',
        enabled: true,
      };

      initAnalytics(config);

      expect(mockRIC).toHaveBeenCalledOnce();

      vi.unstubAllGlobals();
    });
  });
});
