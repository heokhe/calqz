import { evalTokens, tokenize } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';
import { isNonSense, formatNumber, isTwoPlusTwo } from '../helpers';

export function handleCalc(message, expression) {
  const isInGroup = message.chat.type === 'group' || message.chat.type === 'supergroup';
  const chatId = message.chat.id;
  const replyId = message.message_id;

  if (isInGroup && !expression && message.reply_to_message) {
    expression = message.reply_to_message.text;
  }

  if (isInGroup && !expression) return;

  let text;
  try {
    const tokens = tokenize(expression);
    if (isNonSense(tokens)) {
      text = '🤨';
    } else if (isTwoPlusTwo(tokens)) {
      text = `${expression} = <b>5 😁</b>`;
    } else {
      text = `${expression} = <b>${formatNumber(evalTokens(tokens))}</b>`;
    }
  } catch (_) {
    text = '🚫';
  } finally {
    sendMessage(chatId, text, { reply_to_message_id: replyId });
  }
}
