$(function(){

  var user_list = $("#user-search-result");

  var group_user_list = $('#chat-group-users')

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    user_list.append(html);
  }

  function appendGroupUser(id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    group_user_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = `<p class="chat-group-user__name">${ msg }</p>`
    user_list.append(html);
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();

    if(input.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if(users.length !== 0 && input.length !== 0){
          users.forEach(function(user){
            appendUser(user);
          })
        } else {
          appendErrMsgToHTML("一致するユーザーは見つかりませんでした");
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      })
    } else {
      $('#user-search-result').empty();
    }
  });

  $(document).on("click", ".user-search-add", function(){
    var id = $(this).data('user-id');
    var name = $(this).data('user-name');
    $(this).parent().remove();
    appendGroupUser(id, name);
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});
