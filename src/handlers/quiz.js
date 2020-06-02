import { evalExpression } from '@hkh12/node-calc';
import { fetch } from '../fetch';
import { generateQuiz } from '../quiz';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';

export function handleQuiz(id, expr) {
  try {
    const answer = evalExpression(expr).toString();
    if (isNonSense(expr, answer)) {
      sendMessage(id, '🤨');
    } else {
      const { answers, trueIndex, time } = generateQuiz(expr);
      fetch('/sendPoll', {
        chat_id: id,
        type: 'quiz',
        question: `${expr} = ?`,
        options: JSON.stringify(answers),
        correct_option_id: trueIndex,
        open_period: time,
        is_anonymous: false
      });
    }
  } catch (_) {
    sendMessage(id, '🚫');
  }
}
