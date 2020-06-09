import { Token } from '@hkh12/node-calc';

export const pipe = (...functions) => functions.reduce((a, b) => c => b(a(c)), _ => _);

export const shuffle = array => {
  const clone = [...array];
  if (array.length < 2) return clone;
  const index = Math.floor(Math.random() * array.length);
  const item = clone[index];
  clone.splice(index, 1);
  return [item, ...shuffle(clone)];
};

export const unique = array => array.filter((x, i) => array.indexOf(x) === i);

export const isNonSense = tokens => tokens.length === 1 && tokens[0].type === Token.TYPES.NUMBER;
