module.exports = class Hero {
  constructor(){
    document.addEventListener("scroll", ()=>{
      let scrollDown = document.querySelector(".hero::after");
      console.log(scrollDown);
      if(scrollDown !== null || scrollDown !== undefined) scrollDown.style.content = "";
    });
  }
}
