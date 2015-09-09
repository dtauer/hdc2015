TweenLite.ticker.fps(60);

/*  Just an example to show you the type of animation that you can create on devices that don't support Flash. 
    Give it a spin on your iOS device. We think you will like the results.

    This banner uses a handful CSS properties that require a modern browser. We recommend Google Chrome.
    Animation powered by the GreenSock Animation Platform (GSAP)
    Learn more: http://www.greensock.com/gsap-js/
*/

var $banner = $("#banner"),
    $slide1 = $("#slide1"),
    $create = $("h1"),
    $stunning = $("h2"),
    $animations = $("h3"),
    $for = $("h4"),
    $deviceHead = $("#deviceHead"),
    $tablet = $("#tablet"),
    $desktop = $("#desktop"),
    $laptop = $("#laptop"),
    $mobile = $("#mobile"),  
    $iphone = $("#iphone"),
    $logoman = $("#logoman"),
    $learnMore = $("#learnMore"),
    $replay = $("#replay"),
    timeline;

//CSSPlugin makes it much easy to set rotation, autoAlpha (visibility and opacity combined), transformPerpsective and other css props that would otherwise require vendor-prefixing.
function initCSS() {
  TweenLite.set($animations, {rotation:90});
  TweenLite.set($for, {autoAlpha:0});
  TweenLite.set($deviceHead, {transformPerspective:600});
  TweenLite.set($tablet, {scale:0.34, y:18, x:-38});
}

/*  The following 3 functions are responsible for creating (and returning) timelines for each section of the entire banner. 
    Creating individual timelines for each section allows you to
      * keep your code clean, modular and manageable
      * place the timeline wherever you like in the main timeline and easily move it around whenever you like
      * affect the timeScale() (playback speed) of a particular section without affecting the banner as a whole
      * reuse animations multiple times
*/

function getIntroTextTimeline() {
  var tl = new TimelineLite();
  tl.from($create, 0.4, {scale:0.2, autoAlpha:0, ease:Back.easeOut})
  .from($stunning, 0.2, {top:-60}) //added 0.1 seconds after current end of timeline
  .from($animations, 0.4, {top:400, ease:Power2.easeIn})
  .to($slide1, 0.3, {rotation:-90, left:-125, top:26}) //creates a label called "rotateOut" at current end of timeline and places tween there
  .to($stunning, 0.2, {left:-300}) //adds tween at "rotateOut" label 
  .to($animations, 0.2, {left:30})
  .to($animations, 0.2, {left:122}) //label marks the start of the reveal of the word "for"
  .to($for, 0.2, {autoAlpha:1})
  .to($for, 0.2, {autoAlpha:0, left:300})
  .to($animations, 0.2, {autoAlpha:0, top:"-=300px"})
  return tl;
}

function getDevicesTimeline() {
  var tl = new TimelineLite();
  tl.from($deviceHead, 0.5, {autoAlpha:0})
  .from($desktop, 0.5, {rotation:-50, transformOrigin:"50% 500px"}) //rotates around a point 500px below the element
  .add("desktopOut", "+=0.5")
  .to($deviceHead, 0.25, {rotationX:-90, transformOrigin:"50% 100%"}, "desktopOut") //rotates around bottom edge of element
  .to($desktop, 0.5, {rotation:50, transformOrigin:"50% 500px"}, "desktopOut")
  .set($deviceHead, {text:"Laptop"}, "desktopOut+=0.25") //TextPlugin changes the text of a DOM elment. Allows us to re-use the same element multiple times
  .from($laptop, 0.5, {rotation:-50, transformOrigin:"50% 500px"}, "desktopOut")
  .fromTo($deviceHead, 0.25, {rotationX:90}, {rotationX:0, transformOrigin:"50% 100%", immediateRender:false}, "desktopOut+=0.25")
  .add("laptopOut", "+=0.5")
  .to($deviceHead, 0.25, {rotationX:-90, transformOrigin:"50% 100%"}, "laptopOut")
  .to($laptop, 0.5, {rotation:50, transformOrigin:"50% 500px"}, "laptopOut")
  .set($deviceHead, {text:"and Mobile"}, "laptopOut+=0.25")
  .from("#mobile", 0.5, {rotation:-50, transformOrigin:"50% 500px"}, "laptopOut")
  .fromTo($deviceHead, 0.25, {rotationX:90}, {rotationX:0, transformOrigin:"50% 100%", immediateRender:false}, "laptopOut+=0.25")
  return tl;
}

function getTabletAnimation() {
  var tl = new TimelineLite();
  tl.fromTo("#tablet_end_screen", 0.6, { clip:"rect(125px 300px 125px 0px)"}, { clip:"rect(0px 300px 250px 0px)"}, "revealTablet")
  .to($tablet, 0.4, {backgroundColor:"black"}, "revealTablet")
  .add("tabletGrow", "-=0.200")
  .to($tablet, 0.5, {scale:1, x:0, y:-10, ease:Back.easeOut}, "tabletGrow")
  .to($iphone, 0.4, {scale:0.2}, "tabletGrow")
  .add("logoman", "-=0.2")
  .set($logoman, {autoAlpha:1}, "logoman")
  .from($logoman, 0.3, {left:20, scale:2, ease:Back.easeOut}, "logoman")
  .from($learnMore, 0.2, {autoAlpha:0, scale:0.1, ease:Back.easeOut})
  .add(TweenMax.to($learnMore, 0.5, {boxShadow:"0px 0px 20px 2px #91f600", repeat:3, yoyo:true}), "+=0.8")
  .from("#replay", 0.4, {autoAlpha:0, rotation:"360_ccw"}, "-=1");
  return tl;
}

/*  This methods glues all 3 section timelines together.
    You can insert each timeline wherever you choose allowing our sub-timelines to overlap or have some "dead time" between them.
    By placing labels in the timeline via add("someLabel", somePosition) it makes it very easy for us to mark the insertion points and navigate to them
*/
    
function createMasterTimeline() {
  timeline = new TimelineLite();
  timeline.set($banner, {autoAlpha:1})
    .add(getIntroTextTimeline(), 0.3) //add the first animation at a time of 0.3 seconds
    .add(getDevicesTimeline()) //add the second animation and the "devices" label
    .add(getTabletAnimation()); 
    timeline.timeScale(1) // put a 4 in there, I dare you ;)
}  

// *** config buttons *** 

$learnMore.mouseenter(function(e){
  TweenMax.fromTo($learnMore, 0.6, {boxShadow:"0px 0px 0px 0px green"}, {boxShadow:"0px 0px 20px 2px #91f600", repeat:-1, yoyo:true});
});

$learnMore.mouseleave(function(e){
  TweenMax.to($learnMore, 0.2, {boxShadow:"0px 0px 0px 0px yellow"});
});

$replay.mouseenter(function(e){
  TweenLite.to($replay, 0.5, {rotation:"+=360", alpha:1});
})
  
$replay.mouseleave(function(e){
  TweenLite.to($replay, 0.5, {alpha:0.6});
})

$replay.click(function(){
  timeline.restart();
});


//get this party started
initCSS();
createMasterTimeline();


