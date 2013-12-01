(function($){
  $.fn.wordpress = function(options) {
    var that = this,
        apiEndpoint = "https://public-api.wordpress.com/rest/v1",
        settings = {
          count: null,
          url: null
        };

    options && $.extend(settings, options);

    function createArticleElement(article) {
      return $('<li>')
        .addClass('article desktop-4 mobile-3')
        .attr('id', article.ID)
        //.hover(function(){ $(this).children('.article-info').show(); }, function(){ $(this).children('.article-info').hide(); })
        .append(
          $('<a>')
            .attr('target', '_blank')
            .attr('href', article.URL)
            .attr('title', article.title)
            .append(
              $('<div>')
                .addClass('article-image')
                .attr('style', 'background-image: url(' + article.featured_image + ')')
            )
        )
        .append(
          $('<div>')
            .addClass('article-info')
            .append(
              $('<a>')
                .attr('href', article.URL)
                .html('<h3>' + article.title + '</h3>')
            )
        );
    }

    function composeRequestURL() {
      var url = apiEndpoint,
          params = {};

      if (settings.url != null) {
        url += "/sites/" + settings.url + "/posts";
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
      dataType: "jsonp",
      cache: false,
      url: composeRequestURL(),
      success: function(res) {
        var limit = settings.count == null ? res.posts.length : settings.count;

        for(var i = 0; i < limit; i++) {
          that.append(createArticleElement(res.posts[i]));
        }
      }
    });

    return this;
  };
})(jQuery);
