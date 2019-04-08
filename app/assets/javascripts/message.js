$(function(){
  $(".message-from").on("submit", function(e){
    e.preventDefault();
    console.log("イベント発火");
  })
})
