$(function() {
  function buildHTML(message) {
    if(message.image_url){
      var insertImage = `<img src="${message.image_url}">`
    }
    else {
      var insertImage = ''
    }
    var html = `
      <div class="chat-main__message" data-message-id="${message.id}">
        <div class="chat-main__message-name">
          ${message.user_name}
        </div>
        <div class="chat-main__message-time">
          ${message.created_at}
        </div>
        <div class="chat-main__message-body">
          ${message.content} ${insertImage}
        </div>
      </div>`
    return html;
  }

  $('#new_message').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax( {
      url:         url,
      type:        "POST",
      data:        formData,
      dataType:    'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__body--message-list').append(html);
      $('#new_message')[0].reset();
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
    var lastMessageId = $('.chat-main__message:last').data('message-id');
    setInterval(function() {
      $.ajax( {
        type:     'GET',
        url:      location.href,
        data:     { last_message_id: lastMessageId },
        dataType: 'json'
      })
      .done(function(data) {
        var lastMessageId = $('.chat-main__message:last').data('message-id');
        var html = '';
        data.forEach(function(message) {
          if(message.id > lastMessageId) {
            html += buildHTML(message);
          }
          $('.chat-main__body--message-list').append(html);
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    }, 5000);
  }
});
