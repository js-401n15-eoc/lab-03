'use strict';

const Validator = require('../../lib/validator.js');
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
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      age: { type: 'number', required: true },
      gender: { type: 'string', required: true, approvedVals: ['male', 'female'] },
      hair: {
        type: 'object', required: true,
        color: { type: 'string', required: true },
        style: { type: 'string', required: true },
      },
      children: { type: 'array', valueType: 'string' },
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

  const baldSusan = {
    id: '123-45-6789',
    name: 'Susan Nullhair',
    age: 66,
    gender: 'female',
    hair: {
    },
    children: [],
  };

  const noColorSusan = {
    id: '123-45-6789',
    name: 'Susan Baldie',
    age: 66,
    gender: 'female',
    hair: {
      style: 'bald',
    },
    children: [],
  };

  const fred = {
    id: 38,
    name: 'Freddy McCoder',
    hair: {
      style: 'short',
      color: 'black',
    },
    children: [],
  };

  const fredWithProperChildren = {
    id: '321-94-9843',
    name: 'Freddy McCoder',
    age: 44,
    gender: 'male',
    hair: {
      style: 'short',
      color: 'black',
    },
    children: ['Bob', 'Tom', 'Sue'],
  };

  const fredWithInvalidChildren = {
    id: '321-94-9843',
    name: 'Freddy McCoder',
    age: 44,
    hair: {
      style: 'short',
      color: 'black',
    },
    children: ['Bob', 123, 'Sue'],
  };

  const nonBinaryFred = {
    id: '321-94-9843',
    name: 'Freddy McCoder',
    age: 22,
    gender: 'X',
    hair: {
      style: 'short',
      color: 'black',
    },
    children: [],
  };

  it('validates the presence of required object properties at any level', () => {
    // i.e. does person.hair.color exist and have a good value, not just person.hair
    expect(valObj.isValid(susan, personRules)).toBeTruthy();
    expect(valObj.isValid(baldSusan, personRules)).toBeFalsy();
    expect(valObj.isValid(noColorSusan, personRules)).toBeFalsy();
  });

  it('validates the proper types of object properties', () => {
    // i.e. person.name must be a string, etc.
    expect(valObj.isValid(fred, personRules)).toBeFalsy();
  });

  it('validates the types of values contained in an array', () => {
    // i.e. an array of all strings or numbers
    expect(valObj.isValid(fredWithProperChildren, personRules)).toBeTruthy();
    expect(valObj.isValid(fredWithInvalidChildren, personRules)).toBeFalsy();
  });

  it('validates a value array against an approved list', () => {
    // i.e. a string might only be allowed to be "yes" or "no"
    expect(valObj.isValid(nonBinaryFred, personRules)).toBeFalsy();
  });

  // TODO: Cover so, so many more cases

});

