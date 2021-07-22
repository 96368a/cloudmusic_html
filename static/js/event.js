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