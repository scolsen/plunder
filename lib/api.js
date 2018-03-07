/* Plunder OPEN API */

const meta = require('./meta');

function tags (json){
  if(json.tags === undefined) return [];
  return meta.components(json.tags);
}

function paths (json){ 
  if(json.paths === undefined) return [];
  return meta.components(json.paths);
}

function definitions (json){
  if(json.definitions === undefined) return [];
  return meta.components(json.definitions);
}

exports.tags = tags;
exports.paths = paths;
exports.definitions = definitions;
