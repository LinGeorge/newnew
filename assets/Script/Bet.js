// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    ctor:function(){ // 要讓他能.active，驗先用constructor(reference by playerInfo)
        this.button = null;
    },

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.button = cc.find("button", this.node);
    },

    start () {

    },

    threeButtonClick(){
        global.socket.emit("betButton", global.uid, 1);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 0);
    },
    sixButtonClick(){
        global.socket.emit("betButton", global.uid, 2);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 1);
    },
    nineButtonClick(){
        global.socket.emit("betButton", global.uid, 3);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 2);
    },
    twelveButtonClick(){
        global.socket.emit("betButton", global.uid, 4);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 3);
    },
    fifteenButtonClick(){
        global.socket.emit("betButton", global.uid, 5);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 3);
    },
    // update (dt) {},
});
