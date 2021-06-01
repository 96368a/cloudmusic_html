function load_menu(userid) {//加载个人歌单
    _url="https://163.233c.cn/user/playlist?uid=";
    var menu = $.getJSON(_url + userid, function (menu) {
        menu.playlist.forEach(e => {
            let menu_list = $("<li><a href=javascript:; class=\"menu_song\">" + e.name + "</a></li>");
            if (e.userId == userid)
                $("#favorite_list").before(menu_list)
            else
                $(".menu ul").append(menu_list)
        });
    });
}

function load_songlist(id){
    _url = "https://163.233c.cn/playlist/detail?id=";
    $.getJSON(_url+id,function(list){
        console.log(list)
    })
}

function load_songdetail(id){
    _url= "http://music.163.com/song/detail?id="
}