
var menu, songlist
var player = new Object//播放器对象
var player_list = new Object()//播放列表
$(function () {
    create_player_list()
    let userid = 607728498;
    // $.pjax({url:"menu.html",container:".menu"})
    $(".menu").load("menu.html");
    $("#content").load("song_list.html");
    $("#player").load("player.html");
    load_menu(userid).then(e => {
        menu = e;
    });
    load_songlist(6617041635).then(e => {
        songlist = e;
    });
    setTimeout(function () {
        // play_songlist()
        player.player = $("#playerr")[0]
        player.pic = $("#song_pic img")[0]
        player.song_name = $("#song_name")
        player.song_author = $("#song_author")
        player.player.src = "http://m8.music.126.net/20210607213231/235059e7de4ef8abd8aa04b2a8e6b990/ymusic/04c3/30f5/9f03/f2160f0315f611d729dfc034a1d0e813.mp3";
        player.player.volume=0.5
/* Object.defineProperty(player.player, 'currentTime', {
    get: function () {
        return now_time;
    },
    set: function (v) {
        now_time=v;
        alert(233)
    }
}) */
    
    }, 3000)
});

function create_player_list() {
    player_list.now_id = 0
    player_list.songlist = new Map()
    player_list.order = []
    player_list.now = -1

}

Object.defineProperty(player_list, 'now', {
    get: function () {
        return value;
    },
    set: function (v) {
        value = v;
        // console.log(1)
        if (value >= 0 && value <= this.order.length) {
            let song_data = player_list.songlist[player_list.order[v]]
            player.pic.src = song_data.al_picurl
            player.song_name.html(song_data.name)
            player.song_author.html(song_data.author)
            player.player.src = song_data.url
            player.player.play()
            $("#player_play use").attr("xlink:href","#icon-bofang")
            $("#player_progress span:nth-child(3)").html(format_time(song_data.time))
            var now_time=setInterval(()=>{
            //歌曲播放进度
            $("#player_progress span:nth-child(1)").html((""+Math.floor(player.player.currentTime/60)).padStart(2,'0')+":"+(""+Math.floor(player.player.currentTime%60)).padStart(2,'0'))
            
            //进度条
            $("#player_progress progress").val((player.player.currentTime/player.player.duration)*100)
            },800)
        }
        // alert("设置")
    }
})
