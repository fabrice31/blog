$('.post img').each(function() {
	$(this).wrap("<a class='fancybox' rel='gallery' href='" + this.src + "'/>");
});
$(".fancybox").attr('rel', 'gallery').fancybox({
	beforeShow : function() {
		var alt = this.element.find('img').attr('alt');
		this.inner.find('img').attr('alt', alt);
		this.title = alt;
	},
	helpers : {
		title: {
			type: 'inside',
			position: 'bottom'
		}
	},
	openEffect  : 'fade',
	closeEffect : 'fade',
	nextEffect  : 'none',
	prevEffect  : 'none',
	padding     : 0,
	margin      : [20, 60, 20, 60] // Increase left/right margin
});
