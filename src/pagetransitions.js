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
        }, 500);

        setTimeout(() => {
            var $this2 = reset($(".pt-page-2"));
            $this2.addClass("pt-page-rotateSlideIn pt-page-current");
        }, 500);
    });

var colors = new Array(
    [37, 38, 39],
    [45, 55, 60],
    [30, 30, 30],
    [45, 48, 80],
    [55, 55, 52]
);

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1, 2, 3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient() {
    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $("#gradient")
        .css({
            background:
                "-webkit-gradient(linear, left top, right top, from(" +
                color1 +
                "), to(" +
                color2 +
                "))"
        })
        .css({
            background:
                "-moz-linear-gradient(left, " +
                color1 +
                " 0%, " +
                color2 +
                " 100%)"
        });

    step += gradientSpeed;
    if (step >= 1) {
        step %= 1;
        colorIndices[0] = colorIndices[1];
        colorIndices[2] = colorIndices[3];

        //pick two new target color indices
        //do not pick the same as the current one
        colorIndices[1] =
            (colorIndices[1] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
        colorIndices[3] =
            (colorIndices[3] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
            colors.length;
    }
}

setInterval(updateGradient, 10);
