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
      if(data.content !== "") {
        var html = buildContentHTML(data);
        $('.chat-main__body--message-list').append(html)
        $('.message_form').val('')
      }
      if(data.image_url !== null) {
        var html = buildImageHTML(data);
        $('.chat-main__body--message-list').append(html)
        $('.message_image-file').val(null)
      }
      $('.chat-main__body').animate( {
        scrollTop: $('.chat-main__body--message-list').outerHeight(true)}, 'fast');
      $('.submit').prop('disabled', false);
    })
    .fail(function() {
      alert('error');
      $('.submit').prop('disabled', false);
    });
  });
});
