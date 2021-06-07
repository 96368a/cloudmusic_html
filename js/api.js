_url="https://163.233c.cn"
//https://music.api.tianli0.top/
//http://www.hjmin.com/
//http://music.eleuu.com/
function format_num(num){
    if(num<=9999){
        return num+"";
    }else{
        return Math.floor(num/10000)+"万";
    }
}
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
    url= _url+"/user/playlist?uid="
    return get_json(url+userid);
}

async function get_playlist_detail(id){//加载歌单详情 传入歌单id
    url = _url+"/playlist/detail?id="
    data = await get_json(url+id);
    ids=[]
    for(i=0;i<data.playlist.trackIds.length;i++){
        ids.push(data.playlist.trackIds[i].id);
    }
    data.playlist.tracks = await get_song_detail(ids);
    data.playlist.tracks = data.playlist.tracks.songs
    return data;
}
async function get_song_detail(ids){//加载歌单详情 传入歌曲id数组，可批量查询
    url= _url+"/song/detail?ids="
    return get_json(url+ids.toString());
}

async function get_playlist_detail_dynamic(id){
    url= _url+"/playlist/detail/dynamic?id="
    return get_json(url+id);
}

async function get_song_url(id){
    url = _url+"/song/url?id="
    return get_json(url+id);
}