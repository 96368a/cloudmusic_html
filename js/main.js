
var menu,songlist;
$(function(){
    let userid=607728498;
    // $.pjax({url:"menu.html",container:".menu"})
    $(".menu").load("menu.html");
    $("#content").load("song_list.html");
    menu=load_menu(userid);
    songlist=load_songlist(942008918);
});