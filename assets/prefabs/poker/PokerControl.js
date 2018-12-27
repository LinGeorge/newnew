var config = require("config")

cc.Class({
    extends: cc.Component,

    // 創建property名為cardInfo，他包含可不可以被點選，被點選還是沒被點選，還有是甚麼card
    ctor: function () {

        this.CardInfo = {
            canselect: true,
            selected: false,
            data: null
        };
    },


    properties: {
        pokerTxt: { // 卡片上方的數字
            default: null,
            type: cc.Sprite
        },
        pokerTxt1: { // 卡片下方的數字
            default: null,
            type: cc.Sprite
        },

        pokerType: {// 卡片上方的圖案
            default: null,
            type: cc.Sprite
        },
        pokerType_1: {// 卡片下方的圖案
            default: null,
            type: cc.Sprite
        },

        pokerType2: {// 卡片中間的圖案 或是 金卡背 或是 狀態底框
            default: null,
            type: cc.Sprite
        },

        pokerBackGround: {// 卡片白底
            default: null,
            type: cc.Sprite
        },
        status: {// 狀態顯示，比如一倍、不搶、四倍...，若顯示狀態，上方所有node要全關
            default: null,
            type: cc.Sprite
        }

    },

    //展示poker
    //若cardInfo是null，代表要顯示牌背
    //若cardInfo是{showTxt: ,showType: ,No:}-牌型
    // 若cardInfo是"string"-status
    setCard:function(cardInfo,canselect) { // 判斷

        if (typeof (cardInfo) == "string") {
            this.showstatus(cardInfo);
        }
        else {
            this.showPoker(cardInfo, canselect);
        }
    },


    showPoker: function (showData, canselect) {

        if (showData == null) {
            this.showPokerBack();
            return;
        }

        var self = this;

        self.node.opacity = 0;
        self.CardInfo.data = showData;
        self.CardInfo.canselect = canselect;
        var showType = showData.showType;
        self.pokerType.enabled = true;
        self.pokerType2.enabled = true;
        self.pokerTxt.enabled = true;
        self.pokerTxt1.enabled = true;
        self.pokerType_1.enabled = true;
        self.pokerBackGround.enabled = true;
        self.status.enabled = false;
        var imgUrl = "S-S"; // 小黑陶
        var imgUrl2 = "S";  // 大黑陶
        var textUrl = "KD-" + showData.showTxt; // 黑色數字
        var backUrl = "PC"; // 卡片正面(內容面)
        if (showType == config.pokerCardType.spade) { // 黑陶
            imgUrl = "S-S";
            switch (showData.showTxt) {
                case "J":
                    imgUrl2 = "KJ";
                    break;
                case "Q":
                    imgUrl2 = "KQ";
                    break;
                case "K":
                    imgUrl2 = "KK";
                    break;
                default:
                    imgUrl2 = "S";
                    break;
            }
            textUrl = "KD-" + showData.showTxt;
        } else if (showType == config.pokerCardType.hearts) {
            switch (showData.showTxt) {
                case "J":
                    imgUrl2 = "RJ";
                    break;
                case "Q":
                    imgUrl2 = "RQ";
                    break;
                case "K":
                    imgUrl2 = "RK";
                    break;
                default:
                    imgUrl2 = "H";
                    break;
            }
            imgUrl = "H-S";
            textUrl = "RD-" + showData.showTxt;
        } else if (showType == config.pokerCardType.redslice) {
            switch (showData.showTxt) {
                case "J":
                    imgUrl2 = "RJ";
                    break;
                case "Q":
                    imgUrl2 = "RQ";
                    break;
                case "K":
                    imgUrl2 = "RK";
                    break;
                default:
                    imgUrl2 = "B";
                    break;
            }
            imgUrl = "B-S";
            textUrl = "RD-" + showData.showTxt;
        }
        else if (showType == config.pokerCardType.laizi) {

            imgUrl = "T-S";
            imgUrl2 = "T";
            textUrl = "RD-" + showData.showTxt;

        } else if (showType == config.pokerCardType.blackberry) {

            switch (showData.showTxt) {
                case "J":
                    imgUrl2 = "KJ";
                    break;
                case "Q":
                    imgUrl2 = "KQ";
                    break;
                case "K":
                    imgUrl2 = "KK";
                    break;
                default:
                    imgUrl2 = "P";
                    break;
            }
            imgUrl = "P-S";
            textUrl = "KD-" + showData.showTxt;
        } else if (showType == config.ghostCardType.bigG) {
            self.pokerType.enabled = false;
            self.pokerType_1.enabled = false;
            textUrl = "RD-JOCKER";
            imgUrl2 = "RJO";
        } else if (showType == config.ghostCardType.smallG) {
            self.pokerType.enabled = false;
            self.pokerType_1.enabled = false;
            textUrl = "KD-JOCKER";
            imgUrl2 = "KJO";
        }


        cc.loader.loadRes('landlord/card/Cards', cc.SpriteAtlas, function (err, atlas) {
            self.pokerBackGround.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(backUrl);

            cc.loader.loadRes('landlord/card/Cards', cc.SpriteAtlas, function (err, atlas) {
                self.pokerType.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(imgUrl);
                self.pokerType_1.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(imgUrl);


                cc.loader.loadRes('landlord/card/Cards', cc.SpriteAtlas, function (err, atlas) {
                    self.pokerTxt.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(textUrl);
                    self.pokerTxt1.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(textUrl);


                    cc.loader.loadRes('landlord/card/Cards', cc.SpriteAtlas, function (err, atlas) {
                        self.pokerType2.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(imgUrl2);

                        self.node.opacity = 255;

                    })
                })
            })
        })

    },
    showPokerBack: function () {


        var self = this;
        self.CardInfo.data = null;
        self.CardInfo.canselect = false;
        self.pokerType.enabled = false;
        self.pokerType_1.enabled = false;
        self.pokerType2.enabled = false;
        self.pokerTxt.enabled = false;
        self.pokerTxt1.enabled = false;
        self.status.enabled = false;
        var imgUrl = "BK";


        cc.loader.loadRes('card/Cards', cc.SpriteAtlas, function (err, atlas) {
            self.pokerBackGround.getComponent(cc.Sprite).spriteFrame = atlas.getSpriteFrame(imgUrl);
        })
    },
    showstatus: function (status) {

        var self = this;
        self.CardInfo.data = status;
        self.CardInfo.canselect = false;
        self.pokerType.enabled = false;
        self.pokerType_1.enabled = false;
        self.pokerType2.enabled = false;
        self.pokerBackGround.enabled = false;
        self.pokerTxt.enabled = false;
        self.pokerTxt1.enabled = false;

        cc.loader.loadRes("newnew/text/" + status, cc.SpriteFrame, function (err, spriteFrame) {
            self.status.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        })
    },
    showcardtype: function(status, frame){
        var self = this;
        self.CardInfo.data = status;
        self.CardInfo.canselect = false;
        self.pokerType.enabled = false;
        self.pokerType_1.enabled = false;
        self.pokerType2.enabled = true;
        self.pokerBackGround.enabled = false;
        self.pokerTxt.enabled = false;
        self.pokerTxt1.enabled = false;

        cc.loader.loadRes("newnew/Prize/Award_text_" + status, cc.SpriteFrame, function (err, spriteFrame) {
            self.status.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        });
        cc.loader.loadRes("newnew/Prize/Award_frame_0" + frame, cc.SpriteFrame, function (err, spriteFrame) {
            self.pokerType2.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        });
    },
    showresult: function(status){
        var self = this;
        self.CardInfo.data = status;
        self.CardInfo.canselect = false;
        self.pokerType.enabled = false;
        self.pokerType_1.enabled = false;
        self.pokerType2.enabled = true; // award frame
        self.pokerBackGround.enabled = false;
        self.pokerTxt.enabled = false;
        self.pokerTxt1.enabled = false;

        cc.loader.loadRes("newnew/Prize/Award_frame_" + status, cc.SpriteFrame, function (err, spriteFrame) {
            self.pokerType2.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        });
        cc.loader.loadRes("newnew/Prize/Award_text_" + status, cc.SpriteFrame, function (err, spriteFrame) {
            self.status.getComponent(cc.Sprite).spriteFrame = spriteFrame;

        });

    },
    onLoad: function () {

        var self = this;


        this.pokerBackGround.node.on('mouseenter', function (event) {

            if (event.getButton() == null) return;

            if (self.CardInfo.selected == false) {
                self.select();
            }
            else {
                self.unselect();
            }
        });

        this.pokerBackGround.node.on('touchstart', function (event) {

            if (self.CardInfo.selected == false) {
                self.select();
            }
            else {
                self.unselect();
            }
        });

        this.pokerBackGround.node.on('mousedown', function (event) {

            //if (event.getButton() == null) return;

            if (self.CardInfo.selected == false) {
                self.select();
            }
            else {
                self.unselect();
            }
        });

        this.pokerType2.node.on('mousedown', function (event) {

            //if (event.getButton() == null) return;

            if (self.CardInfo.selected == false) {
                self.select();
            }
            else {
                self.unselect();
            }
        });

    },

    unselect() {
        if (this.CardInfo.canselect == false) return;
        this.CardInfo.selected = false;
        this.node.setPositionY(0);
    },
    select() {
        if(this.CardInfo.canselect == false)return;
        this.CardInfo.selected = true;
        this.node.setPositionY(20);
    },
    getValue() {
        return this.CardInfo.data;
    }


});
