import { evalTokens, tokenize } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';

export function handleCalc(id, replyId, expr, isInPv) {
  if (!isInPv && !expr) return;

  let text;
  try {
    const tokens = tokenize(expr);
    if (isNonSense(tokens)) text = '🤨';
    else text = `${expr} = <b>${evalTokens(tokens).toString()}</b>`;
  } catch (_) {
    text = '🚫';
  } finally {
    sendMessage(id, text, { reply_to_message_id: replyId });
  }
}
