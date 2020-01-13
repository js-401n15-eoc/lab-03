'use strict';

const reader = require('./lib/reader.js');
const writer = require('./lib/writer.js');
const filePath = `${__dirname}/files/data/person.json`;

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

let editHelper = (err, filePath) => {
  if (err) { throw err; }
  console.log('2: Received file path: ', filePath);
  reader.readerWithCallback(filePath, (err, data) => {
    if (err) { throw err; }
    console.log('Callback from fs read:', data);
    console.log('Current marital status:', data.married);
    writer.writerWithCallback(filePath, data, personRules, (innerErr, innerData) => {
      if (innerErr) { throw innerErr; }
      console.log('Callback from fs write', innerData);
      console.log(`Changed marital status to ${innerData.married}`);
    });
  });
};

let editFile = (filePath, cb) => {
  console.log('1: Entered editfile');
  cb(!filePath ? 'Error: empty file' : undefined, filePath);
};

editFile(filePath, editHelper);
const badPath = `${__dirname}/files/data/person.exe`;

reader.mockReaderWithCallback(badPath, (err, data) => {
  if (err) { throw err; }
  console.log('Data:', data);
});