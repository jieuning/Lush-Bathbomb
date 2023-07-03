$(document).ready(function () {

  //팝업창 보여주기
  $("#modal-bg").delay(500).animate({ "opacity": 1 }, 100, "easeOutCubic");

  function close() {
    $("#modal-bg").hide();
  }

  // 이벤트 호출
  $(".close").on("click", close);

});