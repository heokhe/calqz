export const TELEGRAM_URL = `https://api.telegram.org/bot${process.env.TOKEN}`;
// eslint-disable-next-line prefer-destructuring
export const APP_URL = process.env.APP_URL;

/** @returns {string} */
export function fetch(endpoint) {
  const response = UrlFetchApp.fetch(TELEGRAM_URL + endpoint);
  const text = response.getContentText();
  Logger.log(text);
  return text;
}
