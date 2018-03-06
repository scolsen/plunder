/* OPEN API Functions */
const core = require('./core');

function tags (json) {
  return components(json.tags);
}

function paths(json) { 
  return components(json.paths);
}

function 
