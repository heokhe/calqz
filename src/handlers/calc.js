import { evalTokens, tokenize } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';
import { MAX_EXPR_LENGTH } from '../constants';

export function handleCalc(id, replyId, expr, isInPv) {
  if (!isInPv && (!expr || expr.length > MAX_EXPR_LENGTH)) return;

  let text;
  try {
    if (expr.length > MAX_EXPR_LENGTH) text = '🤯';
    else {
      const tokens = tokenize(expr);
      if (isNonSense(tokens)) text = '🤨';
      else text = `${expr} = <b>${evalTokens(tokens).toString()}</b>`;
    }
  } catch (_) {
    text = '🚫';
  } finally {
    sendMessage(id, text, { reply_to_message_id: replyId });
  }
}
