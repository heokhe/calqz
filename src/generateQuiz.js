import {
  tokenize, evalTokens, Parenthesis, Operator, Token
} from '@hkh12/node-calc';
import { pipe, shuffle, unique } from './helpers';

const stringifyTokens = tokens => tokens.join('');

function randomlyRemoveParenthesis(tokens) {
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

function tokenizeFromRightToLeft(tokens) {
  const output = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (token instanceof Parenthesis && Math.random() > (i / tokens.length)) {
      const innerTokens = tokenizeFromRightToLeft(tokenize(token.innerValue));
      output.push(new Parenthesis(`(${stringifyTokens(innerTokens)})`, token.isNegative));
    } else output.push(token);
  }
  return output;
}

function solveWithIncorrectPriorities(tokens, priorities = shuffle([1, 2, 3])) {
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

const FUNCTIONS = [
  randomlyRemoveParenthesis,
  tokenizeFromRightToLeft,
  pipe(randomlyRemoveParenthesis, tokenizeFromRightToLeft),
  solveWithIncorrectPriorities
];

export function generateQuiz(expression) {
  const tokens = tokenize(expression);
  const correctAnswer = evalTokens([...tokens]); // because evalTokens mutates
  const answers = [correctAnswer, ...FUNCTIONS.map(f => evalTokens(f(tokens)))];
  const finalAnswers = shuffle(unique(answers)).map(String);
  const time = Math.floor(Math.sqrt(tokens.length * expression.replace(/ /g, '').length));
  return {
    answers: finalAnswers,
    trueIndex: finalAnswers.indexOf(String(correctAnswer)),
    time
  };
}
