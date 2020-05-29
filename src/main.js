import calc from '@hkh12/node-calc';

const TELEGRAM_URL = `https://api.telegram.org/bot${process.env.TOKEN}`;
const { APP_URL } = process.env;

export function fetchAndLog(endpoint) {
  const response = UrlFetchApp.fetch(TELEGRAM_URL + endpoint);
  const text = response.getContentText();
  Logger.log(text);
}

export function sendMessage(id, text) {
  fetchAndLog(`/sendMessage?chat_id=${id}&text=${encodeURIComponent(text)}`);
}

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message } = contents;
  try {
    const answer = calc(message.text);
    sendMessage(message.chat.id, answer);
  } catch (error) {
    sendMessage(message.chat.id, `Error: ${error.message}`);
  }
}

export function setWebhook() {
  fetchAndLog(`/setWebhook?url=${encodeURIComponent(APP_URL)}`);
}
