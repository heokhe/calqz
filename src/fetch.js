import { TELEGRAM_URL } from './constants';

/** @returns {string} */
export function fetch(endpoint) {
  const response = UrlFetchApp.fetch(TELEGRAM_URL + endpoint);
  const text = response.getContentText();
  Logger.log(text);
  return text;
}
