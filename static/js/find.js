var NowObj = "recommendations";
document.getElementById("recommendations").addEventListener("click", () => clicked1(NowObj, "recommendations"));
document.getElementById("customize").addEventListener("click", () => clicked1(NowObj, "customize"));
document.getElementById("SongList").addEventListener("click", () => clicked1(NowObj, "SongList"));
document.getElementById("rank").addEventListener("click", () => clicked1(NowObj, "rank"));
document.getElementById("singer").addEventListener("click", () => clicked1(NowObj, "singer"));
document.getElementById("LatestMusic").addEventListener("click", () => clicked1(NowObj, "LatestMusic"));

function clicked1(obj0, obj1) {
    var object0 = "item-" + obj0;
    var object1 = "item-" + obj1;
    if (obj0 == obj1) {

    } else {
        NowObj = obj1;
        document.getElementById(object0).style.display = "none";
        document.getElementById(object1).style.display = "block";
    }
}

function CarouselChart() {

}