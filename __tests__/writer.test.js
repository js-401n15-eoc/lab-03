'use strict';

const Validator = require('../lib/validator.js');
const valObj = new Validator();
const writer = require('../lib/writer.js');
var lolex = require('lolex');
var clock = lolex.createClock();

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
    married: false, 
    kids: 0,
  };

  const goodPath = `${__dirname}/files/data/person.json`;
  const badFile = `${__dirname}/files/data/person.exe`;
  const badPath = `abcd!`;

  it('can return a valid JSON object with a proper file path and type', () => {
    writer.mockWriterWithCallback(goodPath, edward, personRules, (err, data) => {
      if (err) { throw err; }
      expect(valObj.isValid(data, personRules));
    });
  });

  it('throws an error for an invalid object type', () => {
    writer.mockWriterWithCallback(goodPath, susan, personRules, (err, data) => {
      clock.setTimeout(() => {
        expect(err).toBeTruthy();
        expect(err).toEqual('Invalid Object');
        expect(data).toBeFalsy();
      }, 1000);
    });
  });

  it('throws an error for an invalid directory', () => {
    writer.mockWriterWithCallback(badPath, edward, personRules, (err, data) => {
      clock.setTimeout(() => {
        expect(err).toBeTruthy();
        expect(err).toEqual('Invalid Directory');
        expect(data).toBeFalsy();
      }, 1000);
    });
  });

  it('throws an error for an invalid file type', () => {
    writer.mockWriterWithCallback(badFile, edward, personRules, (err, data) => {
      clock.setTimeout(() => {
        expect(err).toBeTruthy();
        expect(err).toEqual('Invalid File');
        expect(data).toBeFalsy();
      }, 1000);
    });
  });
});
