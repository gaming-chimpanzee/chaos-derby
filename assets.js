// Chaos Derby (Side-scroll) - assets.js
// File-open compatible. No external dependencies.
window.ASSETS = {
  images: {
    // Optional: provide paths if you add images later.
    // player: "player.png",
    // enemy: "enemy.png",
  }
};

window.AssetStore = (function(){
  function AssetStore(){
    this.img = {};
    this.ready = false;
    this.missing = {};
  }
  AssetStore.prototype.load = function(cb){
    const entries = Object.entries(window.ASSETS.images || {});
    if(entries.length===0){ this.ready=true; cb&&cb(); return; }
    let left = entries.length;
    entries.forEach(([k,src])=>{
      const im = new Image();
      im.onload = ()=>{ this.img[k]=im; if(--left===0){ this.ready=true; cb&&cb(); } };
      im.onerror = ()=>{ this.missing[k]=src; if(--left===0){ this.ready=true; cb&&cb(); } };
      im.src = src;
    });
  };
  return AssetStore;
})();
