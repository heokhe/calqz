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

export const formatNumber = number => {
  if (isNaN(number)) return 'NaN';
  if (number < 0) return `-${formatNumber(-number)}`;
  if (number === Infinity) return '∞';

  if (number.toString().includes('e')) {
    let [base, pow] = number.toString().split('e');
    if (pow.startsWith('+')) pow = pow.slice(1);
    return `${formatNumber(parseFloat(base))} * 10^${pow}`;
  }

  const [intPart, decimalPart] = number.toFixed(10).split('.');
  let withCommas = '';
  for (let i = 0; i < intPart.length; i++) {
    if (i && (intPart.length - i) % 3 === 0) {
      withCommas += ',';
    }
    withCommas += intPart[i];
  }

  const decimalPartWithoutTrailingZeros = decimalPart.replace(/0+$/, '');
  return decimalPartWithoutTrailingZeros ? `${withCommas}.${decimalPartWithoutTrailingZeros}` : withCommas;
};
