//require("./modernizr");
require("./polyfills");
var $ = jQuery = window.jQuery = window.$ = require('jquery')
// Bootstrap doesn't have a "main" field / export anything =(
//var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap')
var Materialize = require("materialize")
window.ParticleJsConf = require("./particle-config");
jQuery.noConflict(true);
var NavBar = require('./nav');
let nav = new NavBar();
if(location.pathname == "/")
{
  //global.particleJS = window.particleJS = require("particle")
  var Hero = require('./hero');
  let c = new Hero();


}

// document.querySelectorAll("img").forEach(function(el){
//   if(!el.classList.contains("logo"))
//     el.src = "http://lorempixel.com/640/480/city"
// });
$(document).ready(function(){
  $('.parallax').parallax();
});
//document.querySelectorAll(".parallax").forEach((el)=>el.parallax())
