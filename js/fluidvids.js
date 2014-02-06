/* =============================================================
 * fluid-vids.js v1.0
 * Fluid and responsive YouTube and Vimeo videos.
 * Script by Todd Motto
 * https://github.com/toddmotto/fluidvids
 * MIT / GPLv2 License
 * ============================================================= */
(function() {
	var iframes = document.getElementsByTagName('iframe');
	
	for (var i = 0; i < iframes.length; ++i) {
		var iframe = iframes[i];
		var players = /www.youtube.com|player.vimeo.com/;
		if(iframe.src.search(players) !== -1) {
			var videoRatio = (iframe.height / iframe.width) * 100;
			
			iframe.style.position = 'absolute';
			iframe.style.top = '0';
			iframe.style.left = '0';
			iframe.width = '100%';
			iframe.height = '100%';
			
			var div = document.createElement('div');
			div.className = 'video-wrap';
			div.style.width = '100%';
			div.style.position = 'relative';
			div.style.paddingTop = videoRatio + '%';
			
			var parentNode = iframe.parentNode;
			parentNode.insertBefore(div, iframe);
			div.appendChild(iframe);
		}
	}
})();
