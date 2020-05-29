import { APP_URL } from './constants';

export function setWebhook() {
  fetch(`/setWebhook?url=${encodeURIComponent(APP_URL)}`);
}
