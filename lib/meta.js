/* Object Meta Data Functions */

function ks(json){
  return Object.keys(json);
}

function vs(json){
  return ks(json).map(x => json[x]);
}

function parts(json, predicate){
  return ks(json).filter(predicate)
    .map(x => { return {key: x, value: json[x]} }); 
}

function components(json){
  return parts(json, x => typeof x === "object");
}

function simples(){
  return parts(json, x => typeof x !== "object");
}

function info(json){
  return {
      keys: ks(json), 
      count: ks(json).length, 
      components: {count: components(json).length, contents: components(json)}, 
      simples: {count: simples(json).length, contents: simples(json)}
  }
}


let keys = {};

keys.info = function (json, ...keys){
  let ks = flatOf(keys);

  return ks.map(x => {
    if(json[x] === undefined) return {};
    return {key: x, type: typeof(json[x]), value: json[x]};
  });
}

keys.filtered =  function (json, ...predicates){
  let ks = Object.keys(json);
  group(ks, predicates);
}


