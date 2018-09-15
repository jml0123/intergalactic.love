
// Modified code 

(function() {
  var $ = jQuery,
    pauseId = 'jQuery.pause',
    uuid = 1,
    oldAnimate = $.fn.animate,
    anims = {};

  function now() { return new Date().getTime(); }

  $.fn.animate = function(prop, speed, easing, callback) {
    var optall = $.speed(speed, easing, callback);
    optall.complete = optall.old; // unwrap callback
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // start animation
      var opt = $.extend({}, optall);
      oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
      // store data
      anims[this[pauseId]] = {
        run: true,
        prop: prop,
        opt: opt,
        start: now(),
        done: 0
      };
    });
  };

  $.fn.pause = function() {
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && data.run) {
        data.done += now() - data.start;
        if (data.done > data.opt.duration) {
          // remove stale entry
          delete anims[this[pauseId]];
        } else {
          // pause animation
          $(this).stop();
          data.run = false;
        }
      }
    });
  };

  $.fn.resume = function() {
    return this.each(function() {
      // check pauseId
      if (! this[pauseId])
        this[pauseId] = uuid++;
      // fetch data
      var data = anims[this[pauseId]];
      if (data && ! data.run) {
        // resume animation
        data.opt.duration -= data.done;
        data.done = 0;
        data.run = true;
        data.start = now();
        oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
      }
    });
  };
})();


(function ($, window, undefined) {
  $.fn.marqueeify = function (options) {
    var settings = $.extend({
      horizontal: true,
      vertical: true,
      speed: 100, // In pixels per second
      container: $(this).parent(),
      bumpEdge: function () {}
    }, options);
    
    return this.each(function () {
      var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
        $el = $(this);

      getSizes = function () {
        containerWidth = settings.container.outerWidth();
        containerHeight = settings.container.outerHeight();
        elWidth = $el.outerWidth();
        elHeight = $el.outerHeight();
      };

      move = {
        right: function () {
          $el.animate({left: (containerWidth - elWidth)}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
            settings.bumpEdge();
            move.left(); // moves left when it hits right
          }});
        },
        
        left: function () {
          $el.animate({left: 0}, {duration: ((containerWidth/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
            settings.bumpEdge();
            move.right(); // moves right when it hits left
          }});
        },
        
        down: function () {
          $el.animate({top: (containerHeight - elHeight)}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
            settings.bumpEdge();
            move.up(); // moves up when it hits down
          }});
        },
        up: function () {
          $el.animate({top: 0}, {duration: ((containerHeight/settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
            settings.bumpEdge();
            move.down(); // moves down when it hits up
          }});
        }
      };

      getSizes();

      if (settings.horizontal) {
        move.right();
      }
      if (settings.vertical) {
        move.down();
      }

      // Make that shit responsive!
      $(window).resize( function() {
        getSizes();
      });
    });
  };
})(jQuery, window);




$(document).ready( function() {

//INITIALIZE MARQUEES

SPEEDFACTOR = 2 //Changes speed of shape
//crescent
$('.marquee1').marqueeify({
    speed: 40 * SPEEDFACTOR,
  });
//window
$('.marquee2').marqueeify({
    speed: 45 * SPEEDFACTOR,
  });
//skull
$('.marquee3').marqueeify({
    speed: 48,
    horizontal: false
  });
//triangle
$('.marquee4').marqueeify({
    speed: 44 * SPEEDFACTOR,
  });
//natural
$('.marquee5').marqueeify({
    speed: 50 * SPEEDFACTOR,
  });
//diamond
$('.marquee6').marqueeify({
    speed: 43 * SPEEDFACTOR, 
    horizontal: false
  });
//carving
$('.marquee7').marqueeify({
    speed: 50 * SPEEDFACTOR,
  });

//SPLASH PAGE & BIO
$(".mainsplash_main").mouseenter(function(){
        $(".bio").fadeIn(2000);
  }); 
$(".mainsplash_main").mouseleave(function(){
        $(".bio").stop();
        $(".bio").fadeOut(1);
  });


//PAUSE MARQUEE AND TEXT DESCRIPTION ON HOVER


$(".crescent").find("img").mouseenter(function(){
        $(".marquee1").pause();
        $(".name1").fadeIn(700);
  }); 
$(".crescent").find("img").mouseleave(function(){
        $(".marquee1").resume();
        $(".name1").fadeOut(50);
});
$(".window").find("img").mouseenter(function(){
        $(".marquee2").pause();
        $(".name2").fadeIn(700);
  }); 
$(".window").find("img").mouseleave(function(){
        $(".marquee2").resume();
        $(".name2").fadeOut(50);
});
$(".nuskull").find("img").mouseenter(function(){
        $(".marquee3").pause();
        $(".name3").fadeIn(700);
  }); 
$(".nuskull").find("img").mouseleave(function(){
        $(".marquee3").resume();
        $(".name3").fadeOut(50);
});
$(".triangle").find("img").mouseenter(function(){
        $(".marquee4").pause();
        $(".name4").fadeIn(700);
  }); 
$(".triangle").find("img").mouseleave(function(){
        $(".marquee4").resume();
        $(".name4").fadeOut(50);
});
$(".natural").find("img").mouseenter(function(){
        $(".marquee5").pause();
        $(".name5").fadeIn(700);
  }); 
$(".natural").find("img").mouseleave(function(){
        $(".marquee5").resume();
        $(".name5").fadeOut(50);
});
$(".diamond").find("img").mouseenter(function(){
        $(".marquee6").pause();
        $(".name6").fadeIn(700);
  }); 
$(".diamond").find("img").mouseleave(function(){
        $(".marquee6").resume();
        $(".name6").fadeOut(50);
});
$(".carving").find("img").mouseenter(function(){
        $(".marquee7").pause();
        $(".name7").fadeIn(700);
  }); 
$(".carving").find("img").mouseleave(function(){
        $(".marquee7").resume();
        $(".name7").fadeOut(50);
});


//DESCRIPTIONS/MATERIALS USED

$(".pieces").find("img").mouseenter(function(){
        $(".details").fadeIn(200);
});

$(".pieces").find("img").mouseleave(function(){
        $(".details").pause();
        $(".details").fadeOut(30);
});

$(".oddpiece").find("img").mouseenter(function(){
        $(".odddetails").fadeIn(200);
});

$(".oddpiece").find("img").mouseleave(function(){
        $(".odddetails").pause();
        $(".odddetails").fadeOut(30);
});

//INTERACTIVE/ENLARGE IMAGE ON CLICK

$(document).ready(function() {
  $(".pieces").find("img").click(
    function(){
    $(this).toggleClass("large");
    $(".details").fadeOut(30);


});

$(".oddpiece").find("img").click(
    function(){
    $(this).toggleClass("large");
    $(".odddetails").fadeOut(30);


});

$(document).ready(function(){

/*! Fades in page on load */
$('body').css('display', 'none');
$('body').fadeIn(250);

});


});



  base_image.src = baseImage;
  base_image.onload = function() {
      window.addEventListener("resize", reInit);
      init();
}});


