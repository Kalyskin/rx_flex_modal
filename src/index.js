var text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem consectetur cupiditate delectus dicta distinctio doloribus est eveniet exercitationem explicabo fuga harum illum iure libero maiores nam natus neque nesciunt nihil obcaecati odit officia pariatur quaerat quam quas, quibusdam quisquam ratione reiciendis rem repellat sapiente sed suscipit tempora ut, velit vero voluptatum. Accusamus aliquam amet cupiditate eaque minus quidem sapiente sed, veniam. Dolor, exercitationem, repellendus! At atque commodi delectus dolorem modi officiis provident quaerat ratione sint, voluptate. Aperiam culpa dolor dolores ea, facere illo inventore ipsam provident quaerat quo, quod recusandae ullam. Ab ad consectetur cumque dolores earum exercitationem explicabo id ipsum iste iusto laudantium minima minus molestiae natus necessitatibus nisi nostrum nulla quam, qui quibusdam rerum sequi sit? Adipisci aut consequatur fuga nemo voluptate. Accusamus aspernatur assumenda aut beatae blanditiis debitis dolore ea, eius explicabo iure magnam nobis nostrum obcaecati odit officiis perferendis provident quae recusandae sequi, ullam? Ad adipisci aliquam aliquid animi beatae cumque cupiditate deserunt dicta dolores, facere facilis hic ipsa mollitia non obcaecati odio possimus quam quasi quibusdam reiciendis repellat rerum, sint velit veniam voluptatum? Amet architecto at autem beatae debitis delectus doloremque excepturi expedita fuga fugit minima mollitia odit, praesentium quia, velit. Aspernatur et ipsum sit suscipit ullam voluptas voluptate. Accusantium aspernatur beatae consequatur corporis cupiditate dolorem eligendi est id ipsa maxime molestiae necessitatibus nisi nobis qui quo, rem rerum sed tenetur vitae voluptates? Aliquam, amet aspernatur culpa cupiditate, eaque eveniet id magni molestias, mollitia neque officia perspiciatis quia saepe sunt ullam vel voluptatem. Cumque deserunt dicta dolores earum ipsa quasi saepe sapiente. Amet commodi ea magnam quae tenetur? Asperiores, commodi consequatur cumque eligendi facilis labore molestiae neque nihil obcaecati officiis optio perspiciatis placeat possimus sed soluta! Amet deleniti, doloribus earum expedita maiores molestias necessitatibus officia repellendus reprehenderit sapiente. Alias, asperiores blanditiis, consectetur eius eligendi eos esse incidunt iure magnam neque odio officiis quibusdam reiciendis repellendus repudiandae! Alias amet animi architecto aut cumque deleniti dicta dignissimos distinctio doloremque ea eum excepturi illum ipsum laudantium magnam molestiae, molestias natus nesciunt nisi, obcaecati perferendis perspiciatis praesentium quas quasi repellendus repudiandae suscipit vel voluptate voluptatem voluptatum? Ab accusantium ad adipisci alias aperiam consequatur deserunt doloremque eligendi esse facere fugiat illum in incidunt iusto laboriosam minima natus necessitatibus neque non numquam pariatur perferendis porro, quis quod ratione recusandae rem repellendus rerum sit voluptatem! Adipisci alias amet animi, asperiores beatae consequatur culpa deserunt distinctio dolor est ex facere illo illum inventore ipsam iure laudantium libero maxime, molestiae mollitia natus nemo neque nobis numquam odio officia quis quisquam repellendus repudiandae soluta suscipit totam ullam veritatis? Adipisci commodi, doloribus eos illo itaque odio optio praesentium sed! Ab ad, autem cum dolores, earum est eveniet ipsa ipsam laudantium libero nesciunt nisi non odio odit perspiciatis soluta unde. Cumque dolorum, ea ipsa officiis pariatur vitae. Ab, aliquam atque aut beatae cumque distinctio dolore enim, eos esse id in inventore ipsa iste itaque magnam minima molestiae nam rem sequi similique tenetur unde voluptas! Amet animi commodi ea earum eius esse facere reiciendis repellendus similique voluptate.';

RxSwipeTab = function (options) {
    var $html,self = this, $tab,count_tab = 0,tab_positions = {},tab_positions_by_index = {},current_tab = options.default_tab;
    $html = $('<div class="RxSwipeTab_Wrapper"><div class="RxSwipeTab_Inner_Wrapper"></div></div>');


    for(var tab in options.tabs){
        if(!current_tab)
            current_tab = tab;
        $tab = $('<div data-tab="'+tab+'" class="RxSwipeTab_tab RxSwipeTab_tab__'+tab+'"><div class="RxSwipeTab_tab__content"></div></div>');
        $tab.find('.RxSwipeTab_tab__content').html(options.tabs[tab]);
        $html.find('.RxSwipeTab_Inner_Wrapper').append($tab);
        tab_positions[tab] = count_tab;
        tab_positions_by_index[count_tab] = tab;
        count_tab++;
    }
    console.log(tab_positions);
    $html.find('.RxSwipeTab_Inner_Wrapper').css('width',(count_tab*100)+"%");
    $html.find('.RxSwipeTab_tab').css('width',(100/count_tab)+"%");

    this.getHtml = function () {
        return $html;
    };
    var h= function(e){
        if($(e.target).closest($html).length){
            switch (e.type){
                case 'swl':
                    if(tab_positions[current_tab] < count_tab){
                        self.openTab(tab_positions_by_index[tab_positions[current_tab]+1])
                    }
                    break;
                case 'swr':
                    if(tab_positions[current_tab] > 0){
                        self.openTab(tab_positions_by_index[tab_positions[current_tab]-1])
                    }
                    break;
                case 'swd':
                    if($html.height() >= $('.RxSwipeTab_tab__'+current_tab+' .RxSwipeTab_tab__content').height()){
                        options.returnHeader && options.returnHeader();
                    }
                    break;

            }
        }
    };
    document.body.addEventListener('swl',h,false);
    document.body.addEventListener('swr',h,false);
    document.body.addEventListener('swd',h,false);


    this.openTab = function (name) {
        if(name in tab_positions){
           current_tab = name;
           var margin_left =  "-"+(tab_positions[name] * 100) +'%';
            $html.find('.RxSwipeTab_Inner_Wrapper').animate({'margin-left': margin_left}, 300)
            if($html.height() >= $('.RxSwipeTab_tab__'+current_tab+' .RxSwipeTab_tab__content').height()){
                options.returnHeader && options.returnHeader();
                $('.RxSwipeTab_tab__'+current_tab+' .RxSwipeTab_tab__content').focus();
            }
        }
    };

    this.setScrollFunction = function (fn) {
        $html.find('.RxSwipeTab_tab').scroll(fn);
    }
};


