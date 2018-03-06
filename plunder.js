//Plunder.js
let m = require('maestro');

function jsonFiles(...args){
  let files = flatOf(args);
 
  return files.filter(file => file.endsWith('.json'));
}

function getFileContent(file){
  let fscb = function(err, data) {
    if(err) console.log(err);
    return data;
  }
  
  return fs.readFile(file, fscb)
}

function info(parsedJson){
  let ks = Object.keys(parsedJson);
  let obs = ks.filter(x => typeof parsedJson[x] === "object")
    .map(x => { return {key: x, value: parsedJson[x]} });
  
  return {keys: ks, keyCount: ks.length, children: obs}
}

function keyInfo(parsedJson, ...keys){
  let ks = flatOf(keys);

  return ks.map(x => {
    if(parsedJson[x] === undefined) return {};
    return {key: x, type: typeof(parsedJson[x]), value: parsedJson[x]};
  });
}

function keys(parsedJson, ...predicates){
  let ks = Object.keys(parsedJson);
  group(ks, predicates);
}

function searchKeys(parsedJson, ...keys){
  let fkeys = flatOf(keys);
  let ks = Object.keys(parsedJson);
  let res = partition(ks, x => fkeys.includes(x)); 

  return label(res, "found", "not_found")
}

//Split a JSON object into components where a componenet is a new object constructed of 
// a singleton key/value pair that is a child of the original object.
function components(parsedJson){
  let ks = Object.keys(parsedJson);

  return ks.map(x => {
    let o = {}; 
    o[x] = parsedJson[x];
    return o;
  })
}

function expungeKeys(parsedJson, ...keys){
  let foundK = searchKeys(parsedJson, keys).found;
  let r = Object.assign({}, parsedJson);

  foundK.forEach(x => delete r[x]);
  return r;
}

