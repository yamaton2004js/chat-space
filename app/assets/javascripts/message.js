$(function() {
  function buildHTML(message) {
    if ( message.image ) {
      var html =
        `<div class="main-contents__box" data-message-id=${message.id}>
          <div class="main-contents__box__name">
            ${message.user_name}
              <div class="main-contents__box__name--created_at">
                ${message.created_at}
              </div>
          </div>
          <div class="main-contents__box__text">
            <p class="main-contents__box__text--memo">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="main-contents__box" data-message-id=${message.id}>
          <div class="main-contents__box__name">
            ${message.user_name}
              <div class="main-contents__box__name--created_at">
                ${message.created_at}
              </div>
          </div>
          <div class="main-contents__box__text">
            <p class="main-contents__box__text--memo">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e) {
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
    .done(function(data) {
      var html = buildHTML(data);
      $('.main-contents').append(html);
      $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
      $('form')[0].reset();
    })
  });
  var reloadMessages = function() {
    var last_message_id = $('.main-contents__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-contents').append(insertHTML);
        $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});