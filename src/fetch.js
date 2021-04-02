import { TELEGRAM_URL } from './constants';

/** @returns {string} */
export function fetch(endpoint, data = {}) {
  const qs = Object.entries(data).map(([key, value]) => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }).join('&');
  const response = UrlFetchApp.fetch(`${TELEGRAM_URL}${endpoint}?${qs}`);
  const text = response.getContentText();
  return text;
}
