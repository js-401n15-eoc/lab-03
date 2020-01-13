'use strict';

const Validator = require('../lib/validator.js');
const valObj = new Validator();

describe('validator module performs basic validation of', () => {

  // TODO: Make this series of tests less repetitive ... DRY it out
  let str = 'yes';
  let num = 1;
  let arr = ['a'];
  let obj = { x: 'y' };
  let func = () => { };
  let bool = false;

  const varTypes = {
    'string': str,
    'number': num,
    'array': arr,
    'object': obj,
    'function': func,
    'boolean': bool,
  };

  it('strings', () => {
    for (var key in varTypes) {
      if (key === 'string') {
        expect(valObj.isString(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isString(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('numbers', () => {
    for (var key in varTypes) {
      if (key === 'number') {
        expect(valObj.isNumber(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isNumber(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('arrays', () => {
    for (var key in varTypes) {
      if (key === 'array') {
        expect(valObj.isArray(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isArray(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('objects', () => {
    for (var key in varTypes) {
      if (key === 'array' || key === 'object') {
        expect(valObj.isObject(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isObject(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('booleans', () => {
    for (var key in varTypes) {
      if (key === 'boolean') {
        expect(valObj.isBoolean(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isBoolean(varTypes[key])).toBeFalsy();
      }
    }
  });

  it('functions', () => {
    for (var key in varTypes) {
      if (key === 'function') {
        expect(valObj.isFunction(varTypes[key])).toBeTruthy();
      } else {
        expect(valObj.isFunction(varTypes[key])).toBeFalsy();
      }
    }
  });
});

describe('valObj module performs complex validations', () => {
  const personRules = {
    fields: {
      firstName: { typing: 'string', required: true },
      lastName: { typing: 'string', required: true },
      hair: {
        typing: 'object', required: true,
        type: { typing: 'string', required: true },
        color: { typing: 'string', required: true },
      },
      favoriteFoods: { typing: 'array', valueType: 'string' },
      married: { typing: 'boolean', required: true },
      kids: { typing: 'number', required: true },
    },
  };

  const susan = {
    id: '123-45-6789',
    name: 'Susan McDeveloperson',
    age: 37,
    gender: 'female',
    hair: {
      color: 'brown',
      style: 'long',
    },
    children: [],
  };


  const edward = {
    firstName: 'Edward',
    lastName: 'Scissorhands',
    hair: {
      type: 'wavy',
      color: 'brown',
    },
    favoriteFoods: ['pizza','cupcakes','children'],
    married: true, 
    kids: 0,
  };

  it('validates object contains all fields based on rules', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair
    expect(valObj.isValid(edward, personRules)).toBeTruthy();
    expect(valObj.isValid(susan, personRules)).toBeFalsy();
  });
});

