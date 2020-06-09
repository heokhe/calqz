import { evalTokens, tokenize } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';

export function handleCalc(id, replyId, expr) {
  let text;
  try {
    const tokens = tokenize(expr);
    if (tokens.length === 1) text = '🤨';
    else text = evalTokens(tokens).toString();
  } catch (_) {
    text = '🚫';
  } finally {
    sendMessage(id, text, { reply_to_message_id: replyId });
  }
}
