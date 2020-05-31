import calc from '@hkh12/node-calc';
import { fetch } from './fetch';
import { matchesCommand, stripCommand } from './command';
import { generateQuiz } from './generateQuiz';

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
      const { answers, trueIndex, time } = generateQuiz(expr);
      fetch(`/sendPoll?chat_id=${id}&type=quiz&question=${encodeURIComponent(expr)}&options=${encodeURIComponent(JSON.stringify(answers))}&correct_option_id=${trueIndex}&open_period=${time}&is_anonymous=false`);
    }
  } catch (_) {
    sendMessage(id, '🚫');
  }
}

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message, inline_query } = contents;
  if (inline_query) {
    const { id, query } = inline_query;
    let results;
    try {
      const answer = String(calc(query));
      results = [{
        id: 'answer',
        type: 'article',
        title: answer,
        input_message_content: {
          parse_mode: 'html',
          message_text: `${query} = <b>${answer}</b>`
        }
      }];
    } catch (_) {
      results = [];
    } finally {
      fetch(`/answerInlineQuery?inline_query_id=${id}&results=${encodeURIComponent(JSON.stringify(results))}&cache_time=${60 * 60 * 24 * 3}`);
    }
  } else if (message) {
    const { chat: { id, type }, text } = message,
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
}

export { setWebhook } from './webhook';
