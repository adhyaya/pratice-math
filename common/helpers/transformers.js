export function encodetoB64(values = {}) {
  return Object.keys(values).reduce((accumumator, currentKey) => {
    const _accumulator = accumumator;
    _accumulator[currentKey] = window.btoa(values[currentKey]);
    return _accumulator;
  }, {});
}

export default {
  encodetoB64,
};
