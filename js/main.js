
$(function(){
    let userid=607728498;
    // $.pjax({url:"menu.html",container:".menu"})
    $(".menu").load("menu.html");
    $("#content").load("song_list.html");
    load_menu(userid);
    load_songlist(942008918);
});