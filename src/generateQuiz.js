import { tokenize, evalTokens, Parenthesis } from '@hkh12/node-calc';
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

const FUNCTIONS = [
  randomlyRemoveParenthesis,
  tokenizeFromRightToLeft,
  pipe(randomlyRemoveParenthesis, tokenizeFromRightToLeft),
  pipe(tokenizeFromRightToLeft, randomlyRemoveParenthesis)
];

export function generateQuiz(expression) {
  const tokens = tokenize(expression);
  const correctAnswer = evalTokens(tokens);
  const answers = [correctAnswer, ...FUNCTIONS.map(f => evalTokens(f(tokens)))];
  const finalAnswers = shuffle(unique(answers)).map(String);
  const time = 2 + Math.floor(Math.sqrt(tokens.length * expression.replace(/ /g, '').length));
  return {
    answers: finalAnswers,
    trueIndex: finalAnswers.indexOf(String(correctAnswer)),
    time
  };
}
