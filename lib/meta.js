/* Plunder Meta */

const tarski = require('tarski');

function keys(json){
  return Object.keys(json);
}

function values(json){
  return keys(json).map(x => json[x]);
}

// Segment json into component parts using an optional predicate.
// default predicate is true.
function parts(json, predicate = tarski.memoize(true)){
  return keys(json).filter(predicate)
    .map(x => { return {key: x, value: json[x]} }); 
}

function objects(json){
  return parts(json, x => json[x] === Object(json[x]) && !Array.isArray(json[x]));
}

function components(json){
  return parts(json, x => typeof json[x] === "object") 
}

function simples(json){
  return parts(json, x => typeof json[x] !== "object");
}

function info(json){
  return {
      keys: keys(json), 
      count: keys(json).length, 
      components: {count: components(json).length, contents: components(json)}, 
      simples: {count: simples(json).length, contents: simples(json)}
  }
}

exports.keys = keys;
exports.values = values;
exports.parts = parts;
exports.components = components;
exports.objects = objects;
exports.simples = simples;
exports.info = info;
