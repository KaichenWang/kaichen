$(document).ready(function() {

	$.fn.setContent = function() {
		this.text("@over__exposed");
	};

	// $("#background_color_wrap_3 #tagline").setContent();


	// $.fn.setInstagramContent = function() {
	// 	var feedContainerID = this.attr('id');
	// 	var feed = new Instafeed({
 //       		// get: 'tagged',
 //        	// tagName: 'awesome',
 //        	// link: 'true',
 //        	get: 'user',
 //        	userId: 448347490,
 //        	accessToken: '448347490.467ede5.06d02b1dda0b451298bebe7b2dd97fe3',
 //            clientId: 'cba65570ad7b46eeab122555a18c7b2d',
 //            limit: '1',
 //            target :feedContainerID,
 //            resolution:'low_resolution',
 //            template: '<img src="{{image}}" />'
 //   		});
 //    	feed.run();

 //    	$("#background_wrap_instagram #tagline").on('click', function(event){
 //    		feed.next();
	// 	});
 //  //   	$("#background_wrap_instagram #instagram_wrap").addEventListener('click', function() {
 //  // 			feed.next();
	// 	// });
	// };

	// $("#background_wrap_instagram #instagram_wrap").setInstagramContent();

	$.fn.displayGrid = function() {

	        var wall = new freewall("#background_wrap_instagram #instagram_wrap");
	        // alert(this.attr('id'));
	        wall.reset({ 
	        	selector: '.instagramItem',
	            fixSize: 0,  
	            gutterY: 0,  
	            gutterX: 0, 
	            animate: true,
				cellW: 306,
				cellH: 306, 
	            onResize: function() {  
	                wall.fitWidth();  
	            }  
        	})  
       		wall.fitWidth();  

			// for scroll bar appear;
			$(window).trigger("resize") 
	};


	$.fn.setInstagramContent = function() {
		var imgContainer = this;
		var count = 12;
		var userId = '448347490';
		var accessToken = '448347490.467ede5.06d02b1dda0b451298bebe7b2dd97fe3';
		var clientId = 'cba65570ad7b46eeab122555a18c7b2d';

		var instagramUrl = 'https://api.instagram.com/v1/users/' + userId + '/media/recent/?client_id=' + clientId + '&callback=?&count='+ count;
		var nextUrl;

		setNextImage(instagramUrl);

		function setNextImage(url) {  
			$.getJSON(url, function(data) {

			  if (data.pagination.next_url != undefined){
			  	nextUrl = data.pagination.next_url + '&callback=?';
			  }
			  else{
			  	nextUrl = instagramUrl;
			  }

			  if(data.meta.code == 200) {
			    var photos = data.data;

			    if(photos.length > 0) {
			      for (var key in photos){

			        var photo = photos[key];
			        var likeCount = photo.likes.count;
			        var commentCount = photo.id;
			        var instagramLink = photo.link;
			        var caption = photo.caption.text;
			        var photoUrl = photo.images.low_resolution.url;

			        $(imgContainer).append('<div class="instagramItemWrap"><div class="instagramItem" likes="' + likeCount + '" media_id="' + commentCount + '" caption="' + caption + '" link="' + instagramLink + '" style="background-image: url(' + photoUrl + '); background-size: cover;"></div></div>');
			      }
			    }
			  }
			}).done(function() {
				$("#background_wrap_instagram #instagram_wrap").unbind();
				$("#background_wrap_instagram #instagram_wrap").displayGrid();
				$(".instagramItem").unbind();
				$(".instagramItem").each(function(){
					$(this).loadInstagramOverlay();
				});
 			});
		}

		// $("#background_wrap_instagram #tagline").on('click', function(event){
		// 		setNextImage(nextUrl);
		// });


	};

	$("#background_wrap_instagram #instagram_wrap").setInstagramContent();


	$.fn.goToNextSection = function() {
	        $(this).click(function(){
        		$next = $(this).closest(".backColorBox").next(".backColorBox");	
        		while ($next.hasClass("hidden") && $next.next(".backColorBox").length > 0){
        			$next = $next.next(".backColorBox");
        		}
        		// alert ($next.hasClass("hidden"));
        		// alert ($next.attr('id'));
    			$('html, body').animate({
    				scrollTop: $next.offset().top
				}, 500);
    		});
	};
	$(".next_section .icon").goToNextSection();


	$.fn.setFlickrContent = function() {
		var URL = "http://api.flickr.com/services/feeds/photos_public.gne";
		var ID = "95943136@N06";
		var jsonFormat = "&format=json&jsoncallback=?";
		var ajaxURL = URL + "?id=" + ID + jsonFormat;
		$.getJSON(ajaxURL,function(data) {
	    	$('h1').text(data.title);
	    	$.each(data.items,function(i,photo) {
	        	var photoHTML = '<span class="image">';
	        	photoHTML += '<a href="' + photo.link + '">';
	        	photoHTML += '<img src="' + photo.media.m.replace('_m','_b') + '"></a>';
	        	// $('#flickr_wrap').append(photo.link + photo.media.m.replace('_m','_b'));
	        	var imgURL = photo.media.m.replace('_m','_b');
	        	var tempURL = "url('" + imgURL + "') 50% 50% no-repeat";
	        	$('#background_flickr').css( "background", tempURL );
	        	$('#background_flickr').css( "background-size", "cover" );
	   		}); // end each
		}); // end get JSON
	};

	$("#background_wrap_flickr").setFlickrContent();


	$.fn.hideOverlay = function() {
		var darkArea = this;
		var overlay = this.closest('div[class^="overlayWrap"]');
		var closeButton = overlay.find('div[class^="closeOverlay"]');

		darkArea.on('click', function(event){
			if ($(event.target).attr('class') === darkArea.attr('class')){
       			overlay.addClass('hidden');
  				$(document.body).css( "overflow", "visible" );
    		}
	 	});

	 	closeButton.on('click', function(event){
  			overlay.addClass('hidden');
  			$(document.body).css( "overflow", "visible" );
	 	});
	};

	$(".overlayBox").hideOverlay();


	$.fn.loadInstagramOverlay = function() {
		var currentPhoto = this;
		var likeCount;
        var instagramLink;
        var caption;
        var photoUrl;
        var fullPhotoUrl;

        var mediaId;
		var accessToken;
		var requestUrl;

		var photo;
         
        currentPhoto.on('click', function(event){

        	mediaId = currentPhoto.attr('media_id');
			accessToken = '448347490.467ede5.06d02b1dda0b451298bebe7b2dd97fe3';
			requestUrl = 'https://api.instagram.com/v1/media/' + mediaId + '?access_token=' + accessToken + '&callback=?';

			$.getJSON(requestUrl, function(data) {
				photo = data.data;
			    likeCount = photo.likes.count;
        		instagramLink = photo.link;
       			caption = photo.caption.text;
        		photoUrl = photo.images.standard_resolution.url;
        	    fullPhotoUrl = "url('" + photoUrl + "') 50% 50% no-repeat";
 			}).done(function() {

	        	var targetOverlay = $("#instagram_overlay_wrap");
				targetOverlay.removeClass ('hidden');  
				$(document.body).css( "overflow", "hidden" );
				targetOverlay.find('#instagram_photo').css( "background", fullPhotoUrl );
		        targetOverlay.find('#instagram_photo').css( "background-size", "cover" );
				targetOverlay.find('#like_count').text(likeCount);
				targetOverlay.find('#instagram_caption').text(caption); 

 			});
			// //get higher-res img. depending on source, different mod to URL is needed
			// if (photoUrlRaw.indexOf("fbcdn") >= 0) {
			// 	photoUrl = photoUrlRaw.replace('_a','_b');
			// }
			// else if (photoUrlRaw.indexOf("amazonaws") >= 0) {
			// 	photoUrl = photoUrlRaw.replace('_6','_7');
			// }
			// else {
			// 	photoUrl = photoUrlRaw;
			// }
		});

	};

	$(".instagramItem").loadInstagramOverlay();

});