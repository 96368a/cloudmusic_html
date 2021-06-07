async function load_menu(userid) {//加载个人歌单
    data = await get_user_playlist(userid)
    data.playlist.forEach(e => {
        let menu_list = $("<li><a href=javascript:; class=\"menu_song\">" + e.name + "</a></li>");
        menu_list.attr("data-id",e.id)
        if (e.userId == userid)//用户创建
            $("#favorite_list").before(menu_list)
        else//用户收藏
            $(".menu ul").append(menu_list)
    });
    $(".menu li[data-id]").on('click',function(){//歌单点击监听
        load_songlist($(this).attr("data-id"))
    })
    return data
}

async function load_songlist(id) {//歌单详情
    data = await get_playlist_detail(id);
    console.log(data)
    //设置歌单名
    $("#songlist_info h2").html(data.playlist.name)
    //设置歌单缩略图
    $("#list_img img").attr("src",data.playlist.coverImgUrl).attr("alt",data.playlist.name)
    //设置作者
    $(".avatar_1 span").html(data.playlist.creator.nickname).siblings("img").attr("src",data.playlist.creator.avatarUrl)
    //设置创建时间
    create_time=new Date(data.playlist.createTime)
    $(".create_time").html(create_time.getFullYear()+"年"+create_time.getMonth()+"月 创建")
    //简介
    if(data.playlist.description!=null){
        $("#introduction").html("简介: "+data.playlist.description).show()
    }else{
        $("#introduction").hide()
    }
    //添加歌曲
    $("#songlist_each_info li:not(li:nth-child(1))").each(function(){
        $(this).fadeOut().remove();
    })
    data.playlist.tracks.forEach(e=>{
        list=$("<li><span>❤</span><span>"+e.name
        +"</span><span>"+e.ar[0].name+"</span><span>"
        +e.al.name+"</span><span>"
        +(""+Math.floor(e.dt/1000/60)).padStart(2,'0')+":"+(""+Math.floor(e.dt/1000%60)).padEnd(2,'0')
        +"</span></li>")
        list.attr("data-id",e.id)
        $("#songlist_each_info ul").append(list)
    })
    //歌曲点击监听
    $("#songlist_each_info li[data-id]").on('dblclick',function(){
        load_song($(this).attr("data-id"))
    })
    
    //歌单收藏、分享、播放
    info=await get_playlist_detail_dynamic(id)  
    console.log(info)
    $("#favorite").html("收藏("+format_num(info.bookedCount)+")")
    $("#share_list").html("分享("+format_num(info.shareCount)+")")
    $("#songlist_statistics_info").html("歌曲:"+data.playlist.tracks.length+"  播放:"+format_num(info.playCount))
    return data
}
async function load_song(id){
    data =await get_song_url(id)
    player.src=data.data[0].url
    player.play();
    $("#player_play").html("⏸")
}
//播放器按钮绑定
setTimeout(() => {
    $("#player_play").click(function(){//播放、暂停
        console.log(233)
        if(player.paused){
            player.play();
            $(this).html("⏸")
        }else{
            player.pause();
            $(this).html("⏯")
        }
    })
}, 2000);