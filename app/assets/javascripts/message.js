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
    var html = `<div class="message-list__item" data-message-id="${message.id}">
                  <h2 class="message-list__item__user-name">${message.name}</h2>
                  <p class="message-list__item__message-time">${message.created_at}</p>
                  <div class="message-list__item__message">
                    ${createBodyTag(message)}
                    ${createImageTag(message)}
                  </div>
                </div>`
    return html
  }

  var buildMessageHTML = function(message){
    var id = message.id
    var name = message.user_name
    var time = message.created_at;
    var body = message.body ? <p>${message.body}</p> : '';
    var image = message.image.url ? <img src="${image}" class='message-image'/> : '';
    var html = `<div class="message-list__item" data-id=${id}>
                    <h2 class="message-list__item__user-name">${name}
                    </h2>
                    <p class="message-list__item__message-time">${time}
                    </p>
                    <div class="message-list__item__message">
                      ${body}
                      ${image}
                    </div>
                 </div>`
    return html;
  };

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
      var messageList = $('.message-list__items');
      messageList.append(html);
      console.log("ajax")
      messageList.animate({scrollTop: messageList[0]..scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージの追加に失敗しました');
    })
  })

  var reloadMessages = function(){
    var last_message_id = $('.message-list__item:last').data('message-id');
    $.ajax({
      type: 'GET',
      url: 'api/messages',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      var messageList = $('.message-list__items');
      var insertHTML = '';
      messages.forEach(function(message){
        var html = buildMessageHTML(message);
        insertHTML += html;
      });
      messageList.append(insertHTML);
      messageList.animate({scrollTop: messageList[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert("メッセージの自動更新に失敗しました");
    });
  }
  setInterval(reloadMessages, 5000);
});
