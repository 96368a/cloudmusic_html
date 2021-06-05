
async function get_json(url){
    return new Promise((resolve,rejects)=>{
        $.getJSON(url,(res,status)=>{
            if(status){
                resolve(res);
            }else{
                rejects(status);
            }
        })
    })
}

async function get_user_playlist(userid){//加载个人歌单 传入用户id
    _url="https://163.233c.cn/user/playlist?uid="
    return get_json(_url+userid);
}

async function get_playlist_detail(id){//加载歌单详情 传入歌单id
    _url = "https://163.233c.cn/playlist/detail?id="
    data = await get_json(_url+id);
    ids=[]
    for(i=0;i<data.playlist.trackIds.length;i++){
        ids.push(data.playlist.trackIds[i].id);
    }
    data.playlist.tracks = await get_song_detail(ids);
    data.playlist.tracks = data.playlist.tracks.songs
    return data;
}
async function get_song_detail(ids){//加载歌单详情 传入歌曲id数组，可批量查询
    _url= "https://163.233c.cn/song/detail?ids="
    return get_json(_url+ids.toString());
}

