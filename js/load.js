async function load_menu(userid) {//加载个人歌单
    data = await get_user_playlist(userid)
    data.playlist.forEach(e => {
        let menu_list = $("<li><a href=javascript:; class=\"menu_song\">" + e.name + "</a></li>");
        if (e.userId == userid)//用户创建
            $("#favorite_list").before(menu_list)
        else//用户收藏
            $(".menu ul").append(menu_list)
    });
}

async function load_songlist(id) {//歌单详情
    data = await get_playlist_detail(id);
    console.log(data)
    data.playlist.tracks.forEach(e=>{
        list=$("<li><span>❤</span><span>"+e.name+"</span><span>"+e.ar[0].name+"</span><span>"+e.al.name+"</span><span>04:48</span></li>")
        $("#songlist_each_info ul").append(list)
    })
}

