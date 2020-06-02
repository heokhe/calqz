const getOrder = x => {
  if (x === 0) return 0;
  if (x < 0) x = -x;
  if (x < 1) return -getOrder(1 / x) - 1;
  let n = 0;
  while (x >= 10) {
    x /= 10;
    n++;
  }
  return n;
};

export function addZeros(x) {
  const o = getOrder(x),
    r = x / (10 ** o);
  if (o >= 3 && (10 * r) % 1 === 0)
    return x * (Math.random() > 0.5 ? 10 : 0.1);
  return x;
}

export function removeZeros(x) {
  const o = getOrder(x),
    r = x / (10 ** o);
  if (o <= -2 && (10 * r) % 1 === 0)
    return x / (Math.random() > 0.5 ? 0.1 : 100);
  return x;
}

export function produceRandomValues(x) {
  const o = getOrder(x),
    fp = (o / 2) * (1 + Math.random()),
    p = o > 0 ? Math.ceil(fp) : Math.floor(fp),
    t = (Math.random() > 0.5 ? -1 : 1) * (10 ** p);
  return x + t;
}
