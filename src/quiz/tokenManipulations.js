import {
  tokenize, evalTokens, Parenthesis, Operator, Token
} from '@hkh12/node-calc';
import { shuffle } from '../helpers';

export function randomlyRemoveParenthesis(tokens) {
  const output = [];
  let c = 0;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token instanceof Parenthesis && Math.random() > c / tokens.length) {
      c++;
      const innerTokens = randomlyRemoveParenthesis(tokenize(token.innerValue));
      if (token.isNegative) innerTokens[0].isNegative = !innerTokens[0].isNegative;
      output.push(...innerTokens);
    } else {
      output.push(token);
    }
  }
  return output;
}

export function tokenizeFromRightToLeft(tokens) {
  const output = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token instanceof Parenthesis && Math.random() > (i / tokens.length)) {
      const innerTokens = tokenizeFromRightToLeft(tokenize(token.innerValue));
      output.push(new Parenthesis(`(${innerTokens.join('')})`, token.isNegative));
    } else output.push(token);
  }
  return output;
}

export function solveWithIncorrectPriorities(tokens, priorities = shuffle([1, 2, 3])) {
  const output = [];
  for (const token of tokens) {
    if (token.isOperator) {
      const newToken = new Operator(token.type);
      newToken.priority = priorities[token.priority - 1];
      output.push(newToken);
    } else if (token instanceof Parenthesis) {
      const innerTokens = tokenize(token.innerValue);
      const newInnerTokens = solveWithIncorrectPriorities(innerTokens, priorities);
      const innerValue = evalTokens(newInnerTokens);
      output.push(new Token(innerValue, token.isNegative));
    } else output.push(token);
  }
  return output;
}
