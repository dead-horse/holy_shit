$(function ($) {

  // 重试次数
  var retry = 0;
  var postsTemplate = ejs.compile(APP.getTemplate('posts'));
  var postsData = {};
  var Page = {
    $root: null,
    $postsContainer: null,
    data: {},
    page: 1,
    init: function () {
      this.$root = $('.act');
      this.$postsContainer = this.$root.find('#posts-container');
      this.loadPosts(this.page);
      this.bindTipTap();
    },
    loadPosts: function (page) {
      var self = this;
      var url = '/api/posts?page=' + page;
      APP.request(url, function (err, data) {
        if (err) {
          alert(err);
          return false;
        }
        data = data || [];
        self.render(data);
        for (var i = 0; i < data.length; i++) {
          postsData[data[i].id] = data[i];
        }
      });
    },
    render: function (data) {
      this.$postsContainer.html(postsTemplate({
        posts: data
      }));
      this.$root.find('.loading').hide();
      this.bindEvents();
    },
    bindEvents: function () {
      this.$root.delegate('.post', 'tap', function (event) {
        var target = $(event.currentTarget);
        if (target) {
          APP.bridgeSend('openPost', postsData[target.data('id')]);
        }
      });
    },
    /**
     * load 失败刷新提示
     */
    bindTipTap: function () {
      var self = this;
      $('.error-tip').bind('tap', function (event) {
        self.loadPosts(self.page);
      });
    }
  };

  Page.init();

});
