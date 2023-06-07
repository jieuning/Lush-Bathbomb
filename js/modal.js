$(document).ready(function(){

    //팝업창 보여주기
    $("#modal-bg").delay(500).animate({"opacity":"1"},100,"easeOutCubic");

    function close(){
        $("#modal-bg").hide();
    }

    $(".close").on("click", close);

});