
var menu,songlist;
var player
$(function(){
    let userid=607728498;
    // $.pjax({url:"menu.html",container:".menu"})
    $(".menu").load("menu.html");
    $("#content").load("song_list.html");
    $("#player").load("player.html");
    load_menu(userid).then(e=>{
        menu=e;
    });
    load_songlist(6617041635).then(e=>{
        songlist=e;
    });
    setTimeout(function(){
        player=$("#playerr")[0]
        $("#playerr")[0].src="http://m8.music.126.net/20210607213231/235059e7de4ef8abd8aa04b2a8e6b990/ymusic/04c3/30f5/9f03/f2160f0315f611d729dfc034a1d0e813.mp3";
    },2000)
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