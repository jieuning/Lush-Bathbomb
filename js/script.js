$(document).ready(function () {

  // .title-box요소 loop애니메이션을 위해 복사
  for (i = 0; i < 3; i++) {
    $(".title-box").clone().appendTo(".title-box-wrap");
  }


  // ---------- 요소의 높이값 ----------

  // #horizontal-wrap 스크롤 총 높이값
  const horizontal = $("#horizontal-wrap").prop('scrollHeight');
  console.log(horizontal)

  // #colunm-wrap 스크롤 총 높이값
  const colunm = $("#colunm-wrap").prop('scrollHeight');
  console.log(colunm)

  // #bottom-wrap 스크롤 총 높이값
  const bottom = $("#bottom-wrap").prop('scrollHeight');
  console.log(bottom)

  const bossttom = $("#colunm-wrap").offset().top;
  console.log(bossttom)

  // horizontal colunm의 스크롤 높이 합
  const Height = horizontal + colunm;
  console.log(Height)

  // 전체 총 스크롤 높이값
  const totalHeight = horizontal + colunm + bottom;
  console.log(totalHeight)

  // 총 스크롤 높이값을 바디의 높이값으로 지정
  $("body").css({ "height": totalHeight + $(window).innerHeight() });


  // ---------- 요소에 top값 지정 ----------

  // top값 지정(최상단에 붙지 않기 위해)
  $("#colunm-wrap").css({ "top": horizontal });

  // top값 지정
  $("#bottom-wrap").css({ "top": Height });


  // ---------- 스크롤 함수 ----------

  let scrollAni = () => {

    // 실시간 스크롤 top의 위치값
    let ScrollTop = $(document).scrollTop();
    console.log(ScrollTop);

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
    }

    // 이미지, 텍스트 애니메이션
    if (ScrollTop >= $("#colunm-wrap").offset().top - 61) {

      // 이미지 투명도, 스케일 값 
      $(".intro-img").addClass("active");

      // 이미지 애니메이션(선 실행)
      $(".img-hidden-box").animate({ "width": "100%" }, 500, "easeInCirc", () => {

        // 텍스트 애니메이션(후 실행)
        $(".sub-title").animate({ "left": 642, "opacity": 1 }, 1000, "easeOutCirc");
        $(".text-box").animate({ "opacity": 1 }, 1000, "easeOutExpo");
      });
    }

    if (ScrollTop >= $("#colunm-wrap").offset().top - 395) {
      $(".intro-img2").animate({"width": "100%"}, 500, "easeInCirc");
    }

  };

  // 이벤트 실행
  $(window).on("scroll", scrollAni);

});


