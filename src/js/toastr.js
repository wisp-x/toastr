/*!
 * Toastr v1.0
 *
 * Copyright Wisp X
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-08-20 16:50
 * Link: https://gitee.com/wispx
 */
$.extend({
  toastr: {
    // 惯例配置
    options: {
      timeOut: 3000,
      position: 'top-right',
      callback: function () {
      }
    },
    /**
     * Toastr容器
     * @param position  位置
     * @returns {jQuery|HTMLElement}
     */
    container: function (position) {
      position = position ? position : this.options.position;
      var container = $('body .toastr-container');
      if (!container.hasClass(position)) {
        $('body').append('<div class="toastr-container ' + position + '"><ul></ul></div>');
      }
      setTimeout(function () {
        // 清除空容器
        container.each(function (i, v) {
          if ($(v).find('ul li').length <= 0) {
            $(v).remove();
          }
        });
      }, 500);
      return $('body .toastr-container.' + position);
    },
    /**
     * 创建Toastr
     * @param type    类型
     * @param msg     信息
     * @param options 参数
     */
    create: function (type, msg, options) {
      var self = this;
      msg = msg || 'null';
      options = options || {};
      var timeOut = options.timeOut ? options.timeOut : this.options.timeOut,
        position = options.position ? options.position : this.options.position,
        callback = options.callback ? options.callback : this.options.callback;

      // 开始和结束动画
      var fades = {
        'top-left': {fadeIn: 'left', fadeOut: 'left'},
        'top-center': {fadeIn: 'top', fadeOut: 'bottom'},
        'top-right': {fadeIn: 'right', fadeOut: 'right'},
        'right-bottom': {fadeIn: 'right', fadeOut: 'right'},
        'bottom-center': {fadeIn: 'top', fadeOut: 'bottom'},
        'left-bottom': {fadeIn: 'left', fadeOut: 'bottom'}
      }, id = 'toastr-' + new Date().getTime();

      this.container(position).find('> ul').prepend('<li class="fade-in-' + fades[position].fadeIn + ' ' + id + ' toastr-' + type + '">' + msg + '</li>');

      // 定时关闭
      var li = this.container(position).find('.' + id), fadeOut = 'fade-out-' + fades[position].fadeOut, timer = setTimeout(function () {
        clearTimeout(timer);
        li.unbind('click');
        self.close(li, fadeOut, callback);
      }, timeOut);

      // 绑定单击事件关闭
      li.click(function () {
        clearTimeout(timer);
        self.close(li, fadeOut, callback);
      });
    },
    /**
     * 关闭Toast
     * @param li        li元素
     * @param fadeOut   关闭动画
     * @param callback  关闭后的回调
     */
    close: function (li, fadeOut, callback) {
      li.addClass(fadeOut);
      setTimeout(function () {
        li.remove();
      }, 400);
      // 执行关闭回调
      callback();
    },
    /**
     * 清除所有Toastr
     */
    clear: function () {
      var container = $('body .toastr-container');
      container.length >= 0 && container.fadeOut(1000);
      setTimeout(function () {
        container.remove();
      }, 2000);
    },
    success: function (msg, options) {
      this.create('success', msg, options);
    },
    info: function (msg, options) {
      this.create('info', msg, options);
    },
    warning: function (msg, options) {
      this.create('warning', msg, options)
    },
    error: function (msg, options) {
      this.create('error', msg, options);
    }
  }
});