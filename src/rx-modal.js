Rx_deepmerge = (function () {
    function isMergeableObject(val) {
        var nonNullObject = val && typeof val === 'object'

        return nonNullObject
            && Object.prototype.toString.call(val) !== '[object RegExp]'
            && Object.prototype.toString.call(val) !== '[object Date]'
    }

    function emptyTarget(val) {
        return Array.isArray(val) ? [] : {}
    }

    function cloneIfNecessary(value, optionsArgument) {
        var clone = optionsArgument && optionsArgument.clone === true
        return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
    }

    function defaultArrayMerge(target, source, optionsArgument) {
        var destination = target.slice()
        source.forEach(function (e, i) {
            if (typeof destination[i] === 'undefined') {
                destination[i] = cloneIfNecessary(e, optionsArgument)
            } else if (isMergeableObject(e)) {
                destination[i] = deepmerge(target[i], e, optionsArgument)
            } else if (target.indexOf(e) === -1) {
                destination.push(cloneIfNecessary(e, optionsArgument))
            }
        })
        return destination
    }

    function mergeObject(target, source, optionsArgument) {
        var destination = {}
        if (isMergeableObject(target)) {
            Object.keys(target).forEach(function (key) {
                destination[key] = cloneIfNecessary(target[key], optionsArgument)
            })
        }
        Object.keys(source).forEach(function (key) {
            if (!isMergeableObject(source[key]) || !target[key]) {
                destination[key] = cloneIfNecessary(source[key], optionsArgument)
            } else {
                destination[key] = deepmerge(target[key], source[key], optionsArgument)
            }
        })
        return destination
    }

    function deepmerge(target, source, optionsArgument) {
        var array = Array.isArray(source);
        var options = optionsArgument || {arrayMerge: defaultArrayMerge}
        var arrayMerge = options.arrayMerge || defaultArrayMerge

        if (array) {
            return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
        } else {
            return mergeObject(target, source, optionsArgument)
        }
    }

    deepmerge.all = function deepmergeAll(array, optionsArgument) {
        if (!Array.isArray(array) || array.length < 2) {
            throw new Error('first argument should be an array with at least two elements')
        }

        // we are sure there are at least 2 values, so it is safe to have no initial value
        return array.reduce(function (prev, next) {
            return deepmerge(prev, next, optionsArgument)
        })
    }
    return deepmerge;
})();

