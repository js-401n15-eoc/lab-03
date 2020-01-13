'use strict';

//const fs = require('../files/__mocks__/fs.js');
const fs = require('fs');

const readerWithCallback = (file, callback) => {
    fs.readFile(file, (err, data) => {
        if (err) { callback(err); }
        else { 
            const jsonObj = JSON.parse(data);
            callback(undefined, jsonObj);
        }
    });
};


module.exports = { readerWithCallback };