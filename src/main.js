import * as handlers from './handlers';
import { matchesCommand, stripCommand } from './command';

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message, inline_query } = contents;
  if (inline_query) {
    handlers.handleInline(inline_query.id, inline_query.query);
  } else if (message) {
    const { chat: { id, type }, text, message_id } = message,
      isInPv = type === 'private';
    if (!text) return;
    if (matchesCommand(text, 'calculate')) {
      handleCalc(id, message_id, stripCommand(text));
    } else if (matchesCommand(text, 'quiz')) {
      handleQuiz(id, stripCommand(text));
    } else if (matchesCommand(text, 'help') || matchesCommand(text, 'start')) {
      handleHelp(id);
    } else if (isInPv) {
      handleCalc(id, message_id, text);
    }
  }
}

export { setWebhook } from './webhook';
