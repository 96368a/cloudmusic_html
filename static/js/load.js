async function load_menu(userid) {//加载个人歌单
    var data = await get_user_playlist(userid)
    //设置用户名、头像
    $(".username").html(data.playlist[0].creator.nickname)
    $(".avatar img").attr('src', data.playlist[0].creator.avatarUrl)
    data.playlist.forEach(e => {
        let menu_list = $("<li><a href=javascript:; >" +
            "<svg class=\"icon svg-icon\" aria-hidden=\"true\">"
            + "<use xlink:href=\"#icon-songlist\"></use></svg>"
            + e.name + "</a></li>");
        menu_list.attr("data-id", e.id)
        if (e.userId == userid)//用户创建
            $("#favorite_list").before(menu_list)
        else//用户收藏
            $(".menu ul").append(menu_list)
    });
    $(".menu li[data-id]").on('click', function () {//歌单点击监听
        load_songlist($(this).attr("data-id")).then(e => {
            songlist = e;
            play_songlist()
        })
        $(this).siblings("li").children("a").removeClass("song_lost-focus")
        $(this).children("a").addClass("song_lost-focus")
    })
    return new Promise((resolve, rejects) => {
        resolve(data);
    })
}

async function load_songlist(id) {//歌单详情
    $("#content>div").hide().eq(0).show(0);
    data = await get_playlist_detail(id);
    // console.log(data)
    //设置歌单名
    $("#songlist_info h2").html(data.playlist.name)
    //设置歌单缩略图
    $("#list_img img").attr("src", data.playlist.coverImgUrl).attr("alt", data.playlist.name)
    //设置作者
    $(".avatar_1 span").html(data.playlist.creator.nickname).siblings("img").attr("src", data.playlist.creator.avatarUrl)
    //设置创建时间
    create_time = new Date(data.playlist.createTime)
    $(".create_time").html(create_time.getFullYear() + "年" + create_time.getMonth() + "月 创建")
    //简介
    if (data.playlist.description != null) {
        $("#introduction").html("简介: " + data.playlist.description).show()
    } else {
        $("#introduction").hide()
    }
    //添加歌曲
    $("#songlist_each_info li:not(li:nth-child(1))").each(function () {
        $(this).fadeOut().remove();
    })
    data.playlist.tracks.forEach(e => {
        list = $("<li><span>" +
            "<svg class=\"icon svg-icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-xihuan\"></use></svg>"
            + "<svg class=\"icon svg-icon\" aria-hidden=\"true\"><use xlink:href=\"#icon-xiazai\"></use></svg>"
            + "</span><span>" + e.name
            + "</span><span>" + e.ar[0].name + "</span><span>"
            + e.al.name + "</span><span>"
            + format_time(e.dt)
            + "</span></li>")
        list.attr("data-id", e.id)
        $("#songlist_each_info ul").append(list)
    })
    //歌曲点击监听
    $("#songlist_each_info li[data-id]").on('dblclick', function () {
        // load_song($(this).attr("data-id"))
        if (player_list.now_id != songlist.playlist.id)
            play_songlist()
        player_list.now = $(this).index() - 1
        player.player.play();
    })

    //歌单收藏、分享、播放
    var info1 = await get_playlist_detail_dynamic(id)
    // console.log(info)
    $("#favorite").html("收藏(" + format_num(info.bookedCount) + ")")
    $("#share_list").html("分享(" + format_num(info.shareCount) + ")")
    $("#songlist_statistics_info").html("歌曲:" + data.playlist.trackIds.length + "  播放:" + format_num(info.playCount))
    return new Promise((resolve, rejects) => {
        resolve(data)
    })
}
async function load_song(id) {
    data = await get_song_url(id)
    player.src = data.data[0].url
    player.player.play();
    $("#player_play use").attr("xlink:href", "#icon-zanting")
}

async function play_songlist() {//播放列表更新
    ids = []
    order = []
    for (i = 0; i < songlist.playlist.trackIds.length; i++) {
        ids.push(songlist.playlist.trackIds[i].id);
    }
    data_url = await get_song_url(ids);
    for (i = 0; i < songlist.playlist.tracks.length; i++) {
        song = new Object()
        song.id = songlist.playlist.tracks[i].id//歌曲id
        song.name = songlist.playlist.tracks[i].name//歌曲名字
        song.time = songlist.playlist.tracks[i].dt//歌曲时间
        song.al_picurl = songlist.playlist.tracks[i].al.picUrl//专辑图片
        song.al_name = songlist.playlist.tracks[i].al.name//专辑名字
        song.author = ""
        songlist.playlist.tracks[i].ar.forEach(d => {
            song.author += d.name + "/";
        })
        // song.author=song.author.replace("/",'')
        player_list.songlist[song.id] = song
        order.push(song.id)
    }
    data_url.data.forEach(d => {
        player_list.songlist[d.id].url = d.url
    })
    player_list.order = order
    player_list.now_id = songlist.playlist.id
}

async function play_song_start(now) {
    play_songlist.now = now
}

function Dialog(msg) {//提示信息
    $("#dialog").html(msg)
    $("#dialog").stop().fadeIn(800)
    $("#dialog").css("top", $("#player").offset().top - 60)
    setTimeout(() => {
        $("#dialog").stop().fadeOut(2000)
    }, 1500)
}
