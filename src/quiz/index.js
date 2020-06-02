import { tokenize, evalTokens } from '@hkh12/node-calc';
import {
  randomlyRemoveParenthesis, solveWithIncorrectPriorities, tokenizeFromRightToLeft
} from './tokenManipulations';
import { pipe, shuffle, unique } from '../helpers';

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
