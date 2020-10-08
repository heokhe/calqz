import { tokenize, evalTokens } from '@hkh12/node-calc';
import { MAX_EXPR_LENGTH } from '../constants';
import { fetch } from '../fetch';
import { isNonSense } from '../helpers';

const CACHE_TIME = 60 * 60 * 24; // one day

export function handleInline(inlineId, query) {
  let results;
  try {
    if (query.length > MAX_EXPR_LENGTH) throw new Error('too long');
    const tokens = tokenize(query);
    if (isNonSense(tokens)) throw new Error('non-sense');
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
    fetch('/answerInlineQuery', {
      intline_query_id: inlineId,
      results: JSON.stringify(results),
      cache_time: CACHE_TIME
    });
  }
}
