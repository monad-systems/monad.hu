import { createContext, useContext, useMemo } from 'react';

import en from './dictionaries/en';
import hu from './dictionaries/hu';

export const LOCALES = ['en', 'hu'];
export const DEFAULT_LOCALE = 'en';
export const LOCALE_STORAGE_KEY = 'monad.locale';

const dictionaries = { en, hu };

const I18nContext = createContext({
  locale: DEFAULT_LOCALE,
  dictionary: en,
  t: (key, fallback = '') => fallback,
});

const isSupportedLocale = (value) =>
  typeof value === 'string' && LOCALES.includes(value.toLowerCase());

const cleanPath = (path = '/') => {
  const [pathname] = String(path).split(/[?#]/);
  return pathname || '/';
};

export const getLocaleFromPath = (path = '/') => {
  const pathname = cleanPath(path);
  const segments = pathname.split('/').filter(Boolean);
  const candidate = segments[0]?.toLowerCase();
  return isSupportedLocale(candidate) ? candidate : null;
};

export const normalizeLocale = (value) => {
  if (isSupportedLocale(value)) {
    return value.toLowerCase();
  }
  return DEFAULT_LOCALE;
};

export const detectBrowserLocale = (languageList = []) => {
  const candidates = Array.isArray(languageList)
    ? languageList
    : [languageList].filter(Boolean);

  const matched = candidates.find((entry) =>
    String(entry).toLowerCase().startsWith('hu'),
  );

  return matched ? 'hu' : 'en';
};

export const localizePath = (path, locale) => {
  const nextLocale = normalizeLocale(locale);
  const raw = path || '/';
  const [pathnamePart, hashPart = ''] = String(raw).split('#');
  const [pathname = '/', query = ''] = pathnamePart.split('?');

  const normalizedPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`;
  const withoutLocale = normalizedPathname.replace(/^\/(en|hu)(?=\/|$)/, '');
  const basePath = withoutLocale || '/';
  const nextPath =
    nextLocale === DEFAULT_LOCALE
      ? basePath
      : `/${nextLocale}${basePath === '/' ? '/' : basePath}`;

  const querySuffix = query ? `?${query}` : '';
  const hashSuffix = hashPart ? `#${hashPart}` : '';
  return `${nextPath}${querySuffix}${hashSuffix}`;
};

export const swapLocaleInPath = (path, nextLocale) =>
  localizePath(path, nextLocale);

const getByKeyPath = (object, key) => {
  return String(key)
    .split('.')
    .reduce(
      (result, part) => (result && part in result ? result[part] : undefined),
      object,
    );
};

export const I18nProvider = ({ locale, children }) => {
  const normalizedLocale = normalizeLocale(locale);

  const value = useMemo(() => {
    const dictionary =
      dictionaries[normalizedLocale] || dictionaries[DEFAULT_LOCALE];

    const t = (key, fallback = '') => {
      const valueAtPath = getByKeyPath(dictionary, key);
      if (valueAtPath === undefined || valueAtPath === null) {
        return fallback;
      }
      return valueAtPath;
    };

    return {
      locale: normalizedLocale,
      dictionary,
      t,
    };
  }, [normalizedLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);
