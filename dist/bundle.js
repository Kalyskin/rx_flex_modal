!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){!function(e){var t=function(e,t){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!0,!0,e.target),e.target.dispatchEvent(n),n=null,!1},n=!0,o={x:0,y:0},a={x:0,y:0},r={touchstart:function(e){o={x:e.touches[0].pageX,y:e.touches[0].pageY}},touchmove:function(e){n=!1,a={x:e.touches[0].pageX,y:e.touches[0].pageY}},touchend:function(e){if(n)t(e,"fc");else{var r=a.x-o.x,i=Math.abs(r),l=a.y-o.y,c=Math.abs(l);Math.max(i,c)>20&&t(e,i>c?r<0?"swl":"swr":l<0?"swu":"swd")}n=!0},touchcancel:function(e){n=!1}};for(var i in r)e.addEventListener(i,r[i],!1)}(document),Rx_deepmerge=function(){function e(e){return e&&"object"==typeof e&&"[object RegExp]"!==Object.prototype.toString.call(e)&&"[object Date]"!==Object.prototype.toString.call(e)}function t(t,n){return n&&!0===n.clone&&e(t)?o(function(e){return Array.isArray(e)?[]:{}}(t),t,n):t}function n(n,a,r){var i=n.slice();return a.forEach(function(a,l){void 0===i[l]?i[l]=t(a,r):e(a)?i[l]=o(n[l],a,r):-1===n.indexOf(a)&&i.push(t(a,r))}),i}function o(a,r,i){var l=Array.isArray(r),c=(i||{arrayMerge:n}).arrayMerge||n;return l?Array.isArray(a)?c(a,r,i):t(r,i):function(n,a,r){var i={};return e(n)&&Object.keys(n).forEach(function(e){i[e]=t(n[e],r)}),Object.keys(a).forEach(function(l){e(a[l])&&n[l]?i[l]=o(n[l],a[l],r):i[l]=t(a[l],r)}),i}(a,r,i)}return o.all=function(e,t){if(!Array.isArray(e)||e.length<2)throw new Error("first argument should be an array with at least two elements");return e.reduce(function(e,n){return o(e,n,t)})},o}(),RxFlexModal={$modal:null,__:{},currentLayout:null,init:function(){var e=this.__,t=this,n=0;return e.layouts=[],e.$modal_backdrop=$(".rx__flex_modal__backdrop"),e.$modal=$("#rx__flex_modal"),e.$body=$(document.body),e.$layout_template=e.$modal.find(".rx__flex_modal__layout").clone(),e.$layer=e.$modal.find(".rx__flex_modal__layer"),e.$modal.find(".rx__flex_modal__layout").remove(),e.newID=function(){return n++},$(window).resize(function(){t.setSize()}),e.close_on_backdrop_click=t.getConfig({},"popup_config.close_on_backdrop_click"),e.$modal_backdrop.click(function(n){e.close_on_backdrop_click&&(0!==$(n.target).closest(".rx__flex_modal").length||$(n.target).hasClass(".rx__flex_modal")||t.close())}),e.closeLayer=function(){e.$layer.addClass("hidden"),e.$layer.find(".rx__flex_modal__layer__content__textcontent").html(""),setTimeout(function(){e.$layer.removeClass("_start_anim").removeClass("_as_menu"),e.layer_active=!1},200),setTimeout(function(){e.layer_active=!1},300)},e.showLayer=function(){e.$layer.addClass("_start_anim"),setTimeout(function(){e.$layer.removeClass("hidden"),e.layer_active=!0},0)},e.$layer.click(function(t){0!==$(t.target).closest(".rx__flex_modal__layer__content").length||$(t.target).hasClass(".rx__flex_modal__layer__content")||e.closeLayer()}),t},open:function(e){var t=this.__;t._open=!0,t.scrollTop=window.scrollY,e instanceof RxFlexModal.Layout?(this.setPosition(this.getConfig(e.getMainConfig(),"popup_config.position")),t.close_on_backdrop_click=this.getConfig(e.getMainConfig(),"popup_config.close_on_backdrop_click")):(this.setPosition(this.getConfig(e,"popup_config.position")),t.close_on_backdrop_click=this.getConfig(e,"popup_config.close_on_backdrop_click")),t.$modal_backdrop.addClass("__anim_start").show(),setTimeout(function(){t.$modal.addClass("open"),t.$modal_backdrop.removeClass("__anim_start")},0),t.$body.addClass("rx_flex_open"),this.setSize(),e instanceof RxFlexModal.Layout?this.push(e):(this.currentLayout=new RxFlexModal.Layout(e||RxFlexModal.Layout.defaultConfig),this.currentLayout.init({layout:t.$layout_template.clone(),parent:this,id:t.newID()}),t.layouts.map(function(e){e.remove()}),t.layouts=[],t.layouts.push(this.currentLayout),this.currentLayout.show())},alert:function(e){var t=this.__;t.$layer.removeClass("_as_menu");var n=t.$layer.find(".rx__flex_modal__layer__content__textcontent"),o=t.$layer.find(".rx__flex_modal__layer__content__actionscontent");return"string"==typeof e?(n.text(e),o.html('<button data-action="ok">ok</button>')):"object"==typeof e&&("text"in e?n.html(e.text):n.html("  "),"actions"in e&&Array.isArray(e.actions)&&(o.html(""),e.actions.map(function(e){var t=e.color?'style="color:'+e.color+';"':"";o.append("<button "+t+' data-action="'+e.action+'">'+e.text+"</button>")}))),new RxFlexModal.Promise(function(e,a){o.find("button").click(function(o){var a={};n.find("[name]").each(function(){a[$(this).attr("name")]=$(this).val()}),n.find("[name]").length?(a.action=$(this).data("action"),e(a)):e($(this).data("action")),t.closeLayer()}),t.showLayer()})},menu:function(e){var t=this.__;t.$layer.addClass("_as_menu");var n=t.$layer.find(".rx__flex_modal__layer__content__actionscontent");return"object"==typeof e&&"items"in e&&Array.isArray(e.items)&&(n.html(""),e.items.map(function(e){n.append('<button data-action="'+e.action+'">'+e.text+"</button>")})),new RxFlexModal.Promise(function(e,o){n.find("button").click(function(n){t.closeLayer(),e($(this).data("action"))}),t.showLayer()})},setSize:function(){var e=this.__;window.innerWidth<600?e.$body.addClass("rx_modal_full_screen"):e.$body.removeClass("rx_modal_full_screen")},setPosition:function(e){var t=this.__;switch(t.$modal_backdrop.removeClass("rx__flex_modal__backdrop__left").removeClass("rx__flex_modal__backdrop__right").removeClass("rx__flex_modal__backdrop__center"),e){case RxFlexModal.CONST.POSITION_LEFT:t.$modal_backdrop.addClass("rx__flex_modal__backdrop__left");break;case RxFlexModal.CONST.POSITION_CENTER:t.$modal_backdrop.addClass("rx__flex_modal__backdrop__center");break;case RxFlexModal.CONST.POSITION_RIGHT:t.$modal_backdrop.addClass("rx__flex_modal__backdrop__right");break;default:t.$modal_backdrop.addClass("rx__flex_modal__backdrop__center")}},push:function(e){var t=this.__;if(e instanceof RxFlexModal.Layout){if(e.isRemoved())throw new Error("Layout was removed use 'permanently:true' in config!");e.isInitialized()||e.init({layout:t.$layout_template.clone(),parent:this,id:t.newID()}),e.isDetached()&&e.attach(),this.currentLayout=e}t.layouts.map(function(e){e.hide()}),t.layouts.push(this.currentLayout),this.currentLayout.show()},close:function(){var e=this.__;e._open=!1,e.$modal.removeClass("open").removeClass("full_screen"),e.$body.removeClass("rx_flex_open"),window.scrollTo(0,e.scrollTop||0),e.$modal_backdrop.addClass("__anim_start"),setTimeout(function(){e.$modal_backdrop.hide()},300),e.layouts.map(function(e,t){e.isPermanently()?e.detach():e.remove()}),e.layouts=[]},_handleBack:function(e){var t=this.__;e&&(e.isPermanently()?(e.hide(),e.detach()):e.remove(),t.layouts.map(function(n,o){n.hide(),n.id===e.id&&t.layouts.splice(o,1)})),t.layouts.length>0?this.currentLayout=t.layouts[t.layouts.length-1]:(t.layouts=[],this.currentLayout=null,this.close()),this.currentLayout&&this.currentLayout.show()},getConfig:function(e,t){var n=Rx_deepmerge(RxFlexModal.Layout.defaultConfig,e||{});return t.split(".").map(function(e){n&&(n=n[e])}),n},isOpen:function(){return this.__._open}},RxFlexModal.CONST={POSITION_LEFT:1,POSITION_RIGHT:2,POSITION_CENTER:3,TYPE_OF_COMPONENT_MODAL:111},RxFlexModal.Layout=function(e){var t=this,n=null,o={},a=!1,r=!1,i=!1,l=!1,c=null,s=new RxFlexModal.RxListenerManager;t.loader={on:function(){t.$loader.removeClass("hidden")},off:function(){t.$loader.addClass("hidden")}},t.refs={},t._actions={handleBack:function(e){s.dispatch("onBack",t),o._handleBack(t),console.log("Back")},handleClose:function(e){o.close()}},t.dispatch=function(){s.dispatch.apply(null,arguments)},t.onBack=function(e){s.on("onBack",e)},t.onDestroy=function(e){s.on("onDestroy",e)},t.onSetContent=function(e){s.on("onSetContent",e)},t.onHide=function(e){s.on("onHide",e)},t.onShow=function(e){s.on("onShow",e)},t.on=function(e,t){s.on(e,t)},t.isInitialized=function(){return a},t.isDetached=function(){return i},t.isRemoved=function(){return r},t.isPermanently=function(){return e.config&&e.config.permanently},t.init=function(r){a||(s.clear(),t.id=r.id,n=t.$wrapper=r.layout,o=r.parent,t.$loader=n.find(".rx__flex_modal__loader"),t.$header=n.find(".rx__flex_modal__header"),t.$header_left=n.find(".rx__flex_modal__header__left"),t.$header_center=n.find(".rx__flex_modal__header__center"),t.$header_right=n.find(".rx__flex_modal__header__right"),t.$header_backbutton=n.find(".rx__flex_modal__header__left .sprtrx-icon-left-open-big"),t.$header_closebutton=n.find(".rx__flex_modal__header__left .sprtrx-icon-cancel"),t.$header_title=n.find(".rx__flex_modal__header__center__title"),t.$footer=n.find(".rx__flex_modal__footer"),t.$content=n.find(".rx__flex_modal__content__content"),t.$header_backbutton.click(t._actions.handleBack.bind(t)),t.$header_closebutton.click(t._actions.handleClose.bind(t)),t.setConfig(e.config),t.attach(),e.content_script&&"function"==typeof e.content_script&&e.content_script(t),t.$content.length&&t.$content[0]&&t.$content[0].addEventListener("touchmove",function(e){t.$content.focus()},!1)),a=!0},t.setContent=function(e){return e instanceof RxFlexModal.Promise?(t.loader.on(),e.then(function(e){t.$content.html(e),t.loader.off(),s.dispatch("onSetContent",t)})):(t.$content.html(e),s.dispatch("onSetContent",t)),t},t.hide=function(){n&&n.addClass("hidden"),s.dispatch("onHide",t)},t.show=function(){console.log("Show"),n&&n.removeClass("hidden"),s.dispatch("onShow",t)},t.remove=function(){t.hide(),setTimeout(function(){s.dispatch("onDestroy",t),n&&n.remove(),r=!0,l=!1},300)},t.detach=function(){t.hide(),setTimeout(function(){s.dispatch("onDestroy",t),n&&(n=n.detach(),i=!0,l=!1)},300)},t.attach=function(){n&&!l&&(o.__.$modal.append(n),l=!0)},t.getMainConfig=function(){return e||{}},t.getConfig=function(e,t){var n=Rx_deepmerge(RxFlexModal.Layout.defaultConfig.config,e||{});return t.split(".").map(function(e){n&&(n=n[e])}),n},t.setConfig=function(e){t.getConfig(e,"footer.visible")?t.$footer.removeClass("hidden"):t.$footer.addClass("hidden"),t.getConfig(e,"footer.height")&&t.$footer.css("height",t.getConfig(e,"footer.height")),t.getConfig(e,"header.visible")?t.$header.removeClass("hidden"):t.$header.addClass("hidden"),t.getConfig(e,"header.height")&&t.$header.css("height",t.getConfig(e,"header.height")),t.getConfig(e,"header.back_button")?t.$header_backbutton.removeClass("hidden"):t.$header_backbutton.addClass("hidden"),t.getConfig(e,"header.close_button")?t.$header_closebutton.removeClass("hidden"):t.$header_closebutton.addClass("hidden"),"string"==typeof t.getConfig(e,"header.title")&&t.$header_title.text(t.getConfig(e,"header.title")),t.getConfig(e,"header.right")&&t.setHeaderRight(t.getConfig(e,"header.right")),t.$header_right.children().length?t.$header_center.removeClass("right_empty"):t.$header_center.addClass("right_empty"),t.getConfig(e,"header.left")&&t.setHeaderLeft(t.getConfig(e,"header.left")),t.getConfig(e,"header.center")&&t.setHeaderCenter(t.getConfig(e,"header.center")),t.setSticky(t.getConfig(e,"header.sticky"))},t.setHeaderCenter=function(e){"object"==typeof e&&"__typeofcomponent"in e&&e.__typeofcomponent===RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL?(e.init(t,s),t.$header_center.html(e.html())):t.$header_center.html(e)},t.setHeaderLeft=function(e){Array.isArray(e)?(t.$header_left.html(),e.map(function(e){e instanceof RxFlexModal.HeaderButton&&(e.init(t,s),t.$header_left.append(e.html()))})):t.$header_left.html(e)},t.setHeaderRight=function(e){Array.isArray(e)?(t.$header_right.html(),e.map(function(e){e instanceof RxFlexModal.HeaderButton&&(e.init(t,s),t.$header_right.append(e.html()))})):t.$header_right.html(e)},t.get_scroll_function=function(){var n=t.getConfig(e.config,"header.height"),o=0,a=0;return function(){if(c){a=this.scrollHeight-this.clientHeight;var e=parseInt(t.$header.css("margin-top"));this.scrollTop<a?this.scrollTop>0?t.$header.css("margin-top",Math.min(0,Math.max(-1*n,e-(this.scrollTop-o)))):t.$header.css("margin-top",0):t.$header.css("margin-top",-1*n),o=this.scrollTop}}},t.returnHeader=function(){t.$header.animate({"margin-top":0},300)},t.setSticky=function(e){(c=e)?t.$content.scroll(t.get_scroll_function()):t.$header.css("margin-top",0)},t.getHeaderCenter=function(){return t.$header_center},t.getHeaderLeft=function(){return t.$header_left},t.getHeaderRight=function(){return t.$header_right}},RxFlexModal.Layout.defaultConfig={popup_config:{position:RxFlexModal.CONST.POSITION_CENTER,close_on_backdrop_click:!0},config:{header:{visible:!0,sticky:!1,height:70,title:"",close_button:!1,back_button:!1,right:[],left:null},footer:{visible:!1,height:70},center:null}},RxFlexModal.Promise=Promise,RxFlexModal.HeaderButton=function(e){var t=null;this.init=function(n,o){"icon"===e.type&&(t=$('<span class="'+e.icon+'"></span>')),"button"===e.type&&(t=$('<button class="rx__flex_modal__header__button">'+e.text+"</button>")),t&&e.dispatchEvent&&t.click(function(t){o.dispatch(e.dispatchEvent,t)}),t&&e.ref&&(n.refs[e.ref]=t)},this.html=function(){return t},this.__typeofcomponent=RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL},RxFlexModal.HorizontalScrollableElement=function(e){var t=null;this.init=function(n,o){t=$('<div class="rx__flex_modal__HorizontalScrollableElement"></div>'),"function"==typeof e.renderItem&&Array.isArray(e.items)&&e.items.map(function(n,a){var r=$('<div class="rx__flex_modal__HorizontalScrollableElement_item"></div>');r.css("width",e.width||100),r.html(e.renderItem(n,a)||""),r.click(function(t){o.dispatch(e.dispatchEvent_item_click,t)}),t.append(r)}),t&&e.ref&&(n.refs[e.ref]=t)},this.html=function(){return t},this.__typeofcomponent=RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL},RxFlexModal.HeaderTab=function(e){var t=null;this.init=function(n,o){t=$('<div class="rx__flex_modal__HeaderTab"></div>'),"function"==typeof e.renderItem&&Array.isArray(e.items)&&e.items.map(function(n,a){var r=$('<div class="rx__flex_modal__HeaderTab_item"></div>');r.html(e.renderItem(n,a)||""),r.click(function(t){o.dispatch(e.dispatchEvent_item_click,t)}),t.append(r)}),t&&e.ref&&(n.refs[e.ref]=t)},this.html=function(){return t},this.__typeofcomponent=RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL},RxFlexModal.RxListenerManager=function(){var e={},t={};this.on=function(t,n){e[t]&&e[t].push(n),!e[t]&&(e[t]=[n])},this.dispatch=function(n,o){var a=Array.prototype.shift.apply(arguments),r=arguments;e[a]&&Array.isArray(e[a])&&(e[a].map(function(e){e.apply(null,r)}),t[a]=(+t[a]||0)+1)},this.clear=function(){e={},t={}}},RxFlexModal.init()},function(e,t,n){n(0),e.exports=n(6)},,,,,function(e,t){}]);
//# sourceMappingURL=bundle.js.map