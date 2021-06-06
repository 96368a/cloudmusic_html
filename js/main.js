
var menu,songlist;
$(function(){
    let userid=607728498;
    // $.pjax({url:"menu.html",container:".menu"})
    $(".menu").load("menu.html");
    $("#content").load("song_list.html");
    menu=load_menu(userid);
    songlist=load_songlist(6617041635);
});

/* function a(){
    data = $.getJSON("https://163.233c.cn/playlist/detail?id=942008918",function(data){
        ids=[]
        for(i=0;i<data.playlist.trackIds.length;i++){
            ids.push(data.playlist.trackIds[i].id);
        }
        var tt = b(ids)
        console.log(tt)
    })
}
function b(ids){
    return $.getJSON("https://163.233c.cn/song/detail?ids="+ids.toString());
} */