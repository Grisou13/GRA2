//require("./modernizr");
require("./polyfills");
var jQuery = window.jQuery = window.$ = require('jquery')
// Bootstrap doesn't have a "main" field / export anything =(
//var bootstrap = require('bootstrap-sass/assets/javascripts/bootstrap')
var Materialize = require("materialize")
global.particleJS = window.particleJS = require("particle")
jQuery.noConflict(true);
var NavBar = require('./nav');
var Hero = require('./hero');
//
let nav = new NavBar();
let c = new Hero();