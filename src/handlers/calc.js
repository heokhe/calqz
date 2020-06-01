import { evalExpression } from '@hkh12/node-calc';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';

export function handleCalc(id, expr) {
  try {
    const answer = evalExpression(expr).toString();
    if (isNonSense(expr, answer)) {
      sendMessage(id, '🤨');
    } else {
      sendMessage(id, `${expr} = <b>${answer}</b>`);
    }
  } catch (_) {
    sendMessage(id, '🚫');
  }
}
