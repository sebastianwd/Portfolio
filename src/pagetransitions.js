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
