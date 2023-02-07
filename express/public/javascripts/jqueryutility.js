$(document).ready(function(){
  $(".outer-seat").on("click", function() {
    $(this).toggleClass('selected-outerColor');
  });
});