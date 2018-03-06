/**
 * Created by jo.chan on 2017/11/15.
 */


var data = {
    lang: ''
};

//youtube
window.videoHtml = '<div id="player"></div>';
$(".playBtn").on("click", function () {
    // fbq('track', 'ViewContent');
    $(".video-wrap").show();
    $(".black").show();
    $(".video").append(videoHtml).show();
    var player = new YT.Player('player', {
        width: '750',
        height: '468',
        videoId: data.lang == 1 ? '7QSrH8a4TUs' : '0HibNQFC_qQ',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
});

window.tag = document.createElement('script');
var checkHttp = document.location.protocol;
tag.src = checkHttp + "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.done = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        done = true;
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function stopVideo() {
    player.stopVideo();
}

$(".video-wrap").on("click", function () {
    $(".video").html("").hide();
    $(".black").hide();
    $(".box").hide();
    $(this).hide();
});


$(".box-lang").on("click", function () {
    $(".box-lang ul").slideToggle("fast");
});

$(".box-lang ul li").on("click", function () {
    if ($(this).hasClass("active")) {
        return;
    }
    var lang = $(this).text();
    $(".box-lang span").text(lang);
    var index = $(this).index();
    $(".box-lang ul li.active").removeClass("active");
    $(".box-lang ul li").eq(index).addClass("active");
    $(".banner.showActive").removeClass("showActive");
    $(".banner").eq(index).addClass("showActive");
    initLang(index);
});


$(".ios").on("click", function () {
    fbq('track', 'Lead');
    gtag('event', 'appstore', {
        'event_category': 'appstore_category',
        'event_label': 'appstore_label'
    });
});

$(".apk").on("click", function () {
    fbq('track', 'AddToWishlist');
    gtag('event', 'apk', {
        'event_category': 'apk_category',
        'event_label': 'apk_label'
    });
});

$(".fb").on("click", function () {
    fbq('track', 'AddToCart');
    gtag('event', 'facebook', {
        'event_category': 'facebook_category',
        'event_label': 'facebook_label'
    });
});


$(".google").on("click", function () {
    fbq('track', 'Purchase');
    gtag('event', 'google play', {
        'event_category': 'google play_category',
        'event_label': 'google play_label'
    });
});


$(function () {
    var language = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
    console.log(language);
    data.lang = (language.indexOf('zh') == -1 || localStorage.lang == '1') ? 1 : 0;
    initLang(data.lang);
});


//初始化语言
function initLang(index) {
    $(".box-lang ul li.active").removeClass("active");
    $(".box-lang ul li").eq(index).addClass("active");
    var text = $(".box-lang ul li.active").text();
    $(".box-lang span").text(text);
    data.lang = index;
    console.log(data.lang);
    localStorage.lang = index;
    if (index == 0) {
        $(".banner").removeClass('showActive');
        $(".banner").eq(0).addClass('showActive');
    } else if (index == 1) {
        $(".banner").removeClass('showActive');
        $(".banner").eq(1).addClass('showActive');
    }
}