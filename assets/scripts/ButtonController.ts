
import { _decorator, Component, Node } from 'cc';
import { GameController } from './GameController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ButtonController
 * DateTime = Wed Feb 09 2022 11:15:23 GMT+0700 (Indochina Time)
 * Author = anhdv56
 * FileBasename = ButtonController.ts
 * FileBasenameNoExtension = ButtonController
 * URL = db://assets/scripts/ButtonController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 * * This class control a button (when player press button) and its properties
 */
 
@ccclass('ButtonController')
export class ButtonController extends Component {
    // * FIELDs
    @property(String)
    private buttonName: string = null;

    // * PUBLIC FUNCTIONs
    /**
     * * Call to game controller for destroying card and getting point
     */
    public pressed(){
        GameController.instance.destroyCards(this.buttonName);
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
