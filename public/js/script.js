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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-53219654-1', 'auto');
ga('send', 'pageview');
