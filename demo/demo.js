// --------------------------------------------------
// switcher.js by designesia 2013
// --------------------------------------------------

jQuery(document).ready(function() {
	
	
	jQuery(".bg1").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/aqua.css");
	});
	
	jQuery(".bg2").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/blue.css");
	});
	
	jQuery(".bg3").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/green.css");
	});
	
	jQuery(".bg4").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/grey.css");
	});
	
	jQuery(".bg5").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/orange.css");
	});
	
	jQuery(".bg6").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/brown.css");
	});
	
	jQuery(".bg7").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/violet.css");
	});
	
	jQuery(".bg8").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/red.css");
	});
	
	jQuery(".bg9").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/yellow.css");
	});
	
	jQuery(".bg10").on("click", function() {
		jQuery("#colors").attr("href", "css/colors/lime.css");
	});
	
	
	
	jQuery(".custom-show").hide();
	
	jQuery(".custom-close").on("click", function() {
		jQuery(this).hide();
		jQuery(".custom-show").show();
		jQuery('#switcher').animate({'left': '+=120px'},'medium');
	});
  	

	jQuery(".custom-show").on("click", function() {
		jQuery(this).hide();
		jQuery(".custom-close").show();
		jQuery(this).parent().animate({'left': '-=120px'},'medium');
	});
	
	
	jQuery('#de-header-style').on('change', function() {
		v = this.value
		if(v=='opt-1'){
			$('header').removeClass('transparent');
		}else if(v=='opt-2'){
			$('header').addClass('transparent');
		}
	});
	
	jQuery('#de-header-color').on('change', function() {
		v = this.value
		if(v=='opt-1'){
			$('header').removeClass('header-light');
		}else if(v=='opt-2'){
			$('header').addClass('header-light');
		}
	});
	
	jQuery('#de-header-layout').on('change', function() {
		v = this.value
		if(v=='opt-1'){
			$('header').removeClass('de_header_2');
			$('header .info').hide();
		}else if(v=='opt-2'){
			$('header').addClass('de_header_2');
			$('header .info').show();
		}
	});
	
	jQuery('#de-menu').on('change', function() {
		$('#mainmenu').removeClass('no-separator');
		$('#mainmenu').removeClass('line-separator');
		$('#mainmenu').removeClass('circle-separator');
		$('#mainmenu').removeClass('square-separator');
		$('#mainmenu').removeClass('plus-separator');
		$('#mainmenu').removeClass('strip-separator');
		v = this.value
		if(v=='opt-1'){
			$('#mainmenu').removeClass('no-separator');
			$('#mainmenu').removeClass('line-separator');
		}else if(v=='opt-2'){
			$('#mainmenu').addClass('line-separator');
		}else if(v=='opt-3'){
			$('#mainmenu').addClass('circle-separator');
		}else if(v=='opt-4'){
			$('#mainmenu').addClass('square-separator');
		}else if(v=='opt-5'){
			$('#mainmenu').addClass('plus-separator');
		}else if(v=='opt-6'){
			$('#mainmenu').addClass('strip-separator');
		}else if(v=='opt-0'){
			$('#mainmenu').addClass('no-separator');
		}
	});
	
	jQuery('#de-pattern li').on("click", function() {
		n = jQuery('#de-layout').val();
		if(n=="boxed"){
			className = jQuery(this).attr('class');
			jQuery('body').removeClass();
			jQuery('body').addClass(className);
		}else{
			alert('Please select boxed layout first.');
		}
			
	});
});

