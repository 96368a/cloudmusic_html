var count = 1;
var a1;
var b1;
var c1;
var a = document.getElementById("img0");
var b = document.getElementById("img1");
var c = document.getElementById("img2");
b.style.zIndex = 100;

function next_pic() {

    for (var i = 0; i < 8; i++) {

        var obj = document.getElementById("img" + i);
        if (window.getComputedStyle(obj).zIndex != 100) {

            obj.style.zIndex = parseInt(window.getComputedStyle(obj).zIndex) + 1;
        }
    }
    a.style.zIndex = 0;
    a.style.left = "80px";
    a.style.transform = "scale(" + 1 + ")";

    b.style.zIndex = parseInt(window.getComputedStyle(c).zIndex) + 1;
    b.style.left = "480px";
    b.style.transform = "scale(" + 1 + ")";

    c.style.left = "280px";
    c.style.zIndex = 100;
    c.style.transform = "scale(" + 1.3 + ")";
    a = document.getElementById("img" + (count) % 8);
    b = document.getElementById("img" + (count + 1) % 8);
    c = document.getElementById("img" + (count + 2) % 8);
    count++;
    if (count > 7) {
        count = 0;
    }


}
//var flag = setInterval("next_pic()", 2000);

// document.getElementById("CarouselChart").addEventListener("mouseover", pause);

function pause() {
    clearInterval(flag);
}

// document.getElementById("CarouselChart").addEventListener("mouseout", set);

function set() {
    flag = setInterval("next_pic()", 2000);
}

document.getElementById("CarouselChart").addEventListener("mouseover", appear);

function appear() {
    document.getElementById("left").style.display = "block";
    document.getElementById("right").style.display = "block";
}

document.getElementById("CarouselChart").addEventListener("mouseout", hid);

function hid() {
    document.getElementById("left").style.display = "none";
    document.getElementById("right").style.display = "none";
}
document.getElementById("left").addEventListener("click", pre_pic);
document.getElementById("right").addEventListener("click", next_pic);


var tempObj;

function pre_pic() {


    for (var i = 0; i < 8; i++) {

        var obj2 = document.getElementById("img" + i);
        if (window.getComputedStyle(obj2).zIndex != 100) {
            if (window.getComputedStyle(obj2).zIndex == 0) {
                tempObj = obj2;
            } else {

                obj2.style.zIndex = parseInt(window.getComputedStyle(obj2).zIndex) - 1;

            }

        }
    }
    tempObj.style.zIndex = 7;
    tempObj.style.left = "480px";
    tempObj.style.transform = "scale(" + 1 + ")";




    b.style.zIndex = parseInt(window.getComputedStyle(a).zIndex) - 2;
    b.style.left = "80px";
    b.style.transform = "scale(" + 1 + ")";

    a.style.left = "280px";
    a.style.zIndex = 100;
    a.style.transform = "scale(" + 1.3 + ")";

    console.log(window.getComputedStyle(document.getElementById("img0")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img1")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img2")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img3")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img4")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img5")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img6")).zIndex);
    console.log(window.getComputedStyle(document.getElementById("img7")).zIndex);
    console.log("---------------------------");

    count--;
    if (count == 0) {
        a1 = 7;
    } else {
        a1 = count - 1;
    }

    b1 = (count) % 8;
    c1 = (count + 1) % 8;

    a = document.getElementById("img" + a1);
    b = document.getElementById("img" + b1);
    c = document.getElementById("img" + c1);

    if (count == 0) {
        count = 8;
    }
}