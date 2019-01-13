$(function() {
  function buildContentHTML(message) {
    var html = `<div class="chat-main__message">
                  <div class="chat-main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    ${message.content}
                  </div>
                </div>`
    return html;
  }
  function buildImageHTML(message) {
    var html = `<div class="chat-main__message">
                  <div class="chat-main__message-name">
                    ${message.user_name}
                  </div>
                  <div class="chat-main__message-time">
                    ${message.created_at}
                  </div>
                  <div class="chat-main__message-body">
                    <img src="${message.image_url}">
                  </div>
                </div>`
    return html;
  }
  $('#new_message').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax( {
      url:         url,
      type:        "POST",
      data:        formData,
      dataType:    'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      if(data.content) {
        var html = buildContentHTML(data);
        $('.chat-main__body--message-list').append(html)
      }
      if(data.image_url) {
        var html = buildImageHTML(data);
        $('.chat-main__body--message-list').append(html)
      }
      $('#new_message')[0].reset()
      $('.chat-main__body').animate( {
        scrollTop: $('.chat-main__body--message-list').outerHeight(true)}, 'fast');
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert('error');
      $('.submit').prop('disabled', false);
    });
  });

  if(location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(function() {
      $.ajax( {
        type:     'GET',
        url:      location.href,
        dataType: 'json'
      })
      .done(function(data) {
        $('.chat-main__body--message-list').empty();
        data.forEach(function(message) {
          if(message.content) {
            var html = buildContentHTML(message);
            $('.chat-main__body--message-list').append(html)
          }
          if(message.image_url) {
            var html = buildImageHTML(message);
            $('.chat-main__body--message-list').append(html)
          }
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    }, 5000);
  }
});
