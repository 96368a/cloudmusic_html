/*
 * @LastEditors: Logs404
 * @Description: 主函数
 */
var menu, songlist
var player = new Object //播放器对象
var player_list = new Object() //播放列表
$(function() {
    if (window.location.protocol == "file:") {
        alert("检测到当前为本地地址,存在跨域问题,将为你跳到演示地址")
        window.location.href = "https://blog.52lty.cf/cloudmusic_html/"
    }
    create_player_list()
    // let userid = 485379100;
    let userid = 607728498;
    // let userid = 427657421;
    // $.pjax({url:"menu.html",container:".menu"})
    // $(".menu").load("templates/menu.html");
    // $("#content").load("templates/song_list.html");
    $("#content").load("templates/search.html");
    //播放列表组件
    $("#show-song-list").load("templates/show-song-list.html")
    $("#show-song-list").hide()
    $("#show-song-list").css("left", $("#content").offset().left + $("#content").width() - $("#show-song-list").width())
    $("#show-song-list").css("top", $("header").height())
    load_menu(userid).then(e => {
        menu = e;
    });
    load_songlist(6617041635).then(e => {
        songlist = e;
        play_songlist().then(e => {
            player_list.now = 0;
            // player.player.pause();
            $("#player_play use").attr("xlink:href", "#icon-bofang")
        })
    });
    // play_songlist()
    player.player = $("#playerr")[0]
    player.pic = $("#song_pic img")[0]
    player.song_name = $("#song_name")
    player.song_author = $("#song_author")
    player.player.src = "";
    player.player.volume = 0.5
    console.log("%c%s", "color: #66ccff", _logs404.getMultiLine())

    $("#dialog").hide()

    // $("#dialog").css("top",$("#player").offset().top-60)
    initBindEvents();
    initPages();
});

function create_player_list() {
    player_list.now_id = 0
    player_list.songlist = new Map()
    player_list.order = []
    player_list.now = -1

}

Object.defineProperty(player_list, 'now', {
    get: function() {
        return value;
    },
    set: function(v) {
        value = v;
        // console.log(1)
        if (value >= 0 && value <= this.order.length) {
            let song_data = player_list.songlist[player_list.order[v]]
            player.pic.src = song_data.al_picurl
            player.song_name.html(song_data.name)
            player.song_author.html(song_data.author)
            player.player.src = song_data.url
            player.player.load()
            $("#player_play use").attr("xlink:href", "#icon-zanting")
            $("#player_progress span:nth-child(3)").html(format_time(song_data.time))
            var now_time = setInterval(() => {
                //歌曲播放进度
                if (player.player.paused == false) {
                    $("#player_progress span:nth-child(1)").html(("" + Math.floor(player.player.currentTime / 60)).padStart(2, '0') + ":" + ("" + Math.floor(player.player.currentTime % 60)).padStart(2, '0'))

                    //进度条
                    $("#song_thumb").width((player.player.currentTime / player.player.duration) * $("#song_bar").width())
                        // $("#player_progress progress").val((player.player.currentTime/player.player.duration)*100)
                }
            }, 800)
        }
        // alert("设置")
    }
})
Object.defineProperty(player_list, 'now_id', { //切歌
    get: function() {
        return nowid;
    },
    set: function(v) {
        nowid = v;
        if (v != 0) {
            $("#show-song-list ul").html("")
            $("#song-list-show-info span").html("共" + player_list.order.length + "首")
            player_list.order.forEach(e => {
                song = $("<li><span>" + player_list.songlist[e].name + "</span><span>" +
                    player_list.songlist[e].author +
                    "</span><span>" + format_time(player_list.songlist[e].time) +
                    "</span></li>")
                $("#show-song-list ul").append(song)
            });
        }
    }
})