
/**
* We want to share this URL, you can change it
*/
var shareUrl = 'https://belyash.github.io';


var SocialShares = {
  fb: {
    url: "https://graph.facebook.com/?id=",
    callback: function (data) {
      console.log("fb", data);
      if (data && data.shares) {
        this.count = data.shares;
      } else {
        this.count = 0;
      }
    },
    share: "https://www.facebook.com/sharer/sharer.php?u="
  },
  vk: {
    url: "https://vk.com/share.php?act=count&url=",
    callback: function (data) {
      // VK.com doesn't support callback parametr for JSONP
      // This callback will never be called
      console.log("vk", data);
    },
    share: "https://vk.com/share.php?url="
  },
  tw: {
    url: "https://cdn.api.twitter.com/1/urls/count.json?url=",
    callback: function (data) {
      console.log("tw", data);
      if (data && data.count) {
        this.count = data.count;
      } else {
        this.count = 0;
      }
    },
    share: "https://twitter.com/intent/tweet?url="
  },
  ln: {
    url: "https://www.linkedin.com/countserv/count/share?format=jsonp&url=",
    callback: function (data) {
			console.log("ln", data);
      if (data && data.count) {
        this.count = data.count;
      } else {
        this.count = 0;
      }
    },
    share: "https://www.linkedin.com/cws/share?url="
  },
  pt: {
    url: "https://api.pinterest.com/v1/urls/count.json?url=",
    callback: function (data) {
			console.log("pt", data);
      if (data && data.count) {
        this.count = data.count;
      } else {
        this.count = 0;
      }
    },
    // Have some trouble with this
    share: "https://www.pinterest.com/pin/create/bookmarklet/?description=Vasiliy Lazarev&url="
  },
  
};

/**
* VK.com doesn't support callback parameter for JSONP
* VK.com wanna call VK.Share.count()
*/
var VK = VK || {};
VK.Share = VK.Share || {};
VK.Share.count = function (index, count) {
  console.log("vk", count);
  SocialShares.vk.count = count;
}

$(function () {
  $('[data-social]').each(function () {
    var $this = $(this),
      social = $this.data('social'),
      oSocial;

    if (SocialShares.hasOwnProperty(social)) {
      oSocial = SocialShares[social];

      if (oSocial.url) {
        $.getScript(
          oSocial.url + shareUrl + "&callback=SocialShares." + social + ".callback",
          function(data, textStatus, jqxhr) {
            $this.attr("data-count", oSocial.count);
          }
        );
      }
      
      if (oSocial.share) {
        $this.on("click", function () {
          window.open(
            oSocial.share + shareUrl, 
            '', 
            'menubar=no,toolbar=no,resizable=yes' + 
            ',scrollbars=yes' +
            ',height=300,width=600'
          );
		    });
      }
    }
  });
});