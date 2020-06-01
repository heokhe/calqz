import * as handlers from './handlers';
import { matchesCommand, stripCommand } from './command';

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message, inline_query } = contents;
  if (inline_query) {
    handlers.handleInline(inline_query.id, inline_query.query);
  } else if (message) {
    const { chat: { id, type }, text } = message,
      isInPv = type === 'private';
    if (!text) return;
    if (matchesCommand(text, 'calculate')) {
      handlers.handleCalc(id, stripCommand(text));
    } else if (matchesCommand(text, 'quiz')) {
      handlers.handleQuiz(id, stripCommand(text));
    } else if (matchesCommand(text, 'help') || matchesCommand(text, 'start')) {
      handlers.handleHelp(id);
    } else if (isInPv) {
      handlers.handleCalc(id, text);
    }
  }
}

export { setWebhook } from './webhook';
