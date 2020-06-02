import { evalExpression } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';

export function handleCalc(id, replyId, expr) {
  let text;
  try {
    const answer = evalExpression(expr).toString();
    text = isNonSense(expr, answer) ? '🤨' : `${expr} = <b>${answer}</b>`;
  } catch (_) {
    text = '🚫';
  } finally {
    sendMessage(id, text, { reply_to_message_id: replyId });
  }
}
