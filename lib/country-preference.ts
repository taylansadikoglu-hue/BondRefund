"use client";

import { useEffect, useState } from "react";
import {
  countryExperiences,
  detectCountryFromBrowser,
  type CountryCode,
} from "@/lib/country-experience";

const STORAGE_KEY = "bondrefund-country";

export function useCountryPreference(defaultCountry: CountryCode = "AU") {
  const [country, setCountryState] = useState<CountryCode>(defaultCountry);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as CountryCode | null;
    if (stored && stored in countryExperiences) {
      setCountryState(stored);
      setReady(true);
      return;
    }

    const detected = detectCountryFromBrowser({
      language: navigator.language,
      languages: navigator.languages,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    setCountryState(detected);
    window.localStorage.setItem(STORAGE_KEY, detected);
    setReady(true);
  }, []);

  const setCountry = (next: CountryCode) => {
    setCountryState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return { country, setCountry, ready };
}
