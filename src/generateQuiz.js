import calc from '@hkh12/node-calc';
import tokenize from '@hkh12/node-calc/tokenize';
import { Parenthesis } from '@hkh12/node-calc/tokens';
import { pipe, shuffle, unique } from './helpers';

const stringifyTokens = tokens => {
  return tokens.map(t => {
    return `${t.isNegative ? '-' : ''}${t._rawValue}`;
  }).join('');
};

const calcFromTokens = tokens => {
  return calc(stringifyTokens(tokens));
};

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
  const correctAnswer = calc(expression);
  const answers = [correctAnswer, ...FUNCTIONS.map(f => calcFromTokens(f(tokens)))];
  const finalAnswers = shuffle(unique(answers)).map(String);
  return {
    answers: finalAnswers,
    trueIndex: finalAnswers.indexOf(String(correctAnswer))
  };
}
