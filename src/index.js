require("normalize.css/normalize.css");
require("./styles/index.scss");
require("./styles/media.scss");
require("./styles/gallery.scss");
require("./modernizr-custom");
require("../node_modules/jquery/dist/jquery");
import $ from "jquery";
window.jQuery = $;
window.$ = $;
require("../node_modules/blast-text/jquery.blast");
require("../node_modules/tilt.js/src/tilt.jquery");

require("../node_modules/smoothstate-cachefix/smoothState");
require("./gallery");
require("./pagetransitions.js");
import { BlastTitle, animationEnd } from "./pagetransitions.js";
import { TweenLite, Power2, TimelineLite } from "gsap/TweenMax";

const $loader = $(".loading-bg");

const APP = {
    common: {
        init: function() {
            console.log("js en común");
        }
    },
    Index: {
        init: function() {
            $("#contactForm").submit(function(e) {
                var form = $(this);
                var url = form.attr("action");
                $.post(
                    url,
                    form.serialize(),
                    function(data, textStatus, jqXHR) {
                        if (data.result != "success") {
                            alert("oops");
                        } else {
                            alert(":D");
                        }
                    },
                    "json"
                );
                return false;
            });
            console.log("Index");

            const curPage = ".pt-1";

            BlastTitle("character", curPage);

            setTimeout(() => {
                $(curPage + " .flat-button").removeClass("slideY");
            }, 1800);
            setTimeout(function() {
                $(curPage + " .flat-button").addClass("animated bounceIn");
                $(curPage + " .flat-button").one(animationEnd, function() {
                    $(curPage + " .flat-button").removeClass(
                        "animated bounceIn"
                    );
                    $(curPage + " .flat-button").css("opacity", 1);
                });
            }, 2000);

            $(curPage + " .flat-button").on("mouseenter", function() {
                let el = $(this);
                el.removeClass("slideY").addClass("animated rubberBand");
                el.one(animationEnd, function() {
                    el.removeClass("animated rubberBand");
                });
            });
            // envelope animation
            function envelope() {
                var tl = new TimelineLite({ delay: 0.25 }),
                    firstBg = document.querySelectorAll(".text__first-bg"),
                    word = document.querySelectorAll(".text__word");

                tl.to(firstBg, 0.2, { scaleX: 1 })

                    .to(word, 0.2, { opacity: 1 }, "-=0.1")
                    .to(firstBg, 0.3, { scaleX: 0 });
            }
            envelope();
        }
    },
    About: {
        init: function() {
            console.log("About");
            const curPage = ".pt-2";
            BlastTitle("character", curPage);

            setTimeout(function() {
                $(" h1 .blast").removeClass("animated bounceIn");
                $(" h1 .blast").css("opacity", 1);

                $(" h1 .blast").mouseenter(function() {
                    var el = $(this);

                    el.addClass("animated rubberBand");
                    el.one(animationEnd, function() {
                        el.removeClass("animated rubberBand");
                    });
                });
            }, 1000);

            $(" p").blast({
                delimiter: "word",
                tag: "span"
            });

            setTimeout(() => {
                $("p").css("opacity", 1);
            }, 200);

            setTimeout(() => {
                $(".blast").mouseenter(function() {
                    var el = $(this);
                    el.addClass("animated rubberBand");
                    el.one(animationEnd, function() {
                        el.removeClass("animated rubberBand");
                    });
                });
            }, 1000);
        }
    },
    Skills: {
        init: function() {
            console.log("skills");
            const curPage = ".pt-3";
            BlastTitle("word", curPage);

            setTimeout(function() {
                $(" h1 .blast").removeClass("animated bounceIn");
                $(" h1 .blast").css("opacity", 1);

                $(" h1 .blast").mouseenter(function() {
                    var el = $(this);

                    el.addClass("animated rubberBand");
                    el.one(animationEnd, function() {
                        el.removeClass("animated rubberBand");
                    });
                });
            }, 1000);

            $(" p").blast({
                delimiter: "word",
                tag: "span"
            });

            setTimeout(() => {
                $("p").css("opacity", 1);
            }, 200);

            setTimeout(() => {
                $(".blast").mouseenter(function() {
                    var el = $(this);
                    el.addClass("animated rubberBand");
                    el.one(animationEnd, function() {
                        el.removeClass("animated rubberBand");
                    });
                });
            }, 1000);
            $("#myCanvas").tagcanvas({
                textColour: "#08FDD8",
                outlineThickness: 0.5,
                outlineColour: "#fe0853",
                maxSpeed: 0.05,
                freezeActive: true,
                shuffleTags: true,
                shape: "sphere",
                zoom: 0.9,
                textFont: null,
                pinchZoom: true,
                freezeDecel: true,
                fadeIn: 3000,
                initial: [0.3, -0.1],
                depth: 0.8,
                noSelect: false,
                dragControl: true
            });
        }
    },
    Projects: {
        init: function() {
            (function() {
                var support = { transitions: Modernizr.csstransitions },
                    // transition end event name
                    transEndEventNames = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        msTransition: "MSTransitionEnd",
                        transition: "transitionend"
                    },
                    transEndEventName =
                        transEndEventNames[Modernizr.prefixed("transition")],
                    onEndTransition = function(el, callback) {
                        var onEndCallbackFn = function(ev) {
                            if (support.transitions) {
                                if (ev.target != this) return;
                                this.removeEventListener(
                                    transEndEventName,
                                    onEndCallbackFn
                                );
                            }
                            if (callback && typeof callback === "function") {
                                callback.call(this);
                            }
                        };
                        if (support.transitions) {
                            el.addEventListener(
                                transEndEventName,
                                onEndCallbackFn
                            );
                        } else {
                            onEndCallbackFn();
                        }
                    };

                new GridFx(document.querySelector(".grid"), {
                    imgPosition: {
                        x: -0.5,
                        y: 1
                    },
                    onOpenItem: function(instance, item) {
                        instance.items.forEach(function(el) {
                            if (item != el) {
                                var delay = Math.floor(Math.random() * 50);
                                el.style.WebkitTransition =
                                    "opacity .5s " +
                                    delay +
                                    "ms cubic-bezier(.7,0,.3,1), -webkit-transform .5s " +
                                    delay +
                                    "ms cubic-bezier(.7,0,.3,1)";
                                el.style.transition =
                                    "opacity .5s " +
                                    delay +
                                    "ms cubic-bezier(.7,0,.3,1), transform .5s " +
                                    delay +
                                    "ms cubic-bezier(.7,0,.3,1)";
                                el.style.WebkitTransform = "scale3d(0.1,0.1,1)";
                                el.style.transform = "scale3d(0.1,0.1,1)";
                                el.style.opacity = 0;
                            }
                        });
                    },
                    onCloseItem: function(instance, item) {
                        instance.items.forEach(function(el) {
                            if (item != el) {
                                el.style.WebkitTransition =
                                    "opacity .4s, -webkit-transform .4s";
                                el.style.transition =
                                    "opacity .4s, transform .4s";
                                el.style.WebkitTransform = "scale3d(1,1,1)";
                                el.style.transform = "scale3d(1,1,1)";
                                el.style.opacity = 1;

                                onEndTransition(el, function() {
                                    el.style.transition = "none";
                                    el.style.WebkitTransform = "none";
                                });
                            }
                        });
                    }
                });
            })();

            $(".img-wrap").tilt({
                glare: true,
                maxGlare: 0.5
            });
        }
    },
    Contact: {
        init: function() {
            console.log("Contact");
            const curPage = ".pt-5";

            BlastTitle("character", curPage);
            $("body")
                .off("click", "#sendMessage")
                .on("click", "#sendMessage", function(e) {
                    e.preventDefault();
                    if ($("#honeypot").val() !== "") {
                        return false;
                    }
                    $("#contactForm").submit();
                });

            $("body")
                .off("submit", "#contactForm")
                .on("submit", "#contactForm", function(e) {
                    const $form = $(this);
                    let url = $form.attr("action");
                    $.post(
                        url,
                        $form.serialize(),
                        function(data, textStatus, jqXHR) {
                            if (data.result != "success") {
                                alert("oops");
                            } else {
                                alert(":D");
                            }
                        },
                        "json"
                    );
                    return false;
                });
        }
    }
};

