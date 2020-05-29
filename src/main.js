import calc from '@hkh12/node-calc';
import { fetch } from './fetch';
import { matchesCommand, stripCommand } from './command';

function sendMessage(id, text) {
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

function handleQuiz(id, expr) {
  try {
    const answer = calc(expr).toString();
    if (answer === expr) {
      sendMessage(id, '🤨');
    } else {
      const options = [answer, '0'];
      fetch(`/sendPoll?chat_id=${id}&type=quiz&question=${encodeURIComponent(expr)}&options=${encodeURIComponent(JSON.stringify(options))}&correct_option_id=0&open_period=15&is_anonymous=false`);
    }
  } catch (_) {
    sendMessage(id, '🚫');
  }
}

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message } = contents,
    { chat: { id, type }, text } = message,
    isInPv = type === 'private';
  if (!text) return;
  if (matchesCommand(text, 'calculate')) {
    handleCalc(id, stripCommand(text));
  } else if (matchesCommand(text, 'quiz')) {
    handleQuiz(id, stripCommand(text));
  } else if (isInPv) {
    handleCalc(id, text);
  }
}

export { setWebhook } from './webhook';
