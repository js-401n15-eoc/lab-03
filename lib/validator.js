'use strict';
const Person = require('../classes/person.js');

class Validator {
  isString(input) {
    return typeof input === 'string';
  }

  isNumber(input) {
    return typeof input === 'number';
  }

  isArray(input) {
    return Array.isArray(input);
  }

  isObject(input) {
    return typeof input === 'object';
  }

  isFunction(input) {
    return typeof input === 'function';
  }

  isBoolean(input) {
    return typeof input === 'boolean';
  }

  isPerson(input) {
    return typeof input === 'Person';
  }

  isCorrectType(value, type) {
    switch (type) {
      case 'string':
        return this.isString(value);
      case 'number':
        return this.isNumber(value);
      case 'array':
        return this.isArray(value);
      case 'object':
        return this.isObject(value);
      case 'function':
        return this.isFunction(value);
    }
  }

  isTruthy(value) {
    return !!value;
  }

  isValid(input, rules) {
    for (let fieldName in rules.fields) {
      let field = rules.fields[fieldName];
      let required = field.required ? this.isTruthy(input[fieldName]) : true;
      let type = field.type ? this.isCorrectType(input[fieldName], field.type) : true;
      let hasApprovedArr = field.approvedVals ? field.approvedVals.includes(input[fieldName]) : true;

      if (field.type === 'object') {
        if (Object.keys(input[fieldName]).length === 0) return false;

        for (let subField in field) {
          let subReq = field[subField].required ? this.isTruthy(subField) : true;
          let subType = field[subField].type ? this.isCorrectType(input[fieldName][subField], field[subField].type) : true;
          if (!(subReq && subType)) return false;
        }
      }

      if (field.type == 'array') {
        let arrChild = input[fieldName];
        for (let i in arrChild) {
          if (!this.isCorrectType(arrChild[i], field.valueType)) {
            return false;
          }
        }
      }

      if (!(required && type && hasApprovedArr)) return false;
    }
    return true;
  }
}

module.exports = Validator;