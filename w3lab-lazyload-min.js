function w3lab_lazyload_load_this_img(){if(jQuery(this).visible(!0)){var t=this.getAttribute("data-lazy-src");this.src=t;var a=this.getAttribute("data-lazy-srcset");a&&this.setAttribute("srcset",a),this.setAttribute("data-lazy","load")}}function w3lab_lazyload_lazy_load(){jQuery("img[data-lazy=set]:visible").each(w3lab_lazyload_load_this_img)}!function(t){t.fn.visible=function(a,l,i){var o=t(this).eq(0),e=o.get(0),s=t(window),r=s.scrollTop(),d=r+s.height(),h=s.scrollLeft(),_=h+s.width(),f=o.offset().top,n=f+o.height(),y=o.offset().left,b=y+o.width(),c=!0===a?n:f,u=!0===a?f:n,z=!0===a?b:y,w=!0===a?y:b,v=!0!==l||e.offsetWidth*e.offsetHeight;return"both"===(i=i||"both")?!!v&&u<=d&&c>=r&&w<=_&&z>=h:"vertical"===i?!!v&&u<=d&&c>=r:"horizontal"===i?!!v&&w<=_&&z>=h:void 0}}(jQuery);var w3lab_lazyload_lazy_loop=setInterval(function(){w3lab_lazyload_lazy_load()},500);jQuery(window).scroll(function(){w3lab_lazyload_lazy_load()});