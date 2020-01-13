'use strict';

// const fs  = require('./files/__mocks__/fs.js');
const reader = require('./lib/reader.js');
const writer = require('./lib/writer.js');
const file = `${__dirname}/files/data/person.json`;
//let file = `${__dirname}/data/file.txt`;

// let readData = reader.readerWithCallback(file, (err, data) => {
//     if (err) { throw err };
//     console.log('Callback from fs read', data);
//     return data;
// });

// const writeData = writer.writerWithCallback(file, readData, (err, data) => {
//     if (err) { throw err };
//     console.log('Callback from fs write', data);
// });

// readData(file, (err, data) => {
//     if (err) { throw err };
//     writer.writerWithCallback(file, data, (err, innerData) => {
//         if (err) { throw err };
//         console.log('Callback from fs write', innerData);
//     });
// });

let editHelper = (err, file) => {
    if (err) { throw err; }
    console.log('2: Received file: ', file);
    reader.readerWithCallback(file, (err, data) => {
        if (err) { throw err; }
        console.log('Callback from fs read: ', data);
        console.log('Current marital status: ', data.married);

        writer.writerWithCallback(file, data, (innerErr, innerData) => {
            if (innerErr) { throw innerErr };
            console.log('Callback from fs write', innerData);
            console.log(`Changed marital status to ${innerData.married}`);
        });
    });
}

let editFile = (file, cb) => {
    console.log('1: Calling the error first callback (read data)');
    cb(undefined, file);
}

editFile(file, editHelper);