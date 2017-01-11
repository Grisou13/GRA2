//var Materialize = require("materialize-css/js/materialize")
var particleJS = require("particle")
var config = require("./particle-config.json")
module.exports = class Hero {
  constructor(){
    particlesJS('hero-background', config);
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
    // document.addEventListener("scroll", (e)=>{
    //   console.log(e);
    //   let scrollDown = document.querySelector(".scroll-helper");
    //   if (!scrollDown.classList.contains("animated")){
    //     //console.log(scrollDown);
    //     if(e.pageY <= 10){
    //       scrollDown.classList.remove("fadeOutRightBig")
    //       scrollDown.classList.add("fadeIn")
    //     }
    //     else{
    //       scrollDown.innerHtml = "";
    //       scrollDown.classList.remove("fadeIn")
    //       scrollDown.classList.add("fadeOutRightBig")
    //       //console.log(scrollDown.classList)
    //     }
    //   }
    //
    // });
  }
}
