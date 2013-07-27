(function($){
  $.fn.wordpress = function(options) {
    var that = this,
        apiEndpoint = "https://public-api.wordpress.com/rest/v1/",
        settings = {
          count: null,
          url: null
        };

    options && $.extend(settings, options);

    function createArticleElement(article) {
      if((photo.caption) !== null){
        var photo_content = photo.caption.text + "  -  ";
      } else {
        var photo_content = " "
      }
      return $('<div>')
        .addClass('instagram-placeholder desktop-2 mobile-half')
        .attr('id', photo.id)
        .append(
          $('<a>')
            .attr('target', '_blank')
            .attr('href', photo.link)
            .attr('title', photo.caption.text)
            .append(
              $('<img>')
                .addClass('instagram-image')
                .attr('src', photo.images.low_resolution.url)
            )
        );
    }



    function composeRequestURL() {
      var url = apiEndpoint,
          params = {};

      if (settings.url != null) {
        url += "/sites/" + settings.url
      }

      if (settings.count != null) {
        params.number = settings.count;
      }

      url += "?" + $.param(params);

      return url;
    }

    settings.onLoad != null && typeof settings.onLoad == 'function' && settings.onLoad();

    $.ajax({
      type: "GET",
      dataType: "json",
      cache: false,
      url: composeRequestURL(),
      success: function(res) {
        var limit = settings.count == null ? res.data.length : settings.count;

        for(var i = 0; i < limit; i++) {
          that.append(createArticleElement(res.data[i]));
        }
      }
    });

    return this;
  };
})(jQuery);
