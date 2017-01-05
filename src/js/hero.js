module.exports = class Hero {
  constructor(){
    document.addEventListener("scroll", ()=>{
      let scrollDown = document.querySelector(".hero::after");
      scrollDown.stylelist.toggle("fade-out")
    });
  }
}
