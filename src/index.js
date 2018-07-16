var text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem consectetur cupiditate delectus dicta distinctio doloribus est eveniet exercitationem explicabo fuga harum illum iure libero maiores nam natus neque nesciunt nihil obcaecati odit officia pariatur quaerat quam quas, quibusdam quisquam ratione reiciendis rem repellat sapiente sed suscipit tempora ut, velit vero voluptatum. Accusamus aliquam amet cupiditate eaque minus quidem sapiente sed, veniam. Dolor, exercitationem, repellendus! At atque commodi delectus dolorem modi officiis provident quaerat ratione sint, voluptate. Aperiam culpa dolor dolores ea, facere illo inventore ipsam provident quaerat quo, quod recusandae ullam. Ab ad consectetur cumque dolores earum exercitationem explicabo id ipsum iste iusto laudantium minima minus molestiae natus necessitatibus nisi nostrum nulla quam, qui quibusdam rerum sequi sit? Adipisci aut consequatur fuga nemo voluptate. Accusamus aspernatur assumenda aut beatae blanditiis debitis dolore ea, eius explicabo iure magnam nobis nostrum obcaecati odit officiis perferendis provident quae recusandae sequi, ullam? Ad adipisci aliquam aliquid animi beatae cumque cupiditate deserunt dicta dolores, facere facilis hic ipsa mollitia non obcaecati odio possimus quam quasi quibusdam reiciendis repellat rerum, sint velit veniam voluptatum? Amet architecto at autem beatae debitis delectus doloremque excepturi expedita fuga fugit minima mollitia odit, praesentium quia, velit. Aspernatur et ipsum sit suscipit ullam voluptas voluptate. Accusantium aspernatur beatae consequatur corporis cupiditate dolorem eligendi est id ipsa maxime molestiae necessitatibus nisi nobis qui quo, rem rerum sed tenetur vitae voluptates? Aliquam, amet aspernatur culpa cupiditate, eaque eveniet id magni molestias, mollitia neque officia perspiciatis quia saepe sunt ullam vel voluptatem. Cumque deserunt dicta dolores earum ipsa quasi saepe sapiente. Amet commodi ea magnam quae tenetur? Asperiores, commodi consequatur cumque eligendi facilis labore molestiae neque nihil obcaecati officiis optio perspiciatis placeat possimus sed soluta! Amet deleniti, doloribus earum expedita maiores molestias necessitatibus officia repellendus reprehenderit sapiente. Alias, asperiores blanditiis, consectetur eius eligendi eos esse incidunt iure magnam neque odio officiis quibusdam reiciendis repellendus repudiandae! Alias amet animi architecto aut cumque deleniti dicta dignissimos distinctio doloremque ea eum excepturi illum ipsum laudantium magnam molestiae, molestias natus nesciunt nisi, obcaecati perferendis perspiciatis praesentium quas quasi repellendus repudiandae suscipit vel voluptate voluptatem voluptatum? Ab accusantium ad adipisci alias aperiam consequatur deserunt doloremque eligendi esse facere fugiat illum in incidunt iusto laboriosam minima natus necessitatibus neque non numquam pariatur perferendis porro, quis quod ratione recusandae rem repellendus rerum sit voluptatem! Adipisci alias amet animi, asperiores beatae consequatur culpa deserunt distinctio dolor est ex facere illo illum inventore ipsam iure laudantium libero maxime, molestiae mollitia natus nemo neque nobis numquam odio officia quis quisquam repellendus repudiandae soluta suscipit totam ullam veritatis? Adipisci commodi, doloribus eos illo itaque odio optio praesentium sed! Ab ad, autem cum dolores, earum est eveniet ipsa ipsam laudantium libero nesciunt nisi non odio odit perspiciatis soluta unde. Cumque dolorum, ea ipsa officiis pariatur vitae. Ab, aliquam atque aut beatae cumque distinctio dolore enim, eos esse id in inventore ipsa iste itaque magnam minima molestiae nam rem sequi similique tenetur unde voluptas! Amet animi commodi ea earum eius esse facere reiciendis repellendus similique voluptate.';

var page2 = new RxFlexModal.Layout({
    config: {
        permanently: true,
        header: {
            visible: true,
            height: 70,
            title: "consectetur adipisicing elit.",
            back_button: true,
            right: [
                new RxFlexModal.HeaderButton({
                    type: "button",
                    text: "cancel",
                    dispatchEvent: "cancel_click",
                    ref: "cancelBtn"
                }),
                new RxFlexModal.HeaderButton({
                    type: "button",
                    text: "save",
                    dispatchEvent: "save_click",
                    ref: "saveBtn"
                })
            ],
        },
    },
    content_script: function (Layout) {
        Layout.setContent(new RxFlexModal.Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(`<p id='pp11' style='padding: 5px'>${text}<button class='push'>Push</button></p>`);
            }, 1000);
        }));


        Layout.$wrapper.on('click', '.push', function (e) {
            Layout.$wrapper.find('#pp11').css('color', 'red');
            RxFlexModal.push(new RxFlexModal.Layout({
                config: {
                    footer: {
                        visible: true,
                        height: 80
                    },
                    header: {
                        visible: true,
                        height: 80,
                        back_button: true,
                        close_button: false,
                        title: "Page 3",
                    },
                },
            }));
        });
        Layout.on("save_click", function (e) {
            console.log(" Page 2 save_click!!!", Layout.refs.saveBtn);
        });
        Layout.on("cancel_click", function (e) {
            console.log(" Page 2 cancel_click!!!", Layout.refs.cancelBtn);
        });
    },
});
var page3 = new RxFlexModal.Layout({
    config: {
        permanently: true,
        header: {
            sticky:true,
            visible: true,
            height: 120,
            right: [
                new RxFlexModal.HeaderButton({
                    type: "icon",
                    icon: "sprtrx-icon-cancel",
                    dispatchEvent: "cancel_click",
                    ref: "cancelBtn"
                })
            ]
        },
    },
    content_script: function (Layout) {
        Layout.setContent(new RxFlexModal.Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(`<p id='pp11' style='padding: 5px'>${text}<button class='push'>Push</button></p>`);
            }, 1000);
        }));

        Layout.on("cancel_click", function (e) {
            Layout._actions.handleClose();
        });
        Layout.on("user_item_click", function (e) {
            console.log(e.target);
            Layout.loader.on();
            setTimeout(function () {
                Layout.loader.off();
            }, 1000);
        });

        Layout.$wrapper.on("click",'.push', function (e) {
            Layout.setSticky(false);
        });

        Layout.getHeaderCenter().addClass('_shadow');
        Layout.setHeaderCenter(
            new RxFlexModal.HorizontalScrollableElement({
                ref:"peoples",
                width:60,
                items:["Kalys Rysmendeev","David Blabla","test3","test4","test5","test2","test3","test4","test5","test2","test3","test4","test5","test2","test3","test4","test5"],
                renderItem: function (item) {
                    return `
                        <div class="user_item_55555">
                            <span class="user_item_55555_img"></span>
                            
                             <span class="user_item_55555_name">${item}</span>
                           
                        </div>
                        `;
                },
                dispatchEvent_item_click:"user_item_click"
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