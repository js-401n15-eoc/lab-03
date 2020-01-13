'use strict';

const Validator = require('../lib/validator.js');
const valObj = new Validator();
const reader = require('../lib/reader.js');

describe('reader', () => {
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

  const goodPath = `${__dirname}/files/data/person.json`;
  const badPath = `${__dirname}/files/data/person.exe`;

  it('can return a valid JSON object with a proper file path and type', () => {
    reader.mockReaderWithCallback(goodPath, (err, data) => {
      if (err) { throw err; }
      expect(valObj.isValid(data, personRules)).toBeTruthy();
    });
  });

  it('throws an error for an invalid file type', () => {
    reader.mockReaderWithCallback(badPath, (err, data) => {
      expect(err).toBeTruthy();
      expect(err).toEqual('Invalid File');
    });
  });
});

