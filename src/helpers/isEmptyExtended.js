import { isEmpty } from 'lodash';

const isNullOrUndefined = (value) => value === null || value === undefined;
const isNumberType = (value) => typeof value === 'number';
const isNumberConstructor = (value) => value && value.constructor === Number;

const isEmptyExtended = (value) => {
  if (isNullOrUndefined(value)) {
    return true;
  }
  if (isNumberType(value) || isNumberConstructor(value)) {
    return false;
  }
  return isEmpty(value);
};

export default isEmptyExtended;

//the top two cases lodash does not cover, these are a guard clause 