$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__upper">
            <div class="message-list__upper__name">
              ${message.user_name}
            </div>
            <div class="message-list__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img src=${message.image} >
          </div>
        </div>`
      return html;
    } else {
      var html =
       `<div class="message-list" data-message-id=${message.id}>
          <div class="message-list__upper">
            <div class="message-list__upper__name">
              ${message.user_name}
            </div>
            <div class="message-list__upper__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new-message')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});