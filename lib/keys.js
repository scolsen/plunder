/* Plunder Keys */

const tarski = require('tarski');

function info(json, ...keys){
  let ks = tarski.reducer.flat(keys);
  if(keys.length === 0) return Object.keys(json).map(x => {
      return {key: x, type: typeof(json[x]), value: json[x]};  
    }); 

  return ks.map(x => {
    if(json[x] === undefined) return {};
    return {key: x, type: typeof(json[x]), value: json[x]};
  });
}

function group(json, ...predicates){
  let ks = Object.keys(json);
  return tarski.list.group(ks, predicates);
}

function search(json, ...keys){
  let fkeys = tarski.reducer.flat(keys);
  let res = tarski.list.partition(fkeys, x => Object.keys(json).includes(x)); 
  return tarski.list.label(res, "found", "not_found")
}

function expunge(json, ...keys){
  let found = search(json, keys).found;
  let r = Object.assign({}, json);

  found.forEach(x => delete r[x]);
  return r;
}


exports.info = info;
exports.group = group;
exports.search = search;
exports.expunge = expunge;
