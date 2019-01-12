$(function() {

  var preInput;
  var search_list = $("#user-search-result");
  var member_list = $('#chat-group-users')

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

  function appendMember(userId, userName) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
                  <input name="group[user_ids][]" type="hidden" value="${ userId }">
                  <p class="chat-group-user__name">${ userName }</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    member_list.append(html);
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

  $('.chat-group-form__field--right').on('click', '.user-search-add', function() {
    var eventTaget = event.target
    var eventParent = eventTaget.parentNode
    eventParent.remove();
    var userId = eventTaget.getAttribute('data-user-id');
    var userName = eventTaget.getAttribute('data-user-name');
    appendMember(userId, userName);
  })

  $('.chat-group-form__field--right').on('click', '.user-search-remove', function() {
    var eventTaget = event.target
    var eventParent = eventTaget.parentNode
    eventParent.remove();
  })
});
