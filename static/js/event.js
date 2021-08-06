/*
 * @LastEditors: Logs404
 * @Description: 用于绑定各种事件
 */

function initBindEvents() {

    //未实现功能的按钮的提示
    $(".menu li:not(li[data-id])").on('click', () => { Dialog("暂未实现") })
    //播放器事件
    bindPlayer();
}

function initPages() {
    $(".search-data>div").hide(0).eq(0).show(0);
    initSearch();
}
function initSearch() {
    $("#search-bar").on('keypress', function (e) {
        if (e.keyCode == 13) {//回车事件
            $("#content>div").hide().eq(1).show(0);
            search_event(1)
        }
    })
    $(".search-nav li").on("click", function (e) {

    })
}

async function play_song_start(now) {
    loadSongList.now = now
}

async function initSongList(id) {//加载歌单详情信息
    $("#content>div").hide().eq(0).show(0);
    var data = await get_playlist_detail(id);
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
            loadSongList()
        player_list.now = $(this).index() - 1
        player.player.play();
    })

    //歌单收藏、分享、播放
    /*     var info = await get_playlist_detail_dynamic(id)
        // console.log(info)
        $("#favorite").html("收藏(" + format_num(info.bookedCount) + ")")
        $("#share_list").html("分享(" + format_num(info.shareCount) + ")")
        $("#songlist_statistics_info").html("歌曲:" + data.playlist.trackIds.length + "  播放:" + format_num(info.playCount)) */
    get_playlist_detail_dynamic(id).then(e => {
        $("#favorite").html("收藏(" + format_num(e.bookedCount) + ")")
        $("#share_list").html("分享(" + format_num(e.shareCount) + ")")
        $("#songlist_statistics_info").html("歌曲:" + data.playlist.trackIds.length + "  播放:" + format_num(e.playCount))
    })
    return new Promise((resolve, rejects) => {
        resolve(data)
    })
}

async function loadSongList() {//播放列表更新
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

async function initUserSongList(userid) {//加载用户歌单
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
        initSongList($(this).attr("data-id")).then(e => {
            songlist = e;
            loadSongList()
        })
        $(this).siblings("li").children("a").removeClass("song_lost-focus")
        $(this).children("a").addClass("song_lost-focus")
    })
    return new Promise((resolve, rejects) => {
        resolve(data);
    })
}

function search_event(type) {
    get_search($("#search-bar").val(), type).then(e => {
        $("#search-counters span").html(e.result.songCount)
        //清空现有歌曲
        $(".search-singe ul li:not(:first)").remove()
        //添加搜索结果
        e.result.songs.forEach(e => {
            var song = $("<li><span><span>"
                + "<svg class=\"icon svg-icon\" aria-hidden=\"true\">"
                + "<use xlink:href=\"#icon-xihuan\"></use>"
                + "</svg><svg class=\"icon svg-icon\" aria-hidden=\"true\">"
                + "<use xlink:href=\"#icon-xiazai\"></use>"
                + "</svg></span></span>"
                + `<span>${e.name}</span>`
                + `<span>${e.artists[0].name}</span>`
                + `<span>${e.album.name}</span>`
                + `<span>${format_time(e.duration)}</span></li>`)
            $(".search-singe ul").append(song)
        })
    })
}
function bindPlayer() {
    // 播放器按钮绑定
    //下一首、上一首事件
    $("#player_play").on('click', function () {//播放、暂停及图标变化
        if (player.player.paused) {
            player.player.play();
            $("#player_play use").attr("xlink:href", "#icon-zanting")
        } else {
            player.player.pause();
            $("#player_play use").attr("xlink:href", "#icon-bofang")
        }
    })
    $("#player_prev").on('click', () => {
        player_list.now--;
        player.player.play();
    })
    $("#player_next").on('click', () => {
        player_list.now++;
        player.player.play();
    })



    //音量条事件
    $("#volume_bar").mouseover(function () {
        $(this).addClass("volume_thumb_dot")
    })
    $("#volume_bar").mouseout(function () {
        $(this).removeClass("volume_thumb_dot")
    })
    $("#volume_thumb").width(0.5 * $("#volume_bar").width())
    $("#volume_bar").mousedown(function (e) {
        volume_flag = true
        $("#volume_thumb").width((e.pageX - $(this).offset().left))
        player.player.volume = $("#volume_thumb").width() / $(this).width()
        if (player.player.volume == 0) {
            $("#volume_icon").find("use").attr("xlink:href", "#icon-guanbishengyin")
        } else {
            $("#volume_icon").find("use").attr("xlink:href", "#icon-yinliang")
        }
    })
    $("#volume_bar").mousemove(function (e) {
        if (volume_flag) {
            $("#volume_thumb").width((e.pageX - $(this).offset().left))
            player.player.volume = $("#volume_thumb").width() / $(this).width()
            if (player.player.volume == 0) {
                $("#volume_icon").find("use").attr("xlink:href", "#icon-guanbishengyin")
            } else {
                $("#volume_icon").find("use").attr("xlink:href", "#icon-yinliang")
            }
        }
    })
    $("#volume_bar").mouseup(() => {
        volume_flag = false
    })
    //静音事件
    volume_flag1 = 0
    $("#volume_icon").on('click', function () {
        let tmp = player.player.volume
        player.player.volume = volume_flag1
        volume_flag1 = tmp
        if (player.player.volume == 0) {
            $(this).find("use").attr("xlink:href", "#icon-guanbishengyin")
        } else {
            $(this).find("use").attr("xlink:href", "#icon-yinliang")
        }
    })

    //进度条事件
    $("#song_bar").mouseover(function () {
        $("#song_thumb").addClass("song_thumb_dot")
    })
    $("#song_bar").mouseout(function () {
        $("#song_thumb").removeClass("song_thumb_dot")
    })
    // $("#song_thumb").width(*$("#song_bar").width())
    $("#song_bar").mousedown(function (e) {
        song_flag = true
        $("#song_thumb").width((e.pageX - $(this).offset().left))
        console.log((e.pageX - $(this).offset().left) / $(this).width())
        // player.player.volume=$("#song_bar").width()/$(this).width()
    })
    $("#song_bar").mousemove(function (e) {
        /*         if(volume_flag){
                    $("#song_bar").width((e.pageX - $(this).offset().left))
                    player.player.volume=$("#song_bar").width()/$(this).width()
                } */
    })
    $("#song_bar").mouseup(() => {
        // volume_flag=false
    })
    /*     setInterval(function(){
            $("#song_thumb").width($("#song_bar").width()*a/100)
            a++
            console.log(a)
        },500) */
    $("#song_list_show").on('click', () => {
        $("#show-song-list").toggle(100)
    })
}

function initPlayer() {
    return {
        player: $("#playerr")[0],
        pic: $("#song_pic img")[0],
        song_name: $("#song_name"),
        song_author: $("#song_author")
    }
}

function Dialog(msg) {//用于提示弹窗，传入提示内容
    $("#dialog").html(msg)
    $("#dialog").stop().fadeIn(800)
    $("#dialog").css("top", $("#player").offset().top - 60)
    setTimeout(() => {
        $("#dialog").stop().fadeOut(2000)
    }, 1500)
}

async function load_song(id) {
    data = await get_song_url(id)
    player.src = data.data[0].url
    player.player.play();
    $("#player_play use").attr("xlink:href", "#icon-zanting")
}