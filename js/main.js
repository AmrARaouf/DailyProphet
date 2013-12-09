window.addEventListener("load", function() {
  var v = document.getElementById("v");
  var c = document.getElementById("c");
  var ctx = c.getContext("2d");
  var bc = document.createElement('canvas');
  var bctx = bc.getContext('2d');
  var cw, ch;
  cw = c.width;
  ch = c.height;
  bc.width = cw;
  bc.height = ch;

  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,373,210);
 
  v.addEventListener("play", function() {
    draw(v,ctx,bctx,cw,ch);
  }, false);

}, false);

function draw(v,c,bc,w,h) {
  if(v.paused || v.ended) return false;
  bc.drawImage(v,0,0,w,h);
  var idata = bc.getImageData(0,0,w,h);
  var data = idata.data;
  for(var i = 0; i < data.length; i+=4) {
    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
    var brightness = (3*r+4*g+b)>>>3;
    data[i] = brightness;
    data[i+1] = brightness;
    data[i+2] = brightness;
  }
  idata.data = data;
  c.putImageData(idata,0,0);
  setTimeout(function(){ draw(v,c,bc,w,h); }, 0);
}

function playVideo() {
  var v = document.getElementById("v");
  var b = document.getElementById("play-pause");
  if (v.paused) {
    v.play();
    b.textContent = "Pause";
  } else {
    v.pause();
    b.textContent = "Play";
  }
}