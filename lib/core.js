/* Core Functions */
const tarski = require('tarski');
const fs = require('fs')

function jsonfiles(...files){
  files = tarski.reducer.flat(files);
  return files.filter(file => file.endsWith('.json'));
}

function getjson(file){ 
  return JSON.parse(fs.readFileSync(file))
}

function searchKeys(json, ...keys){
  let fkeys = flatOf(keys);
  let res = partition(ks(json), x => fkeys.includes(x)); 

  return label(res, "found", "not_found")
}

function decompose(json){
  if(json === undefined) return [];
  
  return ks(json).map(x => {
    let o = {}; 
    o[x] = json[x];
    return o;
  })
}

//"deep" decompose
function atomize(json, predicate = memoize(false)){
  if(json === undefined) return [];

  return ks(json).map(x => {
    let o = {};
    if(predicate(x)) {
      o[x] = deconstruct(j[x], predicate);
    } else {
      o[x] = j[x]; 
    }
    return o;  
  });
}

function compose(...parts){
  let fparts = maestro.reducer.flat(parts);
  let o = {}; 
 
  fparts.forEach(x => ks(x).forEach(y => o[y] = x[y])) 
  return o;
}

function expungeKeys(parsedJson, ...keys){
  let foundK = searchKeys(parsedJson, keys).found;
  let r = Object.assign({}, parsedJson);

  foundK.forEach(x => delete r[x]);
  return r;
}

exports.jsonfiles = jsonfiles;
exports.getjson = getjson;
