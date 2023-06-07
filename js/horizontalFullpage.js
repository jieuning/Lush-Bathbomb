$(document).ready(function () {

  // #item-page의 개수
  let itemPage = $(".item-page").length;

  // 요소의 스크롤 높이값
  let main = $("#main-wrap").prop('scrollHeight');
  let topw = $("#top-wrap").prop('scrollHeight');
  let horizontal = $("#horizontal-wrap").prop('scrollHeight');
  let bottom = $("#bottom-wrap").prop('scrollHeight');

  // 전체 총 스크롤 높이값
  let totalHeight = main + topw + horizontal + bottom;

  // 페이지 가로로 정렬
  for (let i = 0; i < itemPage; i++) {
    $("#page-container").children().eq(i).css({ "left": i * 100 + "%" });
  }

  // 페이지의 x축 위치값 배열
  let array = [];
  for (let i = 0; i < itemPage; i++) {
    array[i] = $(".item-page").eq(i).offset().left;
  }

  // 배경 색상 배열
  let colors = [
    "#A3E5E5", 
    "#EFE3BA", 
    "#EDD1B7", 
    "#EBDDCD", 
    "#EED2C9", 
    "#D1BDDB", 
    "#BABEE5"]


  // ---------- 가로 페이지 마우스 휠, 스크롤 이벤트 ----------

  $(".item-page").on("scroll mousewheel DOMMouseScroll", function (e) {

    let ScrollTop = $(document).scrollTop();
    let ScrollLeft = $("#page-container").offset().left;
    let w_delta = e.originalEvent.wheelDelta;

    // ---- 휠 아래로 ----

    if (w_delta < 0 && $(this).next().length > 0) {
      if (ScrollTop >= $("#horizontal-wrap").offset().top) {
        e.preventDefault(); // 기본 동작 막기
        $("#page-container").stop().animate({ "left": -array[$(this).index() + 1] }, 1000); // 페이지 이동
        $(".item").css({ "background": colors[$(this).index() + 1] }); // 배경 색상 변경
      }

      // 가로 풀페이지 도입시 푸터로 스크롤 되는 것 방지
      // 마지막 페이지로 이동 될때 푸터 높이 추가
      if (ScrollLeft <= -9000) {
        // 총 스크롤 높이값 재설정(footer추가)
        $("body").css({ "height": totalHeight + $(window).innerHeight() }); 
      }
    }

    // ---- 휠 위로 ----
    
    else if (w_delta > 0 && $(this).prev().length > 0) {
      if (ScrollTop <= $("#horizontal-wrap").offset().top) {
        e.preventDefault();
        $("#page-container").stop().animate({ "left": -array[$(this).index() - 1] }, 1000);
        $(".item").css({ "background": colors[$(this).index() - 1] });
      }
    }
  });

  //브라우저를 resize했을시 박스의 크기 재조정
  $(window).resize(function () {
    for (let i = 0; i < $('.item-page').length; i++) {
      array[i] = $('.item-page').eq(i).offset().left
    }
  });
});