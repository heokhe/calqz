import * as handlers from './handlers';
import { matchesCommand, stripCommand } from './command';

export function doPost(e) {
  const contents = JSON.parse(e.postData.contents),
    { message, inline_query, edited_message } = contents;
  if (inline_query) {
    handlers.handleInline(inline_query.id, inline_query.query);
  } else if (edited_message) {
    const { text, chat } = edited_message;
    if (matchesCommand(text, 'calculate')) {
      handlers.handleCalc(edited_message, stripCommand(text));
    } else if (chat.type === 'private') {
      handlers.handleCalc(edited_message, text);
    }
  } else if (message) {
    const { chat: { id, type }, text, message_id } = message,
      isInPv = type === 'private';
    if (!text) return;

    if (matchesCommand(text, 'calculate')) {
      handlers.handleCalc(message, stripCommand(text));
    } else if (matchesCommand(text, 'quiz')) {
      handlers.handleQuiz(id, message_id, stripCommand(text), isInPv);
    } else if (matchesCommand(text, 'help') || matchesCommand(text, 'start')) {
      handlers.handleHelp(id);
    } else if (isInPv) {
      handlers.handleCalc(message, text);
    }
  }
}

export { setWebhook } from './webhook';
