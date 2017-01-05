module.exports = class NavBar{
  constructor(){
    document.querySelectorAll(".nav-toggle").forEach((el)=>{
      var nav = el.dataset.target;
      document.querySelectorAll(nav).forEach((nav_el)=>{
        el.addEventListener("click",()=>{
          nav_el.classList.toggle("show");
          let transProps = getTransitionProperty(nav_el);
          console.log(transProps);
        })
      })
    })
  }
}
