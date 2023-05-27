$(document).ready(function () {
  // $("body").css({ "height": 2000 + $(window).innerHeight() });

  // title-box요소 loop애니메이션을 위해 복사
  for(i = 0; i < 3; i++) {
    $(".title-box").clone().appendTo(".title-box-wrap");
  }

  $("intro-title")
  // let ScrollTop = $(window).scrollTop();
  // let d = $(".main-title").width();
  // console.log(d)

  // $(window).on("scroll", function () {
  //   if (ScrollTop >= 100 && ScrollTop < 3652) {
  //     $(".main-title").css({ "top": 0, "height": $(window).innerHeight() });
  //     $(".main-title").css({ "left": d });
  //   }
  // });


});


