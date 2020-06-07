import { sendMessage } from '../sendMessage';
import { USERNAME } from '../constants';

export function handleHelp(id) {
  sendMessage(id, `Hi! I'm your calculator in Telegram. You can use me in these ways:
- <code>/calculate 2*2</code>
- Or only <code>2*2</code> (only works in the private chat)
- Inline mode: <code>@${USERNAME} 2*2</code>
Valid expressions contain <b>numbers, +-*/^ operators</b>, and functions:
- sin(x), cos(x), cot(x), tan(x)
- sqrt(x), cbrt(x)

I can also help you to <b>generate math quizzes</b>: <code>/quiz 2*2</code>.`);
}
