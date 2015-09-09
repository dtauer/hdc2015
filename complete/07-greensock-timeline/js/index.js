TweenMax.staggerFrom($("#nav img"), .2, {opacity:0, scale:.6}, .2);
var currentSlide = $(".slide:first-child");

showCurrentSlide();

$("#nav img").click(function(){
  TweenLite.to(currentSlide, .5, {rotationX:-90, autoAlpha:0, transformOrigin:"50% 50% -100"});
  currentSlide = $(".slide")[ $(this).index() ];
  showCurrentSlide();
});


function showCurrentSlide(){
  //TweenLite.fromTo(object, duration, settingsFrom, settingsTo);
  TweenLite.fromTo(currentSlide, .5, 
                      {rotationX:90, autoAlpha:0},
                      {rotationX:0, autoAlpha:1,  transformOrigin:"50% 50% -100"}
                  );
}