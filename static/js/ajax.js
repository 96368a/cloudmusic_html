/*
 * @LastEditors: Logs404
 * @Description: 用于各种ajax请求
 */
_url = "https://yy.233c.cn"
//https://music.api.tianli0.top/
//http://www.hjmin.com/
//http://music.eleuu.com/


//格式化播放量、评论数等
function format_num(num) {
    if (num <= 9999) {
        return num + "";
    } else {
        return Math.floor(num / 10000) + "万";
    }
}

//格式化歌曲时长
function format_time(time) {
    return ("" + Math.floor(time / 1000 / 60)).padStart(2, '0') + ":" + ("" + Math.floor(time / 1000 % 60)).padEnd(2, '0');

}
//用于请求json数据,因为后端采用json返回，所以还是很有必要的
async function get_json(url) {
    return new Promise((resolve, rejects) => {
        $.getJSON(url, (res, status) => {
            if (status) {
                resolve(res);
            } else {
                rejects(status);
            }
        })
    })
}

//加载个人歌单 传入用户id
async function get_user_playlist(userid) {
    url = _url + "/user/playlist?uid="
    return get_json(url + userid);
}

//加载歌单详情 传入歌单id
async function get_playlist_detail(id) {
    url = _url + "/playlist/detail?id="
    data = await get_json(url + id);
    ids = []
    for (i = 0; i < data.playlist.trackIds.length; i++) {
        ids.push(data.playlist.trackIds[i].id);
    }
    let song = await get_song_detail(ids);
    console.log(song)
    data.playlist.tracks = song.songs
    return data;
}
async function get_song_detail(ids) { //加载歌单详情 传入歌曲id数组，可批量查询
    url = _url + "/song/detail?ids="
    return get_json(url + ids.toString());
}

//获取歌曲评论数、播放量,传入歌单id
async function get_playlist_detail_dynamic(id) {
    url = _url + "/playlist/detail/dynamic?id="
    return get_json(url + id);
}

//获取歌曲播放地方，传入歌曲id数组
async function get_song_url(ids) { 
    url = _url + "/song/url?id="
    return get_json(url + ids.toString());
}

/* type: 搜索类型；默认为 1 即单曲 , 
取值意义 :   1: 单曲, 
            10: 专辑, 
            100: 歌手, 
            1000: 歌单, 
            1002: 用户, 
            1004: MV, 
            1006: 歌词, 
            1009: 电台, 
            1014: 视频, 
            1018:综合 */
async function get_search(keywords, type = 1, limit = 30) {
    url = _url + `/search?keywords=${keywords}&type=${type}&limit=${limit}`
    return get_json(url)
}

//以下F12彩蛋,代码无意义
_logs404 = function () {
    /* 
    __                 __ __  ____  __ __
   / /___  ____ ______/ // / / __ \/ // /
  / / __ \/ __ `/ ___/ // /_/ / / / // /_
 / / /_/ / /_/ (__  )__  __/ /_/ /__  __/
/_/\____/\__, /____/  /_/  \____/  /_/   
        /____/                           
    */
}

logs404 = function () {
    /*
     __       ______   _______    ______   __   __      ______   __   __       
/_/\     /_____/\ /______/\  /_____/\ /__/\/__/\   /_____/\ /__/\/__/\     
\:\ \    \:::_ \ \\::::__\/__\::::_\/_\  \ \: \ \__\:::_ \ \\  \ \: \ \__  
 \:\ \    \:\ \ \ \\:\ /____/\\:\/___/\\::\_\::\/_/\\:\ \ \ \\::\_\::\/_/\ 
  \:\ \____\:\ \ \ \\:\\_  _\/ \_::._\:\\_:::   __\/ \:\ \ \ \\_:::   __\/ 
   \:\/___/\\:\_\ \ \\:\_\ \ \   /____\:\    \::\ \   \:\_\ \ \    \::\ \  
    \_____\/ \_____\/ \_____\/   \_____\/     \__\/    \_____\/     \__\/  
                                                                           
     */
}
Function.prototype.getMultiLine = function () {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}
