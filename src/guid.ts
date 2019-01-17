function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789S";
export function accessKeygen() {
  let accessKeyGenerator = [
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random(),
    Math.random()
  ];
  return accessKeyGenerator
    .map(num => alphabet[Math.floor(num * alphabet.length)])
    .join("");
}

export default guid;
