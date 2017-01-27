//var Materialize = require("materialize-css/js/materialize")
var particleJS = require("particle")

module.exports = class Hero {
  constructor(){
    console.log(Materialize);
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
