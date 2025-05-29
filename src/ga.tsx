import ReactGA from "react-ga4";
import { GA_MEASUREMENT_ID } from "./services/config";

export const initGA = () => {
  const measurementId = GA_MEASUREMENT_ID;
  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn("Google Analytics Measurement ID not found.");
  }
};

export const trackPageView = (path: string) => {
  ReactGA.send({ hitType: "pageview", page: path });
};