RxFlexModal = {
    $modal: null,
    __: {},
    currentLayout: null,
    init: function () {
        var self = this.__, that = this, _id = 0;
        self.layouts = [];
        self.$modal_backdrop = $('.rx__flex_modal__backdrop');
        self.$modal = $('#rx__flex_modal');
        self.$body = $(document.body);
        self.$layout_template = self.$modal.find('.rx__flex_modal__layout').clone();
        self.$modal.find('.rx__flex_modal__layout').remove();
        self.newID = function () {
            return _id++;
        };
        $(window).resize(function () {
            that.setSize();
        });
        self.close_on_backdrop_click = that.getConfig({}, 'popup_config.close_on_backdrop_click');
        self.$modal_backdrop.click(function (e) {
            if (self.close_on_backdrop_click) {
                if($(e.target).closest('.rx__flex_modal').length === 0 && !$(e.target).hasClass('.rx__flex_modal')){
                    that.close();
                }
            }
        });
        return that;
    },
    open: function (config) {
        var self = this.__, that = this;
        self.scrollTop = window.scrollY;
        if (config instanceof RxFlexModal.Layout) {
            that.setPosition(that.getConfig(config.getMainConfig(), 'popup_config.position'));
            self.close_on_backdrop_click = that.getConfig(config.getMainConfig(), 'popup_config.close_on_backdrop_click');
        } else {
            that.setPosition(that.getConfig(config, 'popup_config.position'));
            self.close_on_backdrop_click = that.getConfig(config, 'popup_config.close_on_backdrop_click');
        }
        self.$modal_backdrop.show();
        self.$modal.addClass('open');
        self.$body.addClass('rx_flex_open');
        that.setSize();
        if (config instanceof RxFlexModal.Layout) {
            that.push(config);
        } else {
            that.currentLayout = new RxFlexModal.Layout(config || RxFlexModal.Layout.defaultConfig);
            that.currentLayout.init({
                layout: self.$layout_template.clone(),
                parent: that,
                id: self.newID()
            });
            self.layouts.map(function (_layout) {
                _layout.remove();
            });
            self.layouts = [];
            self.layouts.push(that.currentLayout);
            that.currentLayout.show();
        }
    },
    setSize: function () {
        var self = this.__, that = this;
        if (window.innerWidth < 600) {
            self.$body.addClass('rx_modal_full_screen');
        } else {
            self.$body.removeClass('rx_modal_full_screen');
        }
    },
    setPosition: function (position) {
        var self = this.__, that = this;
        self.$modal_backdrop.removeClass('rx__flex_modal__backdrop__left')
            .removeClass('rx__flex_modal__backdrop__right');
        switch (position) {
            case RxFlexModal.CONST.POSITION_LEFT:
                self.$modal_backdrop.addClass('rx__flex_modal__backdrop__left');
                break;
            case RxFlexModal.CONST.POSITION_CENTER:
                self.$modal_backdrop.addClass('rx__flex_modal__backdrop__center');
                break;
            case RxFlexModal.CONST.POSITION_RIGHT:
                self.$modal_backdrop.addClass('rx__flex_modal__backdrop__right');
                break;
            default:
                self.$modal_backdrop.addClass('rx__flex_modal__backdrop__center');
                break;
        }
    },
    push: function (layout) {
        var self = this.__, that = this;

        if (layout instanceof RxFlexModal.Layout) {
            if (layout.isRemoved()) {
                throw new Error("Layout was removed use 'permanently:true' in config!");
            }
            if (!layout.isInitialized()) {
                layout.init({
                    layout: self.$layout_template.clone(),
                    parent: that,
                    id: self.newID()
                });
            }
            if (layout.isDetached()) {
                layout.attach();
            }
            that.currentLayout = layout;
        }
        self.layouts.map(function (_layout) {
            _layout.hide();
        });
        self.layouts.push(that.currentLayout);
        that.currentLayout.show();
    },
    close: function () {
        var self = this.__, that = this;
        console.log("on close");
        self.$modal.removeClass('open').removeClass('full_screen');
        self.$body.removeClass('rx_flex_open');
        window.scrollTo(0, self.scrollTop || 0);
        self.$modal_backdrop.hide();
        self.layouts.map(function (_layout, index) {
            if (_layout.isPermanently()) {
                _layout.detach();
            } else
                _layout.remove();
        });
        self.layouts = [];
    },
    _handleBack: function (layout) {
        var self = this.__, that = this;
        if (layout) {
            if (layout.isPermanently()) {
                layout.hide();
                layout.detach();
            } else
                layout.remove();

            self.layouts.map(function (_layout, index) {
                _layout.hide();
                if (_layout.id === layout.id) {
                    self.layouts.splice(index, 1);
                }
            });
        }
        if (self.layouts.length > 0) {
            that.currentLayout = self.layouts[self.layouts.length - 1];
        } else {
            self.layouts = [];
            that.currentLayout = null;
            that.close();
        }
        that.currentLayout && that.currentLayout.show();
    },
    getConfig: function (config, name) {
        var conf = Rx_deepmerge(RxFlexModal.Layout.defaultConfig, config || {});
        var path = name.split('.');
        var tmp = conf;
        path.map(function (prop) {
            if (tmp)
                tmp = tmp[prop];
        });
        return tmp;
    }
};
RxFlexModal.CONST = {
    POSITION_LEFT: 1,
    POSITION_RIGHT: 2,
    POSITION_CENTER: 3,
    TYPE_OF_COMPONENT_MODAL:111
};
RxFlexModal.Layout = function (config) {
    var self = this,
        $layout = null,
        Parent = {},
        initialized = false,
        removed = false,
        detached = false,
        attached = false,
        _sticky = null;
        LayoutEvents = new RxFlexModal.RxListenerManager();

    self.loader = {
        on: function () {
            self.$loader.removeClass('hidden');
        },
        off: function () {
            self.$loader.addClass('hidden');
        },
    };
    self.refs = {};
    self._actions = {
        handleBack: function (e) {
            LayoutEvents.dispatch("onBack", self);
            Parent._handleBack(self);
            console.log("Back");
        },
        handleClose: function (e) {
            Parent.close();
        }
    };

    self.onBack = function (clback) {
        LayoutEvents.on("onBack", clback)
    };
    self.onDestroy = function (clback) {
        LayoutEvents.on("onDestroy", clback)
    };
    self.onSetContent = function (clback) {
        LayoutEvents.on("onSetContent", clback)
    };
    self.onHide = function (clback) {
        LayoutEvents.on("onHide", clback)
    };
    self.onShow = function (clback) {
        LayoutEvents.on("onShow", clback)
    };
    self.on = function (event_name, clback) {
        LayoutEvents.on(event_name, clback)
    };

    self.isInitialized = function () {
        return initialized;
    };
    self.isDetached = function () {
        return detached;
    };
    self.isRemoved = function () {
        return removed;
    };
    self.isPermanently = function () {
        return config.config.permanently;
    };

    self.init = function (params) {
        if (!initialized) {
            LayoutEvents.clear();
            self.id = params.id;
            $layout = self.$wrapper = params.layout;
            Parent = params.parent;
            self.$loader = $layout.find('.rx__flex_modal__loader');
            self.$header = $layout.find('.rx__flex_modal__header');
            self.$header_left = $layout.find('.rx__flex_modal__header__left');
            self.$header_center = $layout.find('.rx__flex_modal__header__center');
            self.$header_right = $layout.find('.rx__flex_modal__header__right');
            self.$header_backbutton = $layout.find('.rx__flex_modal__header__left .sprtrx-icon-left-open-big');
            self.$header_closebutton = $layout.find('.rx__flex_modal__header__left .sprtrx-icon-cancel');
            self.$header_title = $layout.find('.rx__flex_modal__header__center__title');
            self.$footer = $layout.find('.rx__flex_modal__footer');
            self.$content = $layout.find('.rx__flex_modal__content__content');

            /*init events*/
            self.$header_backbutton.click(self._actions.handleBack.bind(self));
            self.$header_closebutton.click(self._actions.handleClose.bind(self));

            self.setConfig(config.config);
            self.attach();
            if (config.content_script && typeof config.content_script === 'function') {
                config.content_script(self);
            }
        }
        initialized = true;
    };
    self.setContent = function ($content) {
        if ($content instanceof RxFlexModal.Promise) {
            self.loader.on();
            $content.then(function (content) {
                self.$content.html(content);
                self.loader.off();
                LayoutEvents.dispatch("onSetContent", self);
            });
        } else {
            self.$content.html($content);
            LayoutEvents.dispatch("onSetContent", self);
        }
        return self;
    };
    self.hide = function () {
        $layout && $layout.addClass('hidden');
        LayoutEvents.dispatch("onHide", self);
    };
    self.show = function () {
        console.log("Show");
        $layout && $layout.removeClass('hidden');
        LayoutEvents.dispatch("onShow", self);
    };
    self.remove = function () {
        self.hide();
        setTimeout(function () {
            LayoutEvents.dispatch("onDestroy", self);
            $layout && $layout.remove();
            removed = true;
            attached = false;
        }, 300);
    };
    self.detach = function () {
        self.hide();
        setTimeout(function () {
            LayoutEvents.dispatch("onDestroy", self);
            if ($layout) {
                $layout = $layout.detach();
                detached = true;
                attached = false;
            }
        }, 300);
    };
    self.attach = function () {
        if ($layout && !attached) {
            Parent.__.$modal.append($layout);
            attached = true;
        }
    };
    self.getMainConfig = function () {
        return config || {};
    };
    self.getConfig = function (config, name) {
        var conf = Rx_deepmerge(RxFlexModal.Layout.defaultConfig.config, config || {});
        var path = name.split('.');
        var tmp = conf;
        path.map(function (prop) {
            if (tmp)
                tmp = tmp[prop];
        });
        return tmp;
    };
    self.setConfig = function (config) {

        /*Footer*/
        if (self.getConfig(config, 'footer.visible')) {
            self.$footer.removeClass('hidden');
        } else {
            self.$footer.addClass('hidden');
        }
        if (self.getConfig(config, 'footer.height')) {
            self.$footer.css('height', self.getConfig(config, 'footer.height'));
        }

        /*Header*/
        if (self.getConfig(config, 'header.visible')) {
            self.$header.removeClass('hidden');
        } else {
            self.$header.addClass('hidden');
        }

        if (self.getConfig(config, 'header.height')) {
            self.$header.css('height', self.getConfig(config, 'header.height'));
        }

        if (self.getConfig(config, 'header.back_button')) {
            self.$header_backbutton.removeClass('hidden');
        } else {
            self.$header_backbutton.addClass('hidden');
        }

        if (self.getConfig(config, 'header.close_button')) {
            self.$header_closebutton.removeClass('hidden');
        } else {
            self.$header_closebutton.addClass('hidden');
        }

        if (typeof self.getConfig(config, 'header.title') === 'string') {
            self.$header_title.text(self.getConfig(config, 'header.title'));
        }

        if (self.getConfig(config, 'header.right')) {
            self.setHeaderRight(self.getConfig(config, 'header.right'));
        }

        if (self.$header_right.children().length) {
            self.$header_center.removeClass('right_empty');
        } else {
            self.$header_center.addClass('right_empty');
        }

        if (self.getConfig(config, 'header.left')) {
            self.setHeaderLeft(self.getConfig(config, 'header.left'));
        }

        if (self.getConfig(config, 'header.center')) {
            self.setHeaderCenter(self.getConfig(config, 'header.center'));
        }

        self.setSticky(self.getConfig(config, 'header.sticky'));

    };

    /*Methods*/
    self.setHeaderCenter = function (content) {
        if(typeof content === 'object' && ('__typeofcomponent' in content) && content.__typeofcomponent === RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL){
            content.init(self, LayoutEvents);
            self.$header_center.html(content.html());
        }else
            self.$header_center.html(content);
    };
    self.setHeaderLeft = function (content) {
        if (Array.isArray(content)) {
            self.$header_left.html();
            content.map(function (el) {
                if (el instanceof RxFlexModal.HeaderButton) {
                    el.init(self, LayoutEvents);
                    self.$header_left.append(el.html())
                }
            });
        }else {
            self.$header_left.html(content);
        }
    };
    self.setHeaderRight = function (content) {
        if (Array.isArray(content)) {
            self.$header_right.html();
            content.map(function (el) {
                if (el instanceof RxFlexModal.HeaderButton) {
                    el.init(self, LayoutEvents);
                    self.$header_right.append(el.html())
                }
            });
        }else {
            self.$header_right.html(content);
        }
    };
    self.setSticky = function (sticky) {
        _sticky = sticky;
        if (_sticky) {
            var header_height = self.getConfig(config.config, 'header.height'),prevPos = 0;
            self.$content.scroll(function(){
                if(_sticky) {
                    var m = parseInt(self.$header.css('margin-top'));
                    self.$header.css('margin-top', Math.min(0, Math.max((header_height * (-1)), m - (this.scrollTop - prevPos))));
                    prevPos = this.scrollTop;
                }
            });
        }else {
            self.$header.css('margin-top',0);
        }
    };

    /*Getters*/
    self.getHeaderCenter = function () {
        return self.$header_center;
    };
    self.getHeaderLeft = function () {
        return self.$header_left;
    };
    self.getHeaderRight = function () {
        return self.$header_right;
    };
};
RxFlexModal.Layout.defaultConfig = {
    popup_config: {
        position: RxFlexModal.CONST.POSITION_CENTER,
        close_on_backdrop_click: true
    },
    config: {
        header: {
            visible: true,
            sticky:false,
            height: 70,
            title: "",
            close_button: false,
            back_button: false,
            right: [],
            left: null
        },
        footer: {
            visible: false,
            height: 70
        },
        center: null
    }
};
RxFlexModal.Promise = Promise;
RxFlexModal.HeaderButton = function (params) {
    var self = this, $html = null;
    this.init = function (Layout, LayoutEvents) {
        if (params.type === 'icon') {
            $html = $('<span class="' + params.icon + '"></span>');
        }
        if (params.type === 'button') {
            $html = $('<button class="rx__flex_modal__header__button">' + params.text + '</button>');
        }
        if ($html && params.dispatchEvent) {
            $html.click(function (e) {
                LayoutEvents.dispatch(params.dispatchEvent, e)
            })
        }
        if ($html && params.ref) {
            Layout.refs[params.ref] = $html;
        }
    };
    this.html = function () {
        return $html;
    };
    this.__typeofcomponent = RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL;
};
RxFlexModal.HorizontalScrollableElement = function (params) {
    var self = this, $html = null;
    this.init = function (Layout, LayoutEvents) {
        $html = $('<div class="rx__flex_modal__HorizontalScrollableElement"></div>');

        if(typeof params.renderItem === 'function' && Array.isArray(params.items)){
            params.items.map(function (item,index) {
                var $item = $('<div class="rx__flex_modal__HorizontalScrollableElement_item"></div>');
                $item.css('width',params.width || 100);
                $item.html(params.renderItem(item,index) || "");
                $item.click(function (e) {
                    LayoutEvents.dispatch(params.dispatchEvent_item_click, e)
                });
                $html.append($item);
            });
        }
        if ($html && params.ref) {
            Layout.refs[params.ref] = $html;
        }
    };
    this.html = function () {
        return $html;
    };

    this.__typeofcomponent = RxFlexModal.CONST.TYPE_OF_COMPONENT_MODAL;
};
RxFlexModal.RxListenerManager = function () {
    var events = {};
    var eventStates = {};

    this.on = function (eventName, callback) {
        events[eventName] && events[eventName].push(callback);
        (!events[eventName]) && (events[eventName] = [callback]);
    };

    this.dispatch = function (_eventName, _param) {
        var eventName = Array.prototype.shift.apply(arguments);
        var main_arguments = arguments;
        if (!!events[eventName] && Array.isArray(events[eventName])) {
            events[eventName].map(function (fn) {
                fn.apply(null, main_arguments);
            });
            eventStates[eventName] = (+eventStates[eventName] || 0) + 1;
        }
    };

    this.clear = function () {
        events = {};
        eventStates = {};
    };
};
RxFlexModal.init();