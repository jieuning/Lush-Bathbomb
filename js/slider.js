$(document).ready(function () {

  // 변수 지정
  let container = $("#slide-container"),
    slideWrap = container.find(" .slide-wrap"),
    slide = container.find(" .slide"),
    nav = container.find(" .slide-navi"),
    pager = container.find(" .pager"),
    slideCount = slide.length,
    currentIndex = 0;

  // 배경 색상 배열
  let colors = [
    "#A2D9D9",
    "#EFE3BA",
    "#EDD1B7",
    "#EBDDCD",
    "#EED2C9",
    "#D1BDDB",
    "#BABEE5"
  ]

  // slide의 개수
  let itemPage = slide.length;

  // 슬라이드 가로로 정렬
  for (let i = 0; i < itemPage; i++) {
    $(".slide-wrap").children().eq(i).css({ "left": i * 100 + "%" });
  }

  // ----- 슬라이드 이동 함수 -----
  function slider(index) {
    slideWrap.stop().animate({ left: -100 * index + "%" }, 1000, "swing");
    currentIndex = index;

    // 인텍스 값 받기
    updateNav();
    updateBg();
  }

  // ----- 슬라이드 네비게이션 버튼 활성화, 비활성화 함수 -----

  function updateNav() {
    let navPrev = nav.find(".prev");
    let navNext = nav.find(".next");

    // 슬라이드가 인덱스가 0일 때
    if (currentIndex == 0) {
      // 활성화
      navPrev.addClass("disabled");
    } else {
      // 비활성화
      navPrev.removeClass("disabled");
    }

    // 슬라이드 인덱스가 마지막일 때
    if (currentIndex == slideCount - 1) {
      navNext.addClass("disabled");
    } else {
      navNext.removeClass("disabled");
    }
  }

  // ----- 슬라이드 도입시 배경 컬러 함수 -----

  function updateBg() {
    $(window).scroll(function () {
      let ScrollTop = $(window).scrollTop();
      
      // 스크롤 탑 값이 #bottom-wrap 탑 값보다 크거나 같을 때
      if (ScrollTop >= $("#bottom-wrap").offset().top) {
        // 초기 값이 0
        if (currentIndex == 0) {
          // 인덱스가 0일때
          $(".slide-bg").css({ "background": "#A2D9D9" });
        } else {
          $(".slide-bg").css({ "background": colors[currentIndex] });
        }
      } else {
        // 스크롤 탑 값이 #bottom-wrap 탑 값보다 작을 때 
        $(".slide-bg").css({ "background": "#050505" });
      }
    });
  }

  // ----- 페이저 ----- 

  pager.find("a").click(function (e) {
    e.preventDefault();

    // 페이저 클릭시 슬라이드 이동
    let idx = $(this).index();
    slider(idx);

    // 버튼 활성화
    pager.find("a").removeClass("on");
    pager.find("a").eq(idx).addClass("on");

    // 배경 색상 변경
    $(".slide-bg").css({ "background": colors[idx] });
  });

  // ----- 네비게이션 -----

  nav.find("a").click(function (e) {
    e.preventDefault();

    // 네비게이션 클릭시 슬라이드 이동
    if ($(this).hasClass("prev")) {
      slider(currentIndex - 1)
      // 배경 색상 변경
      $(".slide-bg").css({ "background": colors[currentIndex] });
    } else {
      slider(currentIndex + 1)
      // 배경 색상 변경(next버튼)
      $(".slide-bg").css({ "background": colors[currentIndex] });
    }

    // currentIndex가 변경되면 해당 페이저 활성화
    pager.find("a").removeClass("on");
    pager.find("a").eq(currentIndex).addClass("on");

    updateNav();
  });

  //초기 값 실행
  updateNav();
  updateBg();

});