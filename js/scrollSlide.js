$(document).ready(function () {

  // #item-page의 개수
  let itemPage = $(".item-page").length;
  console.log(itemPage);

  let scrollPageSlide = () => {

    // 가로로 정렬
    for (let i = 0; i < itemPage; i++) {
      $("#page-container").children().eq(i).css({ "left": i * 100 + "%" });
    }

    // 컨테이너 총 넓이
    let containerWidth = $(window).outerWidth() * itemPage;
    console.log(containerWidth)

    // #page-container에 총 넓이값 지정
    $("#bottom-wrap").css({ "width": containerWidth });

    // 컨테이너의 전체 넓이 / 7(총 페이지 수) = 페이지의 넓이값
    $(".item-page").css({ "width": containerWidth / itemPage });
  }

  scrollPageSlide();


  // 현재 페이지의 x축 위치값 배열
  let array = [];
  for (let i = 0; i < itemPage; i++) {
    array[i] = $(".item-page").eq(i).offset().left;
  }

  console.log(array)

  let array2 = [];
  for (let i = 0; i < itemPage; i++) {
    array2[i] = $(".item-page").eq(i).offset().top;
  }

  console.log(array2)



  // 배경 색상 배열
  let colors = ["#A2D9D9", "#EFE3BA", "#EDD1B7", "#EBDDCD", "#EED2C9", "#D1BDDB", "#BABEE5"]

  // 마우스 휠, 스크롤 이벤트
  $(".item-page").on("scroll mousewheel DOMMouseScroll", function (e) {
    let ScrollTop = $(document).scrollTop();

    let ScrollLeft = $(document).scrollLeft() + innerWidth;
    console.log(ScrollLeft);


    let w_delta = e.originalEvent.wheelDelta;

    // 휠 아래로
    if (w_delta < 0 && $(this).next().length < 7) {
      if (ScrollTop >= $("#bottom-wrap").offset().top) {
        e.preventDefault(); // 기본 동작 막기
        $("#page-container").stop().animate({ "left": -array[$(this).index() + 1] }, 1000);
        $(".item").css({ "background": colors[$(this).index() + 1] });
      }
    }

    // 휠 위로
    else if (w_delta > 0 && $(this).prev().length > 0) {
      e.preventDefault();
      $("#page-container").stop().animate({ "left": -array[$(this).index() - 1] }, 1000);
      $(".item").css({ "background": colors[$(this).index() - 1] });
    }
  });

  //브라우저를 resize했을시 박스의 크기 재조정
  $(window).resize(function () {
    for (let i = 0; i < $('.item-page').length; i++) {
      array[i] = $('.item-page').eq(i).offset().left
    }

    scrollPageSlide();
  });
});