var page3 = new RxFlexModal.Layout({
    popup_config: {
        position: RxFlexModal.CONST.POSITION_LEFT,
    },
    config: {
        permanently: true,
        header: {
            sticky: true,
            visible: true,
            height: 100,
            right: [
                new RxFlexModal.HeaderButton({
                    type: "icon",
                    icon: "sprtrx-icon-cancel",
                    dispatchEvent: "cancel_click",
                    ref: "menu"
                })
            ]
        },
    },
    content_script: function (Layout) {

        var rxSwipeTab = new RxSwipeTab({
            default_tab: 'profile',
            tabs:{
                profile: text,
                stitchstream: "stitchstream tab " +text,
                feed: "feed tab",
                connected: "connected tab",
                horses: text,
            },
            returnHeader:function () {
                Layout.returnHeader();
            }
        });
        rxSwipeTab.setScrollFunction(Layout.get_scroll_function());

        Layout.setContent(rxSwipeTab.getHtml());


        Layout.on("cancel_click", function (text) {

            RxFlexModal.alert({
                text:$('<div class="sst_csf"></div>').append(
                    $('<label for="sst_csf__label">Name category:</label>')
                ).append(
                    $('<input name="category_name" id="sst_csf__input_name" class="sst_csf__input_name"/>')
                ),
                actions: [{text: "cancel", action: "cancel",color:"#555"}, {text: "ok", action: "ok"}]
            }).then(function (data) {
                console.log(data);
                data.action === 'ok' && Layout._actions.handleClose();
            })
        });

        Layout.on("menu", function (e) {
            /*Layout._actions.handleClose();*/
            RxFlexModal.menu({
                items: [
                    {text: "Lorem", action: "Lorem"},
                    {text: "ipsum", action: "ipsum"},
                    {text: "dolor", action: "dolor"},
                    {text: "consectetur", action: "consectetur"},
                    {text: "cancel", action: "cancel"},
                    {text: "ok", action: "ok"}
                ]
            }).then(function (action) {
                console.log(action);
            })
        });

        Layout.on("user_item_click", function (e) {
            var tab = $(e.target).closest('.user_profile_tabitem').data('tab');
            rxSwipeTab.openTab(tab);
        });

        Layout.$wrapper.on("click", '.push', function (e) {
            Layout.setSticky(false);
        });

        //Layout.getHeaderCenter().addClass('_shadow');
        Layout.setHeaderCenter(
            new RxFlexModal.HeaderTab({
                ref: "HeaderTab",
                items: ["Profile", "StitchStream", "Feed", "Connected", "Horses"],
                renderItem: function (item) {
                    return `
                        <div data-tab="${item.toLowerCase()}" class="user_profile_tabitem">
                            <span class="user_profile_tabitem__img"></span>

                             <span class="user_profile_tabitem_title">${item}</span>

                        </div>
                        `;
                },
                dispatchEvent_item_click: "user_item_click"
            })
        );

    },
});

$('#open_modal').click(function () {
    /*RxFlexModal.open({
        config: {
            header: {
                title: "Main page",
                close_button:true,
                right: [
                    new RxFlexModal.HeaderButton({
                        type: "icon",
                        icon: "sprtrx-icon-camera",
                        dispatchEvent: "camera_icon_click"
                    })
                ]
            },
        },
        content_script: function (Layout) {
            Layout.setContent(new RxFlexModal.Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(`
                        <p>
                            <button class='__left'>left</button>
                            <button class='__right'>right</button>
                            <button class='__center'>center</button>
                            <br>
                            <br>
                            <button class='push'>open permanently page</button>
                        </p>
                    `);
                }, 1000);
            }));

            Layout.$wrapper.on('click', '.push', function (e) {
                // Layout.loader.on();
                RxFlexModal.push(page2);
            });
            Layout.$wrapper.on('click', '.__left', function (e) {
                RxFlexModal.setPosition(RxFlexModal.CONST.POSITION_LEFT);
            });
            Layout.$wrapper.on('click', '.__right', function (e) {
                RxFlexModal.setPosition(RxFlexModal.CONST.POSITION_RIGHT);
            });
            Layout.$wrapper.on('click', '.__center', function (e) {
                RxFlexModal.setPosition(RxFlexModal.CONST.POSITION_CENTER);
            });

            Layout.on("camera_icon_click", function (e) {
                console.log("camera_icon_click!!!");
            });

        }
    });*/

    RxFlexModal.open(page3);
});