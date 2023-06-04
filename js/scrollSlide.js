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

    let ScrollLeft = $(document).scrollLeft();

    let ddd1 = $(".item-page").eq(0).offset().left
    console.log(ddd1);
    let ddd2 = $(".item-page").eq(1).offset().left
    console.log(ddd2);
    let ddd3 = $(".item-page").eq(2).offset().left
    console.log(ddd3);
    let ddd4 = $(".item-page").eq(3).offset().left
    console.log(ddd4);
    let ddd5 = $(".item-page").eq(4).offset().left
    console.log(ddd5);
    let ddd6 = $(".item-page").eq(5).offset().left
    console.log(ddd6);
    let ddd7 = $(".item-page").eq(6).offset().left
    console.log(ddd7);

    let w_delta = e.originalEvent.wheelDelta;

    // 휠 아래로
    if (w_delta < 0 && $(this).next().length > 0) {
      if (ScrollTop >= $("#bottom-wrap").offset().top) {
        e.preventDefault(); // 기본 동작 막기
        $("#page-container").stop().animate({ "left": -array[$(this).index() + 1] }, 1000);
        $(".item").css({ "background": colors[$(this).index() + 1] });

        for (let i = 0; i < itemPage; i++) {
          if ($(".item").css({ "background": colors[$(this).index() + 1] }) === true) {
            $(".info-text-area").eq(i).css({ "left": 0, "opacity": 1 });
            $(".item1").eq(i).css({ "left": "200px", "opacity": 1 });
            $(".item-bg1").eq(i).css({ "left": "-20px", "opacity": 1 });
          } 
          else {
            $(".info-text-area").eq(i).css({ "left": "-100px", "opacity": 0 });
            $(".item1").eq(i).css({ "left": "600px", "opacity": 0 });
            $(".item-bg1").eq(i).css({ "left": "200px", "opacity": 0 });

          }
        }
      }
    }

    // 휠 위로
    else if (w_delta > 0 && $(this).prev().length > 0) {
      e.preventDefault();
      $("#page-container").stop().animate({ "left": -array[$(this).index() - 1] }, 1000);
      $(".item").css({ "background": colors[$(this).index() - 1] });

      // for (let i = 0; i < itemPage; i++) {
      //   if ($(".item-page").eq(i).offset().left <= 0 && $(".item-page").eq(i).offset().left >= -1920) {
      //       $(".info-text-area").eq(i).css({ "left": "-100px", "opacity": 0 });
      //       $(".item1").eq(i).css({ "left": "600px", "opacity": 0 });
      //       $(".item-bg1").eq(i).css({ "left": "200px", "opacity": 0 });
      //   } 
      // }
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