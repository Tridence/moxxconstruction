/* --------------------------------------------------
 * © Copyright 2019 - BuildPro by Designesia
 * --------------------------------------------------*/
(function($) {
	/* --------------------------------------------------
	 * template options (customable)
	 * --------------------------------------------------*/
	var de_header_style = 2; // 1 - solid, 2 - transparent
	var de_header_layout = 2; // 1 - default, 2 - extended
	var de_menu_separator = 0; // 1 - dotted, 2 - border, 3 - circle, 4 - square, 5 - plus, 6 - strip, 0 - none
	var de_header_color = 1; // 1 - dark, - 2 light
	var de_header_scroll_color = 1; // 1 - dark, - 2 light
	
	
	/* --------------------------------------------------
	 * predefined vars
	 * --------------------------------------------------*/
	var mobile_menu_show = 0;
	var v_count = '0';
	var mb;
	var instances = [];
	var $window = $(window);

	/* --------------------------------------------------
	 * header | style
	 * --------------------------------------------------*/
	function header_styles() {
		if (de_header_style == 2) {
			$('header').addClass('transparent')
		}else{
			$('header').addClass('header-solid')
		}
		if (de_menu_separator == 2) {
			$('#mainmenu').addClass('line-separator');
		} else if (de_menu_separator == 3) {
			$('#mainmenu').addClass('circle-separator');
		} else if (de_menu_separator == 4) {
			$('#mainmenu').addClass('square-separator');
		} else if (de_menu_separator == 5) {
			$('#mainmenu').addClass('plus-separator');
		} else if (de_menu_separator == 6) {
			$('#mainmenu').addClass('strip-separator');
		} else if (de_menu_separator == 0) {
			$('#mainmenu').addClass('no-separator');
		}
		if (de_header_layout == 2) {
			$('header').addClass('de_header_2');
			$('header .info').show();
		}
		if (de_header_color == 2) {
			$('header').addClass('header-light');
		}
		if (de_header_scroll_color == 2) {
			$('header').addClass('scroll-light')
		};
		
		if($('header').hasClass('de_header_2') && $('header').hasClass('header-solid')){
			$('body').css('margin-top','125px');
		}
	}
	/* --------------------------------------------------
	 * header | sticky
	 * --------------------------------------------------*/
	function header_sticky() {
		jQuery("header").addClass("clone", 1000, "easeOutBounce");
		var $document = $(document);
		var vscroll = 0;
		if ($document.scrollTop() >= 50 && vscroll == 0) {
			jQuery("header.autoshow").removeClass("scrollOff");
			jQuery("header.autoshow").addClass("scrollOn");
			jQuery("header.autoshow").css("height", "auto");
			vscroll = 1;
		} else {
			jQuery("header.autoshow").removeClass("scrollOn");
			jQuery("header.autoshow").addClass("scrollOff");
			vscroll = 0;
		}
	}
	
	/* --------------------------------------------------
	 * preloader
	 * --------------------------------------------------*/
	//calling jPreLoader function with properties
    jQuery('body').jpreLoader({
        splashID: "#jSplash",
        splashFunction: function () {  //passing Splash Screen script to jPreLoader
            jQuery('#jSplash').children('section').not('.selected').hide();
            jQuery('#jSplash').hide().fadeIn(800);
            init_de();
            var timer = setInterval(function () {
                splashRotator();
            }, 1500);
        }
    }, function () {	//jPreLoader callback function
        clearInterval();

        jQuery(function () {
            var v_url = document.URL;

            if (v_url.indexOf('#') != -1) {
                var v_hash = v_url.substring(v_url.indexOf("#") + 1);


                jQuery('html, body').animate({
                    scrollTop: jQuery('#' + v_hash).offset().top - 70
                }, 200);
                return false;
            }
        });


    });

    // End of jPreLoader script

    function splashRotator() {
        var cur = jQuery('#jSplash').children('.selected');
        var next = jQuery(cur).next();

        if (jQuery(next).length != 0) {
            jQuery(next).addClass('selected');
        } else {
            jQuery('#jSplash').children('section:first-child').addClass('selected');
            next = jQuery('#jSplash').children('section:first-child');
        }

        jQuery(cur).removeClass('selected').fadeOut(100, function () {
            jQuery(next).fadeIn(100);
        });
    }
	
	/* --------------------------------------------------
	 * plugin | magnificPopup
	 * --------------------------------------------------*/
	function load_magnificPopup() {
		jQuery('.simple-ajax-popup-align-top').magnificPopup({
			type: 'ajax',
			alignTop: true,
			overflowY: 'scroll'
		});
		jQuery('.simple-ajax-popup').magnificPopup({
			type: 'ajax'
		});
		// zoom gallery
		jQuery('.zoom-gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title');
					//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
				opener: function(element) {
					return element.find('img');
				}
			}
		});
		// popup youtube, video, gmaps
		jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
		// image popup
		$('.image-popup').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-img-mobile',
			image: {
				verticalFit: true
			}
		});
		$('.image-popup-vertical-fit').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			mainClass: 'mfp-img-mobile',
			image: {
				verticalFit: true
			}
		});
		$('.image-popup-fit-width').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			image: {
				verticalFit: false
			}
		});
		$('.image-popup-no-margins').magnificPopup({
			type: 'image',
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
			image: {
				verticalFit: true
			},
			zoom: {
				enabled: true,
				duration: 300 // don't foget to change the duration also in CSS
			}
		});
		$('.image-popup-gallery').magnificPopup({
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true,
				titleSrc: function(item) {
					return item.el.attr('title');
					//return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
				}
			},
			gallery: {
				enabled: true
			}
		});
	}
	/* --------------------------------------------------
	 * plugin | enquire.js
	 * --------------------------------------------------*/
	function init_resize() {
		enquire.register("screen and (min-width: 993px)", {
			match: function() {
				jQuery('#mainmenu').show();
				mobile_menu_show = 1;
			},
			unmatch: function() {
				jQuery('#mainmenu').hide();
				mobile_menu_show = 0;
				jQuery("#menu-btn").show();
			}
		});
		enquire.register("screen and (max-width: 993px)", {
			match: function() {
				$('header').addClass("header-mobile");
				$('body').css('margin-top','0');
			},
			unmatch: function() {
				$('header').removeClass("header-mobile");
				header_styles();
			}
		});
		init();
		init_de();
		video_autosize();
		var $container = jQuery('#gallery');
		$container.isotope({
			itemSelector: '.item',
			filter: '*'
		});
		jQuery('#gallery').isotope('reLayout');
		$('header').removeClass('smaller');
		$('header').removeClass('logo-smaller');
		$('header').removeClass('clone');
	};
	/* --------------------------------------------------
	 * plugin | owl carousel
	 * --------------------------------------------------*/
	function load_owl() {
		jQuery("#gallery-carousel").owlCarousel({
			items: 4,
			navigation: false,
			pagination: false
		});
		jQuery(".carousel-gallery").owlCarousel({
			items: 4,
			navigation: false,
			pagination: false
		});
		jQuery("#gallery-carousel-4").owlCarousel({
			items: 4,
			navigation: false,
			pagination: false
		});
		jQuery("#blog-carousel").owlCarousel({
			items: 3,
			navigation: false,
			pagination: true
		});
		jQuery("#testimonial-carousel").owlCarousel({
			items: 2,
			itemsDesktop: [1199, 2],
			itemsDesktopSmall: [980, 2],
			itemsTablet: [768, 1],
			itemsTabletSmall: false,
			itemsMobile: [479, 1],
			navigation: false,
		});
		jQuery("#logo-carousel").owlCarousel({
			items: 6,
			navigation: false,
			pagination: false,
			autoPlay: true
		});
		jQuery("#contact-carousel").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: true
		});
		jQuery(".text-slider").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			mouseDrag: false,
			touchDrag: false,
			autoPlay: 2500,
			transitionStyle: "goDown"
		});
		jQuery(".blog-slide").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: false
		});
		jQuery(".project-slide").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: false,
			autoPlay: false,
			mouseDrag: false,
			touchDrag: true,
			transitionStyle: "fade"
		});
		jQuery(".testimonial-list").owlCarousel({
			items: 1,
			singleItem: true,
			navigation: false,
			pagination: true,
			autoPlay: false
		});
		// Custom Navigation owlCarousel
		$(".next").on("click", function() {
			$(this).parent().parent().find('.blog-slide').trigger('owl.next');
		});
		$(".prev").on("click", function() {
			$(this).parent().parent().find('.blog-slide').trigger('owl.prev');
		});
		
		jQuery('.owl-custom-nav').each(function() {
			var owl = $('.owl-custom-nav').next();
			var ow = parseInt(owl.css("height"), 10);
			$(this).css("margin-top", (ow / 2) - 25);
			owl.owlCarousel();
			// Custom Navigation Events
			$(".btn-next").on("click", function() {
				owl.trigger('owl.next');
			});
			$(".btn-prev").on("click", function() {
				owl.trigger('owl.prev');
			});
		});
	}
	/* --------------------------------------------------
	 * plugin | isotope
	 * --------------------------------------------------*/
	function filter_gallery() {
		var $container = jQuery('#gallery');
		$container.isotope({
			itemSelector: '.item',
			filter: '*'
		});
		jQuery('#filters a').on("click", function() {
			var $this = jQuery(this);
			if ($this.hasClass('selected')) {
				return false;
			}
			var $optionSet = $this.parents();
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
			var selector = jQuery(this).attr('data-filter');
			$container.isotope({
				filter: selector
			});
			return false;
		});
	}
	/* --------------------------------------------------
	 * plugin | fitvids
	 * --------------------------------------------------*/
	/*!
	* FitVids 1.0
	*
	* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
	* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
	* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
	*
	* Date: Thu Sept 01 18:00:00 2011 -0500
	*/
	!function(a){a.fn.fitVids=function(b){var c={customSelector:null},d=document.createElement("div"),e=document.getElementsByTagName("base")[0]||document.getElementsByTagName("script")[0];return d.className="fit-vids-style",d.innerHTML="&shy;<style> .fluid-width-video-wrapper { width: 100%; position: relative; padding: 0; } .fluid-width-video-wrapper iframe, .fluid-width-video-wrapper object, .fluid-width-video-wrapper embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>",e.parentNode.insertBefore(d,e),b&&a.extend(c,b),this.each(function(){var b=["iframe[src*='player.vimeo.com']","iframe[src*='www.youtube.com']","iframe[src*='www.kickstarter.com']","object","embed"];c.customSelector&&b.push(c.customSelector);var d=a(this).find(b.join(","));d.each(function(){var b=a(this);if(!("embed"==this.tagName.toLowerCase()&&b.parent("object").length||b.parent(".fluid-width-video-wrapper").length)){var c="object"==this.tagName.toLowerCase()||b.attr("height")?b.attr("height"):b.height(),d=b.attr("width")?b.attr("width"):b.width(),e=c/d;if(!b.attr("id")){var f="fitvid"+Math.floor(999999*Math.random());b.attr("id",f)}b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*e+"%"),b.removeAttr("height").removeAttr("width")}})})}}(jQuery);
	/* --------------------------------------------------
	 * back to top
	 * --------------------------------------------------*/
	var scrollTrigger = 500; // px
	function backToTop() {
		var scrollTop = $(window).scrollTop();
		if (scrollTop > scrollTrigger) {
			$('#back-to-top').addClass('show');
		} else {
			$('#back-to-top').removeClass('show');
		}
		$('#back-to-top').on('click', function(e) {
			e.preventDefault();
			$('html,body').stop(true).animate({
				scrollTop: 0
			}, 700);
		});
	};
	/* --------------------------------------------------
	 * plugin | scroll to
	 * --------------------------------------------------*/
	/*!
	 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
	 * Scroll smooth to any element in your DOM.
	 *
	 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
	 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
	 * 2013/02/17
	 **/
	$.scrollTo = $.fn.scrollTo = function(x, y, options){
		if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

		options = $.extend({}, {
			gap: {
				x: 0,
				y: 0
			},
			animation: {
				easing: 'easeInOutExpo',
				duration: 600,
				complete: $.noop,
				step: $.noop
			}
		}, options);

		return this.each(function(){
			var elem = $(this);
			elem.stop().animate({
				scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
				scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y - 69 // *edited
			}, options.animation);
		});
	};
	/* --------------------------------------------------
	 * counting number
	 * --------------------------------------------------*/
	function de_counter() {
		jQuery('.timer').each(function() {
			var imagePos = jQuery(this).offset().top;
			var topOfWindow = jQuery(window).scrollTop();
			if (imagePos < topOfWindow + jQuery(window).height() && v_count == '0') {
				jQuery(function($) {
					// start all the timers
					jQuery('.timer').each(count);

					function count(options) {
						v_count = '1';
						var $this = jQuery(this);
						options = $.extend({}, options || {}, $this.data('countToOptions') || {});
						$this.countTo(options);
					}
				});
			}
		});
	}
	/* --------------------------------------------------
	 * progress bar
	 * --------------------------------------------------*/
	function de_progress() {
		jQuery('.de-progress').each(function() {
			var pos_y = jQuery(this).offset().top;
			var value = jQuery(this).find(".progress-bar").attr('data-value');
			var topOfWindow = jQuery(window).scrollTop();
			if (pos_y < topOfWindow + 500) {
				jQuery(this).find(".progress-bar").css({
					'width': value
				}, "slow");
			}
		});
	}
	/* --------------------------------------------------
	 * progress bar
	 * --------------------------------------------------*/

	text_rotate = function(){
    var quotes = $(".text-rotate-wrap .text-item");
    var quoteIndex = -1;
    
    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(1)
            .delay(1500)
            .fadeOut(1, showNextQuote);
    }
    
    showNextQuote();
    
	};
	/* --------------------------------------------------
	 * custom background
	 * --------------------------------------------------*/
	function custom_bg() {
		$("div,section").css('background-color', function() {
			return jQuery(this).data('bgcolor');
		});
		$("div,section").css('background-image', function() {
			return jQuery(this).data('bgimage');
		});
		$("div,section").css('background-size', function() {
			return 'cover';
		});
	}
	/* --------------------------------------------------
	 * custom elements
	 * --------------------------------------------------*/
	function custom_elements() {
		// --------------------------------------------------
		// tabs
		// --------------------------------------------------
		jQuery('.de_tab').find('.de_tab_content > div').hide();
		jQuery('.de_tab').find('.de_tab_content > div:first').show();
		jQuery('li').find('.v-border').fadeTo(150, 0);
		jQuery('li.active').find('.v-border').fadeTo(150, 1);
		jQuery('.de_nav li').on("click", function() {
			jQuery(this).parent().find('li').removeClass("active");
			jQuery(this).addClass("active");
			jQuery(this).parent().parent().find('.v-border').fadeTo(150, 0);
			jQuery(this).parent().parent().find('.de_tab_content > div').hide();
			var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
			jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').fadeIn(); //uses whatever index the link has to open the corresponding box 
			jQuery(this).find('.v-border').fadeTo(150, 1);
		});
		// request quote function
		var rq_step = 1;
		jQuery('#request_form .btn-right').on("click", function() {
			var rq_name = $('#rq_name').val();
			var rq_email = $('#rq_email').val();
			var rq_phone = $('#rq_phone').val();
			if (rq_step == 1) {
				if (rq_name.length == 0) {
					$('#rq_name').addClass("error_input");
				} else {
					$('#rq_name').removeClass("error_input");
				}
				if (rq_email.length == 0) {
					$('#rq_email').addClass("error_input");
				} else {
					$('#rq_email').removeClass("error_input");
				}
				if (rq_phone.length == 0) {
					$('#rq_phone').addClass("error_input");
				} else {
					$('#rq_phone').removeClass("error_input");
				}
			}
			if (rq_name.length != 0 && rq_email.length != 0 && rq_phone.length != 0) {
				jQuery("#rq_step_1").hide();
				jQuery("#rq_step_2").fadeIn();
			}
		});
		// --------------------------------------------------
		// tabs
		// --------------------------------------------------
		jQuery('.de_review').find('.de_tab_content > div').hide();
		jQuery('.de_review').find('.de_tab_content > div:first').show();
		//jQuery('.de_review').find('.de_nav li').fadeTo(150,.5);
		jQuery('.de_review').find('.de_nav li:first').fadeTo(150, 1);
		jQuery('.de_nav li').on("click", function() {
			jQuery(this).parent().find('li').removeClass("active");
			//jQuery(this).parent().find('li').fadeTo(150,.5);
			jQuery(this).addClass("active");
			jQuery(this).fadeTo(150, 1);
			jQuery(this).parent().parent().find('.de_tab_content > div').hide();
			var indexer = jQuery(this).index(); //gets the current index of (this) which is #nav li
			jQuery(this).parent().parent().find('.de_tab_content > div:eq(' + indexer + ')').show(); //uses whatever index the link has to open the corresponding box 
		});
		// --------------------------------------------------
		// toggle
		// --------------------------------------------------
		jQuery(".toggle-list h2").addClass("acc_active");
		jQuery(".toggle-list h2").toggle(function() {
			jQuery(this).addClass("acc_noactive");
			jQuery(this).next(".ac-content").slideToggle(200);
		}, function() {
			jQuery(this).removeClass("acc_noactive").addClass("acc_active");
			jQuery(this).next(".ac-content").slideToggle(200);
		})
	}
	/* --------------------------------------------------
	 * video autosize
	 * --------------------------------------------------*/
	function video_autosize() {
		jQuery('.de-video-container').each(function() {
			var height_1 = jQuery(this).css("height");
			var height_2 = jQuery(this).find(".de-video-content").css("height");
			var newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
			jQuery(this).find('.de-video-overlay').css("height", height_1);
			jQuery(this).find(".de-video-content").animate({
				'margin-top': newheight
			}, 'fast');
		});
	}
	/* --------------------------------------------------
	 * center x and y
	 * --------------------------------------------------*/
	function center_xy() {
		jQuery('.center-xy').each(function() {
			jQuery(this).parent().find("img").on('load', function() {
				var w = parseInt(jQuery(this).parent().find(".center-xy").css("width"), 10);
				var h = parseInt(jQuery(this).parent().find(".center-xy").css("height"), 10);
				var pic_w = jQuery(this).css("width");
				var pic_h = jQuery(this).css("height");
				jQuery(this).parent().find(".center-xy").css("left", parseInt(pic_w, 10) / 2 - w / 2);
				jQuery(this).parent().find(".center-xy").css("top", parseInt(pic_h, 10) / 2 - h / 2);
				jQuery(this).parent().find(".bg-overlay").css("width", pic_w);
				jQuery(this).parent().find(".bg-overlay").css("height", pic_h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
	}
	/* --------------------------------------------------
	 * add arrow for mobile menu
	 * --------------------------------------------------*/
	function menu_arrow() {
		// mainmenu create span
		jQuery('#mainmenu li a').each(function() {
			if ($(this).next("ul").length > 0) {
				$("<span></span>").insertAfter($(this));
			}
		});
		// mainmenu arrow click
		jQuery("#mainmenu > li > span").on("click", function() {
			$('header').css("height", "auto");
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					$(this).addClass("active");
					$(this).parent().find("ul:first").css("height", "auto");
					var curHeight = $(this).parent().find("ul:first").height();
					$(this).parent().find("ul:first").css("height", "0");
					$(this).parent().find("ul:first").animate({
						'height': curHeight
					}, 400, 'easeInOutQuint');
					break;
				case 2:
					$(this).removeClass("active");
					$(this).parent().find("ul:first").animate({
						'height': "0"
					}, 400, 'easeInOutQuint');
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
		jQuery("#mainmenu > li > ul > li > span").on("click", function() {
			var iteration = $(this).data('iteration') || 1;
			switch (iteration) {
				case 1:
					$(this).addClass("active");
					$(this).parent().find("ul:first").css("height", "auto");
					$(this).parent().parent().parent().find("ul:first").css("height", "auto");
					var curHeight = $(this).parent().find("ul:first").height();
					$(this).parent().find("ul:first").css("height", "0");
					$(this).parent().find("ul:first").animate({
						'height': curHeight
					}, 400, 'easeInOutQuint');
					break;
				case 2:
					$(this).removeClass("active");
					$(this).parent().find("ul:first").animate({
						'height': "0"
					}, 400, 'easeInOutQuint');
					break;
			}
			iteration++;
			if (iteration > 2) iteration = 1;
			$(this).data('iteration', iteration);
		});
	}
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	sequence = function(){
		var sq = jQuery(".sequence > .sq-item .picframe");
		var count = sq.length;
		sq.addClass("slideInUp");
		for (var i = 0; i <= count; i++) {
		  sqx = jQuery(".sequence > .sq-item:eq("+i+") .picframe");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	/* --------------------------------------------------
	 * show gallery item sequence
	 * --------------------------------------------------*/
	sequence_a = function(){
		var sq = jQuery(".sequence > .sq-item");
		var count = sq.length;
		sq.addClass("slideInUp");
		for (var i = 0; i <= count; i++) {
		  sqx = jQuery(".sequence > .sq-item:eq("+i+")");
		  sqx.attr('data-wow-delay',(i/8)+'s');
		}		
	}
	/* --------------------------------------------------
	 * custom scroll
	 * --------------------------------------------------*/
	$.fn.moveIt = function(){	  
	  $(this).each(function(){
		instances.push(new moveItItem($(this)));
	  });
	}
	moveItItemNow = function(){
	var scrollTop = $window.scrollTop();
		instances.forEach(function(inst){
		  inst.update(scrollTop);
		});
	}
	var moveItItem = function(el){
	  this.el = $(el);
	  this.speed = parseInt(this.el.attr('data-scroll-speed'));
	};
	moveItItem.prototype.update = function(scrollTop){
	  var pos = scrollTop / this.speed;
	  this.el.css('transform', 'translateY(' + pos + 'px)');
	};
	$(function(){
	  $('[data-scroll-speed]').moveIt();
	});
	/* --------------------------------------------------
	 * multiple function
	 * --------------------------------------------------*/
	function init() {
		var sh = jQuery('#de-sidebar').css("height");
		var dh = jQuery(window).innerHeight();
		var h = parseInt(sh) - parseInt(dh);

		function scrolling() {
			var mq = window.matchMedia("(min-width: 993px)");
			var ms = window.matchMedia("(min-width: 768px)");
			var mt = window.matchMedia("(max-width: 992px)");
			
			if (mq.matches) {
				var distanceY = window.pageYOffset || document.documentElement.scrollTop,
					shrinkOn = 55,
					header = jQuery("header");
				if (distanceY > shrinkOn) {
					if(!jQuery('body').hasClass('side-layout')){
						header.addClass("smaller");
					}
				} else {
					if (header.hasClass('smaller')) {
						header.removeClass('smaller');
					}
				}
				
				if (jQuery("body").hasClass("side-content")) {
					jQuery("body").addClass("side-layout");
				}
			}
			if (mq.matches) {
				if (jQuery("header").hasClass("side-header")) {
					if (jQuery(document).scrollTop() >= h) {
						jQuery('#de-sidebar').css("position", "fixed");
						if (parseInt(sh) > parseInt(dh)) {
							jQuery('#de-sidebar').css("top", -h);
						}
						jQuery('#main').addClass("col-md-offset-3");
						jQuery('h1#logo img').css("padding-left", "7px");
						jQuery('header .h-content').css("padding-left", "7px");
						jQuery('#mainmenu li').css("width", "103%");
					} else {
						jQuery('#de-sidebar').css("position", "relative");
						if (parseInt(sh) > parseInt(dh)) {
							jQuery('#de-sidebar').css("top", 0);
						}
						jQuery('#main').removeClass("col-md-offset-3");
						jQuery('h1#logo img').css("padding-left", "0px");
						jQuery('header .h-content').css("padding-left", "0px");
						jQuery('#mainmenu li').css("width", "100%");
					}
				}
			}
			if (mt.matches) {
				if (jQuery("body").hasClass("side-content")) {
					jQuery("body").removeClass("side-layout");
				}
			}
		}
		scrolling();
	}
	/* --------------------------------------------------
	 * multiple function
	 * --------------------------------------------------*/
	function init_de() {
		jQuery('.de-team-list').each(function() {
			jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
				var h = jQuery(this).css("height");
				//nh = (h.substring(0, h.length - 2)/2)-48;
				jQuery(this).parent().parent().find(".team-pic").css("height", h);
				jQuery(this).parent().parent().find(".team-desc").css("width", w);
				jQuery(this).parent().parent().find(".team-desc").css("height", h);
				jQuery(this).parent().parent().find(".team-desc").css("top", h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
		jQuery(".de-team-list").on("mouseenter", function() {
				var h;
				h = jQuery(this).find("img").css("height");
				jQuery(this).find(".team-desc").stop(true).animate({
					'top': "0px"
				}, 350, 'easeOutQuad');
				jQuery(this).find("img").stop(true).animate({
					'margin-top': "-100px"
				}, 400, 'easeOutQuad');
			}).on("mouseleave", function() {
				var h;
				h = jQuery(this).find("img").css("height");
				jQuery(this).find(".team-desc").stop(true).animate({
					'top': h
				}, 350, 'easeOutQuad');
				jQuery(this).find("img").stop(true).animate({
					'margin-top': "0px"
				}, 400, 'easeOutQuad');
			})
			// portfolio
		jQuery('.item .picframe').each(function() {
			jQuery(this).find("img").css("width", "100%");
			jQuery(this).find("img").css("height", "auto");
			jQuery(this).find("img").on('load', function() {
				var w = jQuery(this).css("width");
				var h = jQuery(this).css("height");
				//nh = (h.substring(0, h.length - 2)/2)-48;
				jQuery(this).parent().css("height", h);
			}).each(function() {
				if (this.complete) $(this).load();
			});
		});
		// --------------------------------------------------
		// portfolio hover
		// --------------------------------------------------
		jQuery('.overlay').fadeTo(1, 0);
		// gallery hover
		jQuery(".item .picframe").on("mouseenter", function() {
			jQuery(this).parent().find(".overlay").width(jQuery(this).find("img").css("width"));
			jQuery(this).parent().find(".overlay").height(jQuery(this).find("img").css("height"));
			jQuery(this).parent().find(".overlay").stop(true).fadeTo(200, .9);
			var picheight = jQuery(this).find("img").css("height");
			var newheight;
			newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
			//alert(newheight);
			//jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight},200,'easeOutCubic');
			jQuery(this).parent().find(".pf_text").css('margin-top', newheight);
			jQuery(this).parent().find(".pf_text").stop(true).animate({
				'opacity': '1'
			}, 1000, 'easeOutCubic');
			var w = jQuery(this).find("img").css("width");
			var h = jQuery(this).find("img").css("height");
			var w = parseInt(w, 10);
			var h = parseInt(h, 10);
			var $scale = 1.1;
			//alert(w);
			jQuery(this).find("img").stop(true).animate({
				width: w * $scale,
				height: h * $scale,
				'margin-left': -w * ($scale - 1) / 2,
				'margin-top': -h * ($scale - 1) / 2
			}, 400, 'easeOutCubic');
		}).on("mouseleave", function() {
			var newheight;
			var picheight = jQuery(this).find("img").css("height");
			newheight = (picheight.substring(0, picheight.length - 2) / 2) - 10;
			//jQuery(this).parent().find(".pf_text").stop(true).animate({'margin-top': newheight - 30},200,'easeOutCubic');
			jQuery(this).parent().find(".pf_text").stop(true).animate({
				'opacity': '0'
			}, 400, 'easeOutCubic');
			jQuery(this).parent().find(".overlay").stop(true).fadeTo(200, 0);
			jQuery(this).find("img").stop(true).animate({
				width: '100%',
				height: '100%',
				'margin-left': 0,
				'margin-top': 0
			}, 400, 'easeOutQuad');
		})
		jQuery('.overlay').fadeTo(1, 0);
		$.stellar('refresh');
	}
	// --------------------------------------------------
	// active menu
	// --------------------------------------------------
	active_menu = function(){
		if ($('body').hasClass('one-page')) {
		jQuery('#mainmenu li a').each(function () {
                if (this.href.indexOf('#') != -1) {
                    var href = jQuery(this).attr('href');
                    if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
                        jQuery('nav li a').removeClass('active');
                        jQuery(this).addClass('active');
                    }
                }
            });	
		}			
	}
	// --------------------------------------------------
	// custom dropdown
	// --------------------------------------------------	
	dropdown = function(e){
		var obj = $(e+'.dropdown');
		var btn = obj.find('.btn-selector');
		var dd = obj.find('ul');
		var opt = dd.find('li');
		
			obj.on("mouseenter", function() {
				dd.show();
			}).on("mouseleave", function() {
				dd.hide();
			})
			
			opt.on("click", function() {
				dd.hide();
				var txt = $(this).text();
				opt.removeClass("active");
				$(this).addClass("active");
				btn.text(txt);
			});
	}
	/* --------------------------------------------------
	 * document ready
	 * --------------------------------------------------*/
	jQuery(document).ready(function() {
		'use strict';
		$("body").show();
		$('body').addClass('de_light');
		new WOW().init();
		header_styles();
		load_magnificPopup();
		center_xy();
		init_de();
		init_resize();
		active_menu();
		dropdown('#lang-selector');
		// --------------------------------------------------
		// custom positiion
		// --------------------------------------------------
		var $doc_height = jQuery(window).innerHeight();
		jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
		jQuery('.full-height').css("height", $doc_height);
		var picheight = jQuery('.center-y').css("height");
		picheight = parseInt(picheight, 10);
		jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2) - 90);
		jQuery('.full-height .de-video-container').css("height", $doc_height);
		// --------------------------------------------------
		// blog list hover
		// --------------------------------------------------
		jQuery(".blog-list").on("mouseenter", function() {
				var v_height = jQuery(this).find(".blog-slide").css("height");
				var v_width = jQuery(this).find(".blog-slide").css("width");
				var newheight = (v_height.substring(0, v_height.length - 2) / 2) - 40;
				jQuery(this).find(".owl-arrow").css("margin-top", newheight);
				jQuery(this).find(".owl-arrow").css("width", v_width);
				jQuery(this).find(".owl-arrow").fadeTo(150, 1);
				//alert(v_height);
			}).on("mouseleave", function() {
				jQuery(this).find(".owl-arrow").fadeTo(150, 0);
			})
			//  logo carousel hover
		jQuery("#logo-carousel img").on("mouseenter", function() {
			jQuery(this).fadeTo(150, .5);
		}).on("mouseleave", function() {
			jQuery(this).fadeTo(150, 1);
		})
		if ($('#back-to-top').length) {
			backToTop();
		}
		jQuery(".nav-exit").on("click", function() {
			$.magnificPopup.close();
		});
		// --------------------------------------------------
		// navigation for mobile
		// --------------------------------------------------
		jQuery('#menu-btn').on("click", function() {
				if (mobile_menu_show == 0) {
					jQuery('#mainmenu').slideDown();
					mobile_menu_show = 1;
				} else {
					jQuery('#mainmenu').slideUp();
					mobile_menu_show = 0;
				}
			})
		jQuery("a.btn").on("click", function(evn) {
			if (this.href.indexOf('#') == 0) {
				evn.preventDefault();
				jQuery('html,body').scrollTo(this.hash, this.hash);
			}
		});
		jQuery('.de-gallery .item .icon-info').on("click", function() {
			jQuery('.page-overlay').show();
			url = jQuery(this).attr("data-value");
			jQuery("#loader-area .project-load").load(url, function() {
				jQuery("#loader-area").slideDown(500, function() {
					jQuery('.page-overlay').hide();
					jQuery('html, body').animate({
						scrollTop: jQuery('#loader-area').offset().top - 70
					}, 500, 'easeOutCubic');
					//
					jQuery(".image-slider").owlCarousel({
						items: 1,
						singleItem: true,
						navigation: false,
						pagination: true,
						autoPlay: false
					});
					jQuery(".container").fitVids();
					jQuery('#btn-close-x').on("click", function() {
						jQuery("#loader-area").slideUp(500, function() {
							jQuery('html, body').animate({
								scrollTop: jQuery('#section-portfolio').offset().top - 70
							}, 500, 'easeOutCirc');
						});
						return false;
					});
				});
			});
		});
		jQuery('.de-gallery .item').on("click", function() {
			$('#navigation').show();
		});
		// btn arrow up
		jQuery(".arrow-up").on("click", function() {
			jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
				jQuery("#hide-content").fadeIn(600, function() {
					jQuery('.arrow-up').animate({
						'bottom': '-40px'
					}, "slow");
					jQuery('.arrow-down').animate({
						'top': '0'
					}, "slow");
				});
			});
		});
		// btn arrow down
		jQuery(".arrow-down").on("click", function() {
			jQuery("#hide-content").fadeOut("slow", function() {
				jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
					jQuery('.arrow-up').animate({
						'bottom': '0px'
					}, "slow");
					jQuery('.arrow-down').animate({
						'top': '-40'
					}, "slow");
				});
			});
		});
		/* --------------------------------------------------
		 * window | on load
		 * --------------------------------------------------*/
		jQuery(window).load(function() {
			video_autosize();
			filter_gallery();
			custom_bg();
			menu_arrow();
			load_owl();
			custom_elements();
			init();
			// hide preloader after loaded
			jQuery('#preloader').delay(500).fadeOut(500);
			// one page navigation
			/**
			 * This part causes smooth scrolling using scrollto.js
			 * We target all a tags inside the nav, and apply the scrollto.js to it.
			 */
		jQuery("#homepage nav a, .scroll-to").on("click", function(evn) {
			if (this.href.indexOf('#') == 0) {
				evn.preventDefault();
				jQuery('html,body').scrollTo(this.hash, this.hash);
			}
		});
		sequence();
		sequence_a();
		
		// new added
		 var hash = window.location.hash;
		 jQuery('html,body').scrollTo(hash, hash);
		});
		/* --------------------------------------------------
		 * window | on resize
		 * --------------------------------------------------*/
		window.onresize = function(event) {
			init_resize();
		};
		/* --------------------------------------------------
		 * window | on scroll
		 * --------------------------------------------------*/
		jQuery(window).on("scroll", function() {
			/* functions */
			header_sticky();
			de_counter();
			de_progress();
			init();
			backToTop();
			moveItItemNow();
			active_menu();
			/* plugin | stellar */
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0
			});
			/* fade base scroll position */
			var target = $('.fadeScroll');
			var targetHeight = target.outerHeight();
			var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
			if (scrollPercent >= 0) {
				target.css('opacity', scrollPercent);
			}else{
				target.css('opacity', 0);
			}
			// custom page with background on side
			jQuery('.side-bg').each(function() {
				jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
			});
			/* go to anchor */
			jQuery('#homepage nav li a').each(function() {
				if (this.href.indexOf('#') != -1) {
					var href = jQuery(this).attr('href');
					if (typeof offset !== 'undefined') {
						if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
							jQuery('nav li a').removeClass('active');
							jQuery(this).addClass('active');
						}
					}
				}
			});
		});
	});
})(jQuery);