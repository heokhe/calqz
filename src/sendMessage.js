import { fetch } from './fetch';

export function sendMessage(id, text, additionalParams) {
  return fetch('/sendMessage', {
    ...additionalParams,
    chat_id: id,
    text,
    parse_mode: 'html'
  });
}
