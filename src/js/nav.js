module.exports = class NavBar{
  applyNavToggle(toggleIn, toggleOff,onToggleInCb, onToggleOffCb){
    var nav = toggleIn.dataset.target;
    document.querySelectorAll(nav).forEach((target)=>{
      toggleIn.addEventListener("click",()=>{
        if(!target.classList.contains("animated"))target.classList.add("animated")
        target.classList.add("show")
        if(!toggleIn.classList.contains("animated"))toggleIn.classList.add("animated");
        toggleIn.classList.add("bounceOutDown");
        target.classList.add("bounceInDown");
        onToggleInCb(toggleIn,target);
      })
    })

    toggleOff.addEventListener("click",(e)=>{
      document.querySelectorAll(nav).forEach((target)=>{
        if(!target.classList.contains("animated"))target.classList.add("animated")

        if(!toggleOff.classList.contains("animated"))toggleOff.classList.add("animated");
        target.classList.remove("bounceInDown");
        target.classList.add("fadeOut");
        toggleIn.classList.remove("bounceOutDown");
        toggleIn.classList.add("bounceInUp");
        target.classList.remove("show")

        onToggleInCb(toggleIn,target);
      })
    })
  }
  constructor(){
    //nav pushpin
    // document.querySelectorAll(".nav-fix").forEach((nav)=>{
    //   var target = nav.dataset.target;
    // })
    //naviagtion toggles
    this.applyNavToggle(document.querySelector(".nav-fix"),document.querySelector(".nav .nav-toggle"),(on,target)=>{},()=>{});
    // document.querySelectorAll(".nav-toggle").forEach((el)=>{
    //   var nav = el.dataset.target;
    //   document.querySelectorAll(nav).forEach((nav_el)=>{
    //     el.addEventListener("click",()=>{
    //       nav_el.classList.add("animated")
    //       document.querySelectorAll(".nav-fix").forEach((e_)=>{
    //         e_.classList.add("animated");
    //       })
    //       if(nav_el.classList.contains("show"))
    //       {
    //         nav_el.classList.remove("show")
    //         nav_el.classList.add("close")
    //         document.querySelectorAll(".nav-fix").forEach((e_)=>{
    //           e_.classList.remove("fadeOut");
    //           e_.classList.add("fadeIn");
    //         })
    //       }
    //       else
    //       {
    //         nav_el.classList.add("show")
    //         nav_el.classList.remove("close")
    //         document.querySelectorAll(".nav-fix").forEach((e_)=>{
    //           e_.classList.remove("fadeIn");
    //           e_.classList.add("fadeOut");
    //         })
    //       }
    //     })
    //   })
    // })
  }
}
