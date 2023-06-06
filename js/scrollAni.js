$(document).ready(function () {

  // .title-box요소 loop애니메이션을 위해 복사
  for (i = 0; i < 3; i++) {
    $(".title-box").clone().appendTo(".title-box-wrap");
  }

  // 요소의 높이값, 높이값 지정
  let main = $("#main-wrap").prop('scrollHeight');
  let topw = $("#top-wrap").prop('scrollHeight');
  let horizontal = $("#horizontal-wrap").prop('scrollHeight');

  // 스크롤 높이 합
  let Height = main + topw;
  let Height2 = main + topw + horizontal;

  // 총 스크롤 높이값을 바디의 높이값으로 지정
  $("body").css({ "height": Height2 + $(window).innerHeight() });

  // top값 지정(최상단에 붙지 않기 위해)
  $("#top-wrap").css({ "top": main });
  $("#horizontal-wrap").css({ "top": Height });
  $("#bottom-wrap").css({ "top": Height2 });


  // ---------- 스크롤 함수 ----------

  let scrollAni = () => {

    let ScrollTop = $(document).scrollTop();

    // ---------- 세로 스크롤 ---------- 

    if (ScrollTop < main) {

      // 스크롤업시 최상단에 고정
      $("#main-wrap").css({ "top": 0 });

      // 스크롤업시 #main-wrap 하단에 고정
      $("#top-wrap").css({ "top": main });

      // 메인 블렌딩 텍스트 애니메이션
      // 스크롤업시 탑값이 1이 되도록 지정
      $(".title1").stop().animate({ "opacity": - (ScrollTop - 1) }, 2500);

      // 2000을 뺀 지점부터 서서히 스크롤하면 사라지도록 지정
      $(".title2").stop().animate({ "opacity": (ScrollTop - 2000) * 0.001 }, 800);
    }

    // 요소의 위치 탑값 지정 => 현재 브라우저 높이 - (실시간 스크롤 탑값 - 이전 요소의 높이값)
    if (ScrollTop >= main) {
      $("#main-wrap").css({ "top": 0 - (ScrollTop - main) });
      $("#top-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - main) });
      $("#horizontal-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - Height) });
    }

    // intro section 상단 이미지, 텍스트 애니메이션
    if (ScrollTop >= $("#top-wrap").offset().top - 80) {

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
    if (ScrollTop >= $("#top-wrap").offset().top + 354) {
      $(".intro-img2").addClass("active");
      // 이미지 애니메이션
      $(".img-effect-wrap2").animate({ "width": "100%" }, 500, "easeInCubic", () => {
        $(".intro-img3").addClass("active");
      });
    }

    // intro section 최하단 이미지 애니메이션
    if (ScrollTop >= $("#top-wrap").offset().top + 1186) {
      $(".intro-img4").addClass("active"); // 이미지 애니메이션
      $(".bottom-title").animate({ "top": 22, "opacity": 1 }, 1500, "easeOutCubic"); // 텍스트 애니메이션
    }


    // ---------- 가로 휠 스크롤 도입 설정 ---------- 

    if (ScrollTop >= $("#horizontal-wrap").offset().top) {

      if (ScrollTop >= Height && ScrollTop <= Height2) {
        // 스크롤 탑에 붙을 수 있게 조정
        $("#horizontal-wrap").css({ "top": 0, "height": $(window).innerHeight() });
      }

      // 도입 애니메이션 스크롤 다운
      $(".item").css({ "background": "#A2D9D9" }); // 배경 색상
      $(".info-text-area").css({ "left": 0, "opacity": 1 }); // 텍스트
      // 이미지
      $(".item1").css({ "left": "200px", "opacity": 1 });
      $(".item-bg1").css({ "left": "-20px", "opacity": 1 });
    }
    
    else {
      // 도입 애니메이션 스크롤 업
      $(".item").css({ "background": "#050505" });
      $(".info-text-area").css({ "left": "-100px", "opacity": 0 });
      $(".item1").css({ "left": "600px", "opacity": 0 });
      $(".item-bg1").css({ "left": "200px", "opacity": 0 });
    }


    // ---------- 다시 세로 스크롤(푸터) ----------

    if (ScrollTop >= Height2) {
      // 푸터 탑값
      $("#bottom-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - (Height2)) });
    } 
    
    else {
      // 이전 높이값으로
      $("body").css({ "height": Height2 + $(window).innerHeight() }); 
    }

  };


  // 이벤트 실행
  $(window).on("scroll", scrollAni);

});


