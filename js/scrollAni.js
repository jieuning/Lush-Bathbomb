$(document).ready(function () {

  // loop애니메이션을 위해 복사
  for (i = 0; i < 3; i++) {
    $(".title-box").clone().appendTo(".title-box-wrap");
  }

  // 요소의 높이값
  let main = $("#top-wrap").prop('scrollHeight'),
    intro = $("#mid-wrap").prop('scrollHeight'),
    slide = $("#bottom-wrap").prop('scrollHeight');

  // 스크롤 높이 합
  let Height = main + intro,
    totalHeight = main + intro + slide;

  // 총 스크롤 높이값을 바디의 높이값으로 지정
  $("body").css({ "height": totalHeight + $(window).innerHeight() });

  // 메인을 제외한 요소의 top값 지정(높이 값 지정)
  $("#mid-wrap").css({ "top": main });
  $("#bottom-wrap").css({ "top": Height });


  // ---------- 스크롤 함수 ----------

  let scrollAni = () => {

    let ScrollTop = $(document).scrollTop();

    // ----- 메인 스크롤, 애니메이션 ----- 

    if (ScrollTop < main) {
      // 최상단에 고정
      $("#top-wrap").css({ "top": 0 });

      // #top-wrap 하단에 고정
      $("#mid-wrap").css({ "top": main });

      // 메인 블렌딩 텍스트 애니메이션
      // 스크롤업시 탑값이 1이 되도록 지정
      $(".title1").stop().animate({ "opacity": - (ScrollTop - 1) }, 2500);

      // 2000을 뺀 지점부터 서서히 스크롤하면 사라지도록 지정
      $(".title2").stop().animate({ "opacity": (ScrollTop - 2000) * 0.001 }, 800);
    }

    // 요소의 스크롤 탑값 지정 => 현재 브라우저 높이 - (실시간 스크롤 탑값 - 이전 요소의 높이값)
    if (ScrollTop >= main) {
      $("#top-wrap").css({ "top": 0 - (ScrollTop - main) });
      $("#mid-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - main) });
      $("#bottom-wrap").css({ "top": $(window).innerHeight() - (ScrollTop - (Height + 16)) });
    }

    // ----- 인트로 영역 상단 이미지, 텍스트 애니메이션 -----

    if (ScrollTop >= $("#mid-wrap").offset().top - 80) {
      // 이미지 투명도, 스케일 값
      $(".intro-img").addClass("active");

      // 이미지 애니메이션(선 실행)
      $(".img-effect-wrap").animate({ "width": "100%" }, 800, "easeInCubic", function () {
        // 텍스트 애니메이션(후 실행)
        $(".sub-title").animate({ "left": 642, "opacity": 1 }, 1000, "easeOutCubic");
        $(".text-box").animate({ "left": 0, "opacity": 1 }, 1000, "easeOutCubic");
      });
    }

    // ----- 인트로 영역 겹친 중간 이미지 애니메이션 -----

    if (ScrollTop >= $("#mid-wrap").offset().top + 354) {
      $(".intro-img2").addClass("active");
      $(".img-effect-wrap2").animate({ "width": "100%" }, 500, "easeInCubic", function () {
        $(".intro-img3").addClass("active");
      });
    }

    // ----- 인트로 영역 최하단 이미지 애니메이션 -----

    if (ScrollTop >= $("#mid-wrap").offset().top + 1186) {
      // 이미지
      $(".intro-img4").addClass("active"); 
      // 텍스트
      $(".bottom-img-title").animate({ "top": -20, "opacity": 1 }, 1500, "easeOutCubic"); 
    }


    // ----- 슬라이드 도입 애니메이션 -----

    if (ScrollTop >= $("#bottom-wrap").offset().top) {

      // 스크롤 다운
      $(".info-text-area").css({ "left": 0, "opacity": 1 });

      // 이미지
      $(".item-img").css({ "left": "200px", "opacity": 1 });
      $(".item-bg").css({ "left": "-20px", "opacity": 1 });
    } else {
      // 스크롤 업
      $(".info-text-area").css({ "left": "-100px", "opacity": 0 });

      // 이미지
      $(".item-img").css({ "left": "600px", "opacity": 0 });
      $(".item-bg").css({ "left": "200px", "opacity": 0 });
    }
  };

  // 이벤트 실행
  $(window).on("scroll", scrollAni);

});


