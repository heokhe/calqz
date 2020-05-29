import calc from '@hkh12/node-calc';

const TELEGRAM_URL = `https://api.telegram.org/bot${process.env.TOKEN}`;
// eslint-disable-next-line prefer-destructuring
const APP_URL = process.env.APP_URL;

export function fetchAndLog(endpoint) {
  const response = UrlFetchApp.fetch(TELEGRAM_URL + endpoint);
  const text = response.getContentText();
  Logger.log(text);
}

export function sendMessage(id, text) {
  fetchAndLog(`/sendMessage?chat_id=${id}&text=${encodeURIComponent(text)}&parse_mode=html`);
}

function handleCalc(id, expr) {
  try {
    const answer = calc(expr);
    sendMessage(id, `${expr} = <b>${answer}</b>`);
  } catch (error) {
    sendMessage(id, `🚫 There is a problem with <code>${expr}</code>:
<b>${error.message}</b>`);
  }
}

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message } = contents,
    { chat: { id }, text: expr } = message;
  handleCalc(id, expr);
}

export function setWebhook() {
  fetchAndLog(`/setWebhook?url=${encodeURIComponent(APP_URL)}`);
}
