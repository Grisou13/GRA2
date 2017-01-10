module.exports = class Hero {
  constructor(){
    document.addEventListener("scroll", (e)=>{
      console.log(e);
      let scrollDown = document.querySelector(".scroll-helper");
      if (!scrollDown.classList.contains("animated")){
        //console.log(scrollDown);
        if(e.pageY <= 10){
          scrollDown.classList.remove("fadeOutRightBig")
          scrollDown.classList.add("fadeIn")
        }
        else{
          scrollDown.innerHtml = "";
          scrollDown.classList.remove("fadeIn")
          scrollDown.classList.add("fadeOutRightBig")
          //console.log(scrollDown.classList)
        }
      }

    });
  }
}
