//require("./modernizr");
require("./polyfills");
var $ = jQuery = window.jQuery = window.$ = require('jquery')
// Bootstrap doesn't have a "main" field / export anything =(
//var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap')
var Materialize = require("materialize")

jQuery.noConflict(true);
var NavBar = require('./nav');
let nav = new NavBar();
window.hero = require('./hero');

document.querySelectorAll(".scroll-top").forEach((el)=>{
  el.addEventListener("click",(e)=>{
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  })
})
$('.parallax').parallax();
//document.querySelectorAll(".parallax").forEach((el)=>el.parallax())
