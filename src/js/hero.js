//var Materialize = require("materialize-css/js/materialize")
var particleJS = require("particle")
var pConf = require("./particle-config");
module.exports = class Hero {
  constructor(){
    particlesJS('hero-background', pConf);
    let options = [
      {selector:".main", offset:600,callback : () => {
        console.log("klashdgjagsdfjsdf");
        document.querySelectorAll(".scroll-helper").forEach((el)=>{
          el.classList.add("animated")
          el.classList.add("fadeOut")
        })
      }}
    ]
    Materialize.scrollFire(options);

  }
}