const UTIL = {
    exec: function(controller, action) {
        var ns = APP,
            action = action === undefined ? "init" : action;
        if (
            controller !== "" &&
            ns[controller] &&
            typeof ns[controller][action] == "function"
        ) {
            ns[controller][action]();
        }
    },
    init: function() {
        var body = $("._load"),
            controller = body.data("load"),
            action = body.data("load-action");
        UTIL.exec("common");
        UTIL.exec(controller);
        if (action !== undefined && action !== "") {
            UTIL.exec(controller, action);
        }
    }
};

let observerOptions = {
    root: document.querySelector(".app-container"),
    rootMargin: "0px",
    threshold: 0.75
};

const indexCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            TweenLite.from(".pt-page-1", 2, {
                x: -50,
                ease: Elastic.easeOut,
                autoAlpha: 0
            });

            APP.Index.init();
        }
    });
};

const aboutCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            TweenLite.set(".pt-page-2", { autoAlpha: 0, x: -50 });
            TweenLite.to(".pt-page-2", 2, {
                x: 0,
                ease: Elastic.easeOut,
                autoAlpha: 1
            });
            let pages = $(".pt-page").not(".pt-page-2");
            TweenLite.set(pages, { autoAlpha: 0 });
            APP.About.init();
        }
    });
};

