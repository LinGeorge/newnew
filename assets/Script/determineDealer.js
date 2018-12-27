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
        playerInfo: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this.button = cc.find("button", this.node);
        global.EventListener.on("dealerButton", function (factor) {
            self.button.active = false;
            global.socket.emit("dealerButton", global.uid, factor);
        });

    },

    start () {

    },
    noButtonClick(){
        global.socket.emit("dealerButton", global.uid, 0);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 0);
    },
    oneButtonClick(){
        global.socket.emit("dealerButton", global.uid, 1);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 1);
    },
    doubleButtonClick(){
        global.socket.emit("dealerButton", global.uid, 2);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 2);
    },
    tripleButtonClick(){
        global.socket.emit("dealerButton", global.uid, 3);
        this.button.active = false;
        //global.EventListener.fire("dealerButton", 3);
    },

    // update (dt) {},
});
