$('#show').click(function() {
  $('.modal').removeClass('hidden');
  $('.modal').addClass('visible');  
});


$('#close').click(function() {
  $('.modal').addClass('hidden');
  $('.modal').removeClass('visible');
});