var playhead = $("#container div");
var position = 0;
var containerWidth = $("#container").width();
var playheadWidth = playhead.width();
var speed = 5;
var animationID;

function animate(){
  position += speed;
  playhead.css("left", position);
  if(position > containerWidth - playheadWidth || position < 0){
    speed *= -1; //change directions
  }
   
  animationID = requestAnimationFrame(animate);//recalls the function over and over
  
}

//Start Button Code
$("#startBtn").click(function(){
  cancelAnimationFrame(animationID); //cancel anything that's running
  animate(); //Start the animation
}); 

//Stop Button Code
$("#stopBtn").click(function(){
   cancelAnimationFrame(animationID);
}); 

//Reset Button Code
$("#resetBtn").click(function(){
  cancelAnimationFrame(animationID); //stop animation
  position = 0;
  playhead.css("left", position);  
});