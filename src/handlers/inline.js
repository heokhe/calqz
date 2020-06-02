import { evalExpression } from '@hkh12/node-calc';
import { fetch } from '../fetch';
import { isNonSense } from '../helpers';

const CACHE_TIME = 60 * 60 * 24; // one day

export function handleInline(inlineId, query) {
  let results;
  try {
    const answer = evalExpression(query).toString();
    if (isNonSense(query, answer)) throw new Error('non-sense');
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
