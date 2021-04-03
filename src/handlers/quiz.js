import { tokenize } from '@hkh12/node-calc';
import { fetch } from '../fetch';
import { generateQuiz } from '../quiz';
import { sendMessage } from '../sendMessage';
import { isNonSense } from '../helpers';

export function handleQuiz(id, replyId, expr, isInPv) {
  if (!isInPv && !expr) return;

  try {
    const tokens = tokenize(expr);
    if (isNonSense(tokens)) {
      sendMessage(id, '🤨', { reply_to_message_id: replyId });
    } else {
      const { answers, trueIndex, time } = generateQuiz(tokens);
      fetch('/sendPoll', {
        chat_id: id,
        type: 'quiz',
        question: `${expr} = ?`,
        options: JSON.stringify(answers),
        correct_option_id: trueIndex,
        open_period: time,
        is_anonymous: false,
        reply_to_message_id: replyId
      });
    }
  } catch (_) {
    sendMessage(id, '🚫', { reply_to_message_id: replyId });
  }
}