$("#nav_bar nav a")
    .not(".no-smoothState")
    .off("click")
    .on("click", function(e) {
        e.preventDefault();
        let content = $("#pages")
            .smoothState()
            .data("smoothState");
        var href = $(this).attr("href");
        console.log("smooth-State activated");
        content.load(href);
    });

$(function() {
    let options = {
            onPopState: function(e) {
                if (e.state !== null || typeof e.state !== undefined) {
                    var url = window.location.href;
                    var $page = $("#" + e.state.id);
                    var page = $page.data("smoothState");

                    if (typeof page.cache[page.href] !== "undefined") {
                        var diffUrl =
                            page.href !== url &&
                            !utility.isHash(url, page.href);
                        var diffState = e.state !== page.cache[page.href].state;

                        if (diffUrl || diffState) {
                            if (diffState) {
                                page.clear(page.href);
                            }
                            page.load(url, false);
                        }
                    } else {
                        //reload the page if page.cache[page.href] is undefined
                        location.reload();
                    }
                }
            },
            prefetch: false,
            anchors: "a.smoothState",
            forms: "form.smoothState",
            cacheLength: 0,
            onStart: {
                duration: 450, // Duration of our animation
                render: function($container) {
                    // Add your CSS animation reversing class
                    $container.removeClass("pt-page-rotateSlideIn");

                    $container.addClass("pt-page-rotateSlideOut");
                    // Restart your animation
                    smoothState.restartCSSAnimations();
                    setTimeout(() => {
                        $loader.removeClass("_loaded");
                    }, 200);
                }
            },

            onReady: {
                duration: 450,
                render: function($container, $newContent) {
                    // Remove your CSS animation reversing class
                    $container.removeClass("pt-page-rotateSlideOut");
                    $container
                        .addClass("pt-page-rotateSlideIn")
                        .html($newContent);

                    // Inject the new content
                }
            },
            onAfter: function() {
                $loader.addClass("_loaded");
                //$(document).ready();
                UTIL.init();
            }
        },
        smoothState = $("#pages")
            .smoothState(options)
            .data("smoothState");
});
UTIL.init();

var cursor = $(".your-cursor");

var posX = 0,
    posY = 0;
var mouseX = 0,
    mouseY = 0;

TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        });
    }
});

$(document).on("mousemove", function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

$("a").on("mouseenter", function() {
    cursor.addClass("active");
});
$("a").on("mouseleave", function() {
    cursor.removeClass("active");
});

$(document).ready(function() {
    $(".loading-bg").addClass("_loaded");
});
