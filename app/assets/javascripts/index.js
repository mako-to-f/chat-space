$(function() {

  var preInput;
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").keyup(function() {
    var input = $("#user-search-field").val();

    $.ajax( {
      type:     'GET',
      url:      '/users',
      data:     { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      if (input.length === 0) {
        $(".chat-group-user").remove();
      }
      if (input != preInput && input.length !== 0) {
        $(".chat-group-user").remove();
        if (users.length) {
          users.forEach(function(user) {
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーサーはいません")
        }
      }
      preInput = input;
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
});
