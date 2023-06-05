$(document).ready(function () {

  // .title-box요소 loop애니메이션을 위해 복사
  for (i = 0; i < 3; i++) {
    $(".title-box").clone().appendTo(".title-box-wrap");
  }


  // ---------- 요소의 높이값 ----------

  // #horizontal-wrap 스크롤 총 높이값
  let horizontal = $("#horizontal-wrap").prop('scrollHeight');
  console.log(horizontal)

  // #colunm-wrap 스크롤 총 높이값
  let colunm = $("#colunm-wrap").prop('scrollHeight');
  console.log(colunm)

  // #bottom-wrap 스크롤 총 높이값
  let bottom = $("#bottom-wrap").prop('scrollHeight');
  console.log(bottom)

  // #footer-wrap 스크롤 총 높이값
  let footer = $("#footer-wrap").prop('scrollHeight');
  console.log(footer)

  // #item-page의 개수
  let itemPage = $(".item-page").length;
  console.log(itemPage);

  // 컨테이너 총 넓이
  let containerWidth = $(window).outerWidth() * itemPage;
  console.log(containerWidth)

  // #page-container에 총 넓이값 지정
  $("#bottom-wrap").css({ "width": containerWidth });
  $(".item").css({ "width": containerWidth });

  // horizontal colunm의 스크롤 높이 합
  let Height = horizontal + colunm;
  console.log(Height)

  // horizontal colunm의 스크롤 높이 합
  let Height2 = horizontal + colunm + bottom;
  console.log(Height2)

  // 전체 총 스크롤 높이값
  let totalHeight = horizontal + colunm + bottom + footer;
  console.log(totalHeight)

  // 총 스크롤 높이값을 바디의 높이값으로 지정
  $("body").css({ "height": Height2 + $(window).innerHeight() });


  // ---------- 요소에 top값 지정 ----------

  // top값 지정(최상단에 붙지 않기 위해)
  $("#colunm-wrap").css({ "top": horizontal });

  // top값 지정
  $("#bottom-wrap").css({ "top": Height });

  $("#footer-wrap").css({ "top": Height2 });


  // ---------- 스크롤 함수 ----------

  let scrollAni = () => {

    // 실시간 스크롤 top의 위치값
    let ScrollTop = $(document).scrollTop();
    console.log(ScrollTop)

    if (ScrollTop < horizontal) {

      // 스크롤업시 최상단에 고정
      $("#horizontal-wrap").css({ "top": 0 });

      // 스크롤업시 #horizontal-wrap 하단에 고정
      $("#colunm-wrap").css({ "top": horizontal });

      // 메인 블렌딩 텍스트 애니메이션
      // 스크롤업시 탑값이 1이 되도록 지정
      $(".title1").stop().animate({ "opacity": - (ScrollTop - 1) }, 2500);

      // 2000을 뺀 지점부터 서서히 스크롤하면 사라지도록 지정
      $(".title2").stop().animate({ "opacity": (ScrollTop - 2000) * 0.001 }, 800);
    }

    // 요소의 위치 탑값 지정 => 현재 브라우저 높이 - (실시간 스크롤 탑값 - 이전 요소의 높이값)
    if (ScrollTop >= horizontal) {
      $("#horizontal-wrap").css({ "top": 0 - (ScrollTop - horizontal) });
      $("#colunm-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - horizontal) });
      $("#bottom-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - (horizontal + colunm)) });
      $("#footer-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - (horizontal + colunm + bottom)) });
    }

    // intro section 상단 이미지, 텍스트 애니메이션
    if (ScrollTop >= $("#colunm-wrap").offset().top - 80) {

      // 이미지 투명도, 스케일 값 
      $(".intro-img").addClass("active");

      // 이미지 애니메이션(선 실행)
      $(".img-effect-wrap").animate({ "width": "100%" }, 800, "easeInCubic", () => {
        // 텍스트 애니메이션(후 실행)
        $(".sub-title").animate({ "left": 642, "opacity": 1 }, 1000, "easeOutCubic");
        $(".text-box").animate({ "left": 0, "opacity": 1 }, 1000, "easeOutCubic");
      });
    }

    // intro section 겹친 중간 이미지 애니메이션
    if (ScrollTop >= $("#colunm-wrap").offset().top + 354) {
      $(".intro-img2").addClass("active");
      // 이미지 애니메이션
      $(".img-effect-wrap2").animate({ "width": "100%" }, 500, "easeInCubic", () => {
        $(".intro-img3").addClass("active");
      });
    }

    // intro section 최하단 이미지 애니메이션

    if (ScrollTop >= $("#colunm-wrap").offset().top + 1186) {
      // 이미지 애니메이션
      $(".intro-img4").addClass("active");
      // 텍스트 애니메이션
      $(".bottom-title").animate({ "top": 22, "opacity": 1 }, 1500, "easeOutCubic");
    }

    // item section 배경 컬러 애니메이션
    if (ScrollTop >= $("#bottom-wrap").offset().top) {

      if (ScrollTop >= Height && ScrollTop <= Height2) {
        $("#bottom-wrap").css({ "top": 0, "height": $(window).innerHeight() });
      }

      $(".item").css({ "background": "#A2D9D9" });
      $(".info-text-area").css({ "left": 0, "opacity": 1 });
      $(".item1").css({ "left": "200px", "opacity": 1 });
      $(".item-bg1").css({ "left": "-20px", "opacity": 1 });
    } else {
      $(".item").css({ "background": "#050505" });
      $(".info-text-area").css({ "left": "-100px", "opacity": 0 });
      $(".item1").css({ "left": "600px", "opacity": 0 });
      $(".item-bg1").css({ "left": "200px", "opacity": 0 });
    }

    if (ScrollTop >= Height2) {
      $("body").css({ "height": totalHeight + $(window).innerHeight() }); // 총 스크롤 높이값 재설정
      $("#footer-wrap").css({ "top": $(window).innerHeight() });
    } else {
      $("body").css({ "height": Height2 + $(window).innerHeight() });
    }
  };


  // 이벤트 실행
  $(window).on("scroll", scrollAni);

});


