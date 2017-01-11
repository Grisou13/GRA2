module.exports = class NavBar{
  constructor(){
    document.querySelectorAll(".nav-toggle").forEach((el)=>{
      var nav = el.dataset.target;
      document.querySelectorAll(nav).forEach((nav_el)=>{
        el.addEventListener("click",()=>{
          nav_el.classList.add("animated")
          nav_el.classList.toggle("show")
          document.querySelectorAll(".nav-fix").forEach((e_)=>{
            e_.classList.toggle("hidden");
          })
          //nav_el.classList.toggle("animated");
          // if(nav_el.classList.contains("bounceInDown")){
          //   nav_el.classList.remove("bounceInDown");
          //   nav_el.classList.add("bounceOutUp");
          //   let cb = (e) =>{
          //     nav_el.classList.remove("show");
          //   }
          //   ("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend".split(" ")).forEach((e_)=>{
          //       window.addEventListener(e_,cb,false);
          //   });
          // }
          // else{
          //   nav_el.classList.add("bounceInDown");
          //   nav_el.classList.remove("bounceOutUp");
          //   let cb = (e) =>{
          //     nav_el.classList.add("show");
          //   }
          //   ("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend".split(" ")).forEach((e_)=>{
          //       window.addEventListener(e_,cb,false);
          //   });
          // }



        })
      })
    })
  }
}
