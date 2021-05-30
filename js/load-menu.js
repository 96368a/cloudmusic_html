$(function(){
    let userid=607728498;
var menu=$.getJSON("https://163.233c.cn/user/playlist?uid="+userid,function(menu){
    menu.playlist.forEach(e => {
        let menu_list=$("<li><a href=javascript:; class=\"menu_song\">"+e.name+"</a></li>");
        if(e.userId==userid)
        $("#favorite_list").before(menu_list)
        else
        $(".menu ul").append(menu_list)
    });
});
console.log(menu)
});