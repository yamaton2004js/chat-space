$(function() {
  function buildHTML(message) {
    if ( message.image ) {
      var html =
        `<div class="main-contents__box">
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
        `<div class="main-contents__box">
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
    }
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
});