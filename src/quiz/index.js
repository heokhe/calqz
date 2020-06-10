import { evalTokens } from '@hkh12/node-calc';
import * as tm from './tokenManipulations';
import * as nm from './numberManipulations';
import { pipe, shuffle, unique } from '../helpers';

const TOKEN_MANIPULATORS = [
  tm.randomlyRemoveParenthesis,
  tm.tokenizeFromRightToLeft,
  pipe(tm.randomlyRemoveParenthesis, tm.tokenizeFromRightToLeft),
  tm.solveWithIncorrectPriorities
];

const NUMBER_MANIPULATORS = [
  nm.addZeros,
  nm.removeZeros,
  nm.produceRandomValues,
  nm.produceRandomValues
];

export function generateQuiz(tokens) {
  const correctAnswer = evalTokens([...tokens]); // because evalTokens mutates
  const answers = [
    correctAnswer,
    ...TOKEN_MANIPULATORS.map(f => evalTokens(f(tokens))),
    ...NUMBER_MANIPULATORS.map(f => f(correctAnswer))
  ];
  const finalAnswers = shuffle(unique(answers)).map(String);
  const time = Math.floor(Math.sqrt(tokens.length * tokens.join('').replace(/ /g, '').length));
  return {
    answers: finalAnswers,
    trueIndex: finalAnswers.indexOf(String(correctAnswer)),
    time
  };
}
