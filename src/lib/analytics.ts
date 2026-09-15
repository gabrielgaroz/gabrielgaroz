import type { PostHog } from "posthog-js/dist/module.slim";

const analyticsEventNames = [
  "contact_clicked",
  "social_link_clicked",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export interface AnalyticsEventProperties {
  destination?: string;
  placement?: string;
}

export interface AnalyticsConfig {
  apiHost: string;
  projectKey: string;
}

let clientPromise: Promise<PostHog> | undefined;
let clickTrackingInitialized = false;

export function initializeAnalytics(config: AnalyticsConfig): void {
  if (clientPromise || !config.projectKey) {
    return;
  }

  clientPromise = import("posthog-js/dist/module.slim").then(
    ({ default: posthog }) => {
      posthog.init(config.projectKey, {
        api_host: config.apiHost,
        defaults: "2026-08-30",
        autocapture: false,
        capture_dead_clicks: false,
        capture_exceptions: false,
        capture_heatmaps: false,
        capture_pageleave: true,
        capture_pageview: true,
        capture_performance: false,
        cookieless_mode: "always",
        disable_session_recording: true,
        disable_surveys: true,
        advanced_disable_feature_flags: true,
        person_profiles: "never",
        respect_dnt: true,
      });

      return posthog;
    },
  );
}

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsEventProperties = {},
): void {
  void clientPromise?.then((posthog) => {
    posthog.capture(eventName, properties);
  });
}

export function bindAnalyticsClicks(): void {
  if (clickTrackingInitialized) {
    return;
  }

  clickTrackingInitialized = true;

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest<HTMLElement>("[data-analytics-event]");
    const eventName = link?.dataset.analyticsEvent;

    if (!link || !isAnalyticsEventName(eventName)) {
      return;
    }

    trackEvent(eventName, {
      destination: link.dataset.analyticsDestination,
      placement: link.dataset.analyticsPlacement,
    });
  });
}

function isAnalyticsEventName(
  eventName: string | undefined,
): eventName is AnalyticsEventName {
  return analyticsEventNames.includes(eventName as AnalyticsEventName);
}
