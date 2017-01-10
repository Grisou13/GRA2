module.exports = class NavBar{
  constructor(){
    document.querySelectorAll(".nav-toggle").forEach((el)=>{
      var nav = el.dataset.target;
      document.querySelectorAll(nav).forEach((nav_el)=>{
        el.addEventListener("click",()=>{
          nav_el.classList.toggle("show");
          nav_el.classList.toggle("animated");
          nav_el.classList.toggle("bounceInDown");
          let transProps = getTransitionProperty(nav_el);
          console.log(transProps);
        })
      })
    })
  }
}
