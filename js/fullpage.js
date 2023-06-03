$(document).ready(function () {
    let total_page = 0; //전체 원페이지 수
    let current_idx = 0;
    let screen_w = 0; // 화면 높이
    let page_w = 0;
    let last_x = 0; // 스크롤 마지막 하단 높이
    let onpage_on = true;
    let Scroll = false;

    for (let i = 0; i < $(".item-page").length; i++) {
        $("#page-container").children().eq(i).css({ "left": i * 100 + "%" });
      }

    let setWidth = () => {
        screen_w = $(window).innerWidth();
        console.log(screen_w)
        page_w = screen_w;
        $("#page-container .item-page").width(page_w);

        console.log(page_w)
    };

    setWidth();

    let init = () => {
        setWidth();
        total_page = $(".item-page").length;
        console.log(total_page)

        last_x = page_w * total_page;
        console.log(last_x)

        let dd = $(".item-page").scrollTop();
        console.log(dd)
    }

    init();

    $(".item-page").on("scroll touchmove mousewheel DOMMouseScroll", (e) => {
        if (last_x > $(this).scrollTop() && !onpage_on) {

            //원페이지 스크롤 진입
            console.log(":: 원페이지 시작 ::");
            onpage_on = true;
            Scroll = false;
        }

        if (!onpage_on) return;

        //스크롤 이벤트 막기
        e.preventDefault();
        e.stopPropagation();
        if (Scroll) return; // 현재 스크롤이 동작중이면 종료

        Scroll = true;
        let direction = e.originalEvent.wheelDelta; //마우스 휠 방향
        let x = 0;

        if (direction > 0) {
            // up
            current_idx--;
            if (current_idx < 0) { current_idx = -1; }
            x = current_idx * page_w;
        }
        else {
            // down
            current_idx++;
            if (current_idx > total_section) {
                current_idx = total_section;
                onpage_on = false;
                return;
            }

            x = current_idx * page_w;
            console.log(x)
        }

        $('.item-page').animate({ scrollTop: x }, 500, function () { Scroll = false; });
    })


});