function parseEEResponse(text) {
  var t, parts = text.split('\n');

  var resp = {};
  parts.forEach((row) => {
    t = row.split(': ');
    if( t.length <= 1 ) return;
    var p1 = t[0].trim();
    var p2 = t[1].trim();
    if( !p1 || !p2 ) return;
    resp[p1] = p2;
  });

  return resp;
}

function getEEProcessToken(text) {
  var parts = text.split(': ');
  if( parts.length <= 1 ) return null;
  return parts[1].trim();
}

module.exports = {
  parseEEResponse : parseEEResponse,
  getEEProcessToken : getEEProcessToken
}