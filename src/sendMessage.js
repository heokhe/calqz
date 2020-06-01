import { fetch } from './fetch';

export function sendMessage(id, text) {
  return fetch(`/sendMessage?chat_id=${id}&text=${encodeURIComponent(text)}&parse_mode=html`);
}
