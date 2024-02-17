(function () {
	var scriptTags = document.getElementsByTagName("script");
	var referrer = scriptTags[scriptTags.length - 1].src;

	var match = /[?&]name=([^&]*)/i.exec(referrer);
	if (match) {
		var disqusName = match[1];

		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = 'https://' + disqusName + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}
}());
