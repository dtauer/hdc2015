
var trans3DDemo = $("#trans3DDemo"), 
    trans3DBoxes = $("#trans3DBoxes"),  // div containing all the orange boxes
    boxes = $("#trans3DBoxes div"),     // all orange boxes   
    slider = $("#slider"), 
    play_btn = $("#play_btn").button();

var threeDTimeline = new TimelineLite(); 
    
TweenLite.set(trans3DBoxes, {css:{transformPerspective:400, perspective:400, transformStyle:"preserve-3d"}}); //saves a dozen lines of vendor-prefixed css ;)


//Build Timeline


$( "#slider" ).slider({
  range: false,
  min: 0,
  max: 100,
  step:.1
});	


function getRandom(max, min){
	return Math.floor(Math.random() * (1 + max - min) + min);
}	

/*
$("#play_btn").click(function(){
 
	if(threeDTimeline.progress()==1){
		threeDTimeline.restart();
  }else{
   threeDTimeline.play(); 
 }
})
*/