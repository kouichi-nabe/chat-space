$(function(){
  $(".message-from").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: POST,
      url: group_messages_path(group),
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
  })
})
