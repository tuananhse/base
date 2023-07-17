import _ from 'lodash';

const transform: any = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map(v => transform(v));
  } else if (obj?.constructor != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [_.camelCase(key)]: transform(obj[key]),
      }),
      {},
    );
  }
  return obj;
};

export default {transform};
