$(function() {
  $('#new_message').submit(function(e) {
    e.preventDefault();
    console.log(this)
    var formData = new FormData(this);
  })
})
