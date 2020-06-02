import { APP_URL } from './constants';

export function setWebhook() {
  fetch('/setWebhook', { url: APP_URL });
}
