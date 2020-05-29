import calc from '@hkh12/node-calc';
import { fetch } from './fetch';

export function sendMessage(id, text) {
  return fetch(`/sendMessage?chat_id=${id}&text=${encodeURIComponent(text)}&parse_mode=html`);
}

function handleCalc(id, expr) {
  try {
    const answer = calc(expr).toString();
    if (answer === expr) {
      sendMessage(id, '🤨');
    } else {
      sendMessage(id, `${expr} = <b>${answer}</b>`);
    }
  } catch (_) {
    sendMessage(id, '🚫');
  }
}

export function setWebhook() {
  fetch(`/setWebhook?url=${encodeURIComponent(APP_URL)}`);
}

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message } = contents,
    { chat: { id, type }, text } = message,
    isInPv = type === 'private';
  if (!text) return;
  if (text.startsWith('/calculate ')) {
    handleCalc(id, text.slice('/calculate '.length));
  } else if (isInPv) {
    handleCalc(id, text);
  }
}
