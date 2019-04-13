$(function(){

  function createBodyTag(message){
    if(message.body){
      return `<p>${message.body}</p>`
    }
  }
  function createImageTag(message){
    if(message.image_url){
      return `<img class="message-image" src="${message.image_url}">`
    }
  }
  function buildHTML(message){
    var html = `<div class="message-list__item">
                  <h2 class="message-list__item__user-name">${message.name}</h2>
                  <p class="message-list__item__message-time">${message.created_at.strftime('%Y/%m/%d %HH%:%mm%')}</p>
                  <div class="message-list__item__message">
                    ${createBodyTag(message)}
                    ${createImageTag(message)}
                  </div>
                </div>`
    return html
  }

  $(".message-from").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
      type: 'POST',
      url: 'messages',
      cache: false,
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      var messageList = $('.message-list__items')
      messageList.append(html);
      messageList.animate({scrollTop: messageList[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージの追加に失敗しました');
    })
  })
})
