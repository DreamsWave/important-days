export function filterObject(obj, predicate) {
  // Object.keys(obj)
  //   .filter(key => predicate(obj[key]))
  //   .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})
  return Object.assign(...Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .map(key => ({ [key]: obj[key] })));
}

export function mapObject(o, f, ctx) {
  ctx = ctx || this;
  var result = {};
  Object.keys(o).forEach(function (k) {
    result[k] = f.call(ctx, o[k], k, o);
  });
  return result;
}