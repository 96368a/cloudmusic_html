
function load_songlist(id){
    _url="https://163.233c.cn/playlist/detail?id="
    console.log
    return $.getJSON(_url+id);
}

$(function(){
    let userid=607728498;
var menu=$.getJSON("https://163.233c.cn/user/playlist?uid="+userid,function(menu){
    menu.playlist.forEach(e => {
        let menu_list=$("<li><a href=javascript:; class=\"menu_song\">"+e.name+"</a></li>");
        menu_list.on('click',load_songlist(e.id))
        if(e.userId==userid)
        $("#favorite_list").before(menu_list)
        else
        $(".menu ul").append(menu_list)
    });
});
});
