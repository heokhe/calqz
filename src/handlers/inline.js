import { tokenize, evalTokens } from '@hkh12/node-calc';
import { fetch } from '../fetch';

const CACHE_TIME = 60 * 60 * 24; // one day

export function handleInline(inlineId, query) {
  let results;
  try {
    const tokens = tokenize(expr);
    if (tokens.length === 1) throw new Error('non-sense');
    const answer = evalTokens(tokens).toString();
    results = [{
      id: 'answer',
      type: 'article',
      title: `= ${answer}`,
      input_message_content: {
        parse_mode: 'html',
        message_text: `${query} = <b>${answer}</b>`
      }
    }];
  } catch (_) {
    results = [];
  } finally {
    fetch(`/answerInlineQuery?inline_query_id=${inlineId}&results=${encodeURIComponent(JSON.stringify(results))}&cache_time=${CACHE_TIME}`);
  }
}
