/*
Made possible by GreenSock Animation Platform (GSAP) v12 beta.
http://www.greensock.com/gsap-js/

This effect works great in modern browsers: Chrome, Safari, and FireFox.

IE does not support transform-style:preserve3d, so the 3D may look a little flat. 
Once again IE proves its ability to hinder progress and inflict pain on developers.
http://msdn.microsoft.com/en-us/library/ie/hh673529(v=vs.85).aspx#_3dtranslate
*/

var trans3DDemo = $("#trans3DDemo"), 
    trans3DBoxes = $("#trans3DBoxes"),// div containing all the orange boxes
    boxes = $("#trans3DBoxes div"), // all orange boxes   
		  slider = $("#slider"), 
		  play_btn = $("#play_btn").button(),
    threeDTimeline = new TimelineLite({onUpdate:updateSlider}); //onUpdate allows the slider to stay in sync as animation plays
    
//transformPerspective gives the element its own vanishing point
//perspective allows all the child elements (orange boxes) to share the same vanishing point with each other
//transformStyle:"preserve3d" allows the child elements to maintain their 3D position (noticeable only when their parent div is rotated in 3D space)
TweenLite.set(trans3DBoxes, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}}); //saves a dozen lines of vendor-prefixed css ;)

//fade in demo, rotate the div containing all the boxes, and add a label 0.2 seconds after the rotation
threeDTimeline.fromTo(trans3DDemo, .05, {css:{autoAlpha:0}}, {css:{autoAlpha:1}, immediateRender:true})
              .to(trans3DBoxes, 0.3, {css:{rotationY:30, rotationX:20}})
              .add("z", "+=0.2"); //add label "z" for placement of next group of tweens

//loop through each element in boxes object and give it a unique and random animation along the z-axis
boxes.each(function (index, element) {
  threeDTimeline.to(element, 0.2, {css:{z:getRandom(-50, 50)}}, "z"); //place each z-tween of each box at the label "z"
})
	
//rotate the group of boxes around a few more times  
threeDTimeline.to(trans3DBoxes, 1, {css:{rotationY:180, z:-180}, ease:Power2.easeOut}, "+=0.2")
              .to(trans3DBoxes, 1, {css:{rotationX:180, z:-10}});
	  
//random explosion effect	  
boxes.each(function (index, element) {
  threeDTimeline.to(element, 1, {css:{z:200, backgroundColor:Math.random() * 0xffffff, rotationX:getRandom(-360, 600), rotationY:getRandom(-360, -600), autoAlpha:0}}, "explode");
}) ;


//jQueryUI Slider

function updateSlider(){
  slider.slider("value", threeDTimeline.progress() *100);
}

$( "#slider" ).slider({
            range: false,
            min: 0,
            max: 100,
			step:.1,
            slide: function ( event, ui ) {
				    threeDTimeline.pause();
            threeDTimeline.progress( ui.value/100 );
            }
     });	

	
function getRandom(max, min){
	return Math.floor(Math.random() * (1 + max - min) + min);
}	
		
$("#play_btn").click(function(){
 
	if(threeDTimeline.progress()==1){
		threeDTimeline.restart();
		}else{
			threeDTimeline.play(); 
		}
})