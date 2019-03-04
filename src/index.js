require("normalize.css/normalize.css");
require("./styles/index.scss");
require("./styles/media.scss");
require("../node_modules/popper.js/dist/popper");
require("../node_modules/jquery/src/jquery");
require("../node_modules/blast-text/jquery.blast");
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";

$("#nav_bar nav a").removeClass("active");
$(".home-link").addClass("active");

$(".home-page h1").blast({
    delimiter: "character",
    tag: "span"
});

let a = 0;
$(".home-page .blast").each(function() {
    if (a == 300) {
        a = 400;
    }

    if (a == 1200) {
        a = 1000;
    }

    var el = $(this);

    if (a == 400) {
        setTimeout(function() {
            $(".home-page h1 .no-blast .blast").addClass(
                "animated rotateIn faster"
            );
        }, 1100);
    }

    setTimeout(function() {
        el.addClass("animated bounceIn");
    }, a);

    if (a < 1200) {
        a = a + 80;
    } else {
        a = a + 70;
    }
});
setTimeout(function() {
    $(".home-page .blast").removeClass("animated bounceIn");
    $(".home-page .blast").css("opacity", 1);

    $(".home-page .blast").mouseenter(function() {
        var el = $(this);

        $(this).addClass("animated rubberBand");
        $(this).one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function() {
                el.removeClass("animated rubberBand");
            }
        );
    });
}, 3000);

setTimeout(function() {
    $(".home-page .flat-button").addClass("animated bounceIn");
    $(".home-page .flat-button").one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
            $(".home-page .flat-button").removeClass("animated bounceIn");
            $(".home-page .flat-button").css("opacity", 1);
        }
    );
}, 2000);

$(".home-page .flat-button").mouseenter(function() {
    var el = $(this);

    $(this).addClass("animated rubberBand");
    $(this).one(
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
        function() {
            el.removeClass("animated rubberBand");
        }
    );
});
// envelope animation
window.onload = function() {
    var tl = new TimelineLite({ delay: 0.25 }),
        firstBg = document.querySelectorAll(".text__first-bg"),
        word = document.querySelectorAll(".text__word");

    tl.to(firstBg, 0.2, { scaleX: 1 })

        .to(word, 0.2, { opacity: 1 }, "-=0.1")
        .to(firstBg, 0.3, { scaleX: 0 });
};
