(function() {
	
	var scriptTags = document.getElementsByTagName("script");
	var referrer = scriptTags[scriptTags.length - 1].src;

	var match = /[?&]id=([^&]*)/i.exec(referrer);
	if (match) {
		var id = match[1];

		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', id, 'auto');
		ga('send', 'pageview');
	}

}());
