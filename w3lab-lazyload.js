;
(function(e) {
    e.fn.visible = function(t, n, r) {
        var i = e(this).eq(0),
            s = i.get(0),
            o = e(window),
            u = o.scrollTop(),
            a = u + o.height(),
            f = o.scrollLeft(),
            l = f + o.width(),
            c = i.offset().top,
            h = c + i.height(),
            p = i.offset().left,
            d = p + i.width(),
            v = t === true ? h : c,
            m = t === true ? c : h,
            g = t === true ? d : p,
            y = t === true ? p : d,
            b = n === true ? s.offsetWidth * s.offsetHeight : true,
            r = r ? r : "both";
        if (r === "both") return !!b && m <= a && v >= u && y <= l && g >= f;
        else if (r === "vertical") return !!b && m <= a && v >= u;
        else if (r === "horizontal") return !!b && y <= l && g >= f
    }
})(jQuery);

function w3lab_lazyload_load_this_img() {
    if (jQuery(this).visible(true)) {
        var src = this.getAttribute("data-lazy-src");
        this.src = src;
        var srcset = this.getAttribute("data-lazy-srcset");
        if (srcset) {
            this.setAttribute("srcset", srcset);
        }
        this.setAttribute("data-lazy", "load");
    }
}

function w3lab_lazyload_lazy_load() {
    jQuery("img[data-lazy=set]:visible").each(w3lab_lazyload_load_this_img);
}
var w3lab_lazyload_lazy_loop = setInterval(function() {
    w3lab_lazyload_lazy_load();
}, 500);
jQuery(window).scroll(function() {
    w3lab_lazyload_lazy_load();
});