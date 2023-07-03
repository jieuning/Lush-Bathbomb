$(document).ready(function () {

  // 스크롤이 #bottom-wrap의 탑 값에 도달시 버튼 등장
  $(window).scroll(function() {
    let Scroll = $(window).scrollTop(),
        Offset = $("#bottom-wrap").offset().top;

    if(Scroll >= Offset) {
      $("#top-btn").addClass("active");
    } else {
      $("#top-btn").removeClass("active");
    } 
  });

  // 버튼 클릭시 scrollTop 0으로 이동
  $("#top-btn").click(function(e) {
    e.preventDefault();
    $("html, body").stop().animate({scrollTop: 0});
  });
});