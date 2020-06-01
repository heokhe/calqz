import { sendMessage } from '../sendMessage';
import { USERNAME } from '../constants';

export function handleHelp(id) {
  sendMessage(id, `Hi! I'm your calculator in Telegram. You can use me in these ways:
- <code>/calculate 2*2</code>
- Or only <code>2*2</code> (only works in this chat)
- Inline mode: <code>@${USERNAME} 2*2</code>
Valid expressions contain <b>numbers, and +-*/^ operators</b>.

I can also help you to <b>generate math quizzes</b>: <code>/quiz 2*2</code>.`);
}
