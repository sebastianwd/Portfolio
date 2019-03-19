import $ from "jquery";
window.jQuery = $;
window.$ = $;

import { TweenMax } from "gsap/TweenMax";
require("../node_modules/jquery-tagcanvas/jquery.tagcanvas");

export const animationEnd =
    "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

export function BlastTitle(_delimiter, _currPage) {
    $(_currPage + " h1").css("opacity", "1");
    $(_currPage + " h1").blast({
        delimiter: _delimiter,
        tag: "span"
    });

    let a = 0;
    $(_currPage + " h1 .blast").each(function() {
        let $this = $(this);

        if (a == 300) {
            a = 400;
        }
        if (a == 1200) {
            a = 1000;
        }

        if (a == 400) {
            setTimeout(function() {
                $(_currPage + " h1 .no-blast .blast").addClass(
                    "animated rotateIn faster"
                );
            }, 1100);
        }

        setTimeout(function() {
            $this.addClass("animated bounceIn");
        }, a);

        if (a < 1200) {
            a = a + 80;
        } else {
            a = a + 70;
        }
    });

    setTimeout(function() {
        $(_currPage + " h1 .blast").removeClass("animated bounceIn");
        $(_currPage + " h1 .blast").css("opacity", 1);

        $(_currPage + " h1 .blast").mouseenter(function() {
            let el = $(this);
            el.addClass("animated rubberBand");
            el.one(animationEnd, function() {
                el.removeClass("animated rubberBand");
            });
        });
    }, 3000);
}

function reset($elem) {
    $elem.before($elem.clone(true));
    var $newElem = $elem.prev();
    $elem.remove();
    return $newElem;
} // end reset()

$("._iterateEffects")
    .off("click")
    .on("click", function(e) {
        var $this = $(this);
        //style="background-color:
        $(".pt-page-" + $this.data("animation")).removeClass(
            "pt-page-rotateSlideOut"
        );
        $(".pt-page-" + $this.data("animation")).addClass(
            "pt-page-rotateSlideOut"
        );
        setTimeout(() => {
            $(".pt-page-" + $this.data("animation")).removeClass(
                "pt-page-current"
            );
        }, 400);

        setTimeout(() => {
            var $this2 = reset($(".pt-page-2"));
            $this2.addClass("pt-page-rotateSlideIn pt-page-current  ");
            // setTimeout(() => {
            //     $(".pt-page-2").removeClass("cbg-color-dark");
            // }, 700);
        }, 400);
    });

//------------------------ Cheap Parallax- though it doesn't work as parallax.js with its mobile feature
// $(".pt-page").mousemove(function(e) {
//     parallaxIt(e, ".one", -150);
//     parallaxIt(e, ".two", -40);
// });
function parallaxIt(e, target, movement) {
    var $this = $(".pt-page");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
        x: ((relX - $this.width() / 2) / $this.width()) * movement,
        y: ((relY - $this.height() / 2) / $this.height()) * movement
    });
}
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);

//----------------------------
