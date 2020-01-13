'use strict';

module.exports = exports = {};

exports.readFile = (file, cb) => {
  if( file.match(/bad/i) ) {
    cb('Invalid File');
  }
  else {
    //const obj = {"firstName":"Edward","lastName":"Scissorhands","hair":{"type":"wavy","color":"brown"},"favoriteFoods":["pizza","cupcakes","children"],"married":false,"kids":0}
    // const mockFs = module.constructor._load('fs');
    // mockFs.readFile(file, (err, data) => {
    //       if (err) { callback(err); }
    // else { callback(undefined, data.toString().trim()); }
    // });
    //let fileContents = req.body('file');
    cb(undefined, Buffer.from(file));
  }
};

exports.writeFile = (object, cb) => {
  
}