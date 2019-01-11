$(function() {
  $("#user-search-field").keyup(function() {
    var input = $("#user-search-field").val();

    $.ajax( {
      type:     'GET',
      url:      '/users',
      data:     { keyword: input },
      dataType: 'json'
    })
  });
});
