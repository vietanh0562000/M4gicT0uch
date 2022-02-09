
import { _decorator, Component, Node, Enum, Vec3 } from 'cc';
import { Common } from './Common';
import { Constants } from './Constants';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = CardController
 * DateTime = Wed Feb 09 2022 10:14:23 GMT+0700 (Indochina Time)
 * Author = anhdv56
 * FileBasename = CardController.ts
 * FileBasenameNoExtension = CardController
 * URL = db://assets/scripts/CardController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 * * This class control behavior of a card. (Move, hide, destroy)
 */

@ccclass('CardController')
export class CardController extends Component {
    // * FIELDs
    @property(String)
    private nameCard: string = null;
    @property(Number)
    private point: number = 0;
    @property({type: Common.CARD_PROP})
    private cardProp: number = Common.CARD_PROP.HEART;

    @property(Number)
    private speed: number = 1;

    // * LIFECYCLE FUNCTIONs
    update(dt: number){
        // * move card down to ground
        let vecMove = new Vec3(0, Constants.BASE_CARD_SPEED * this.speed * dt * -1, 0);
        this.node.translate(vecMove);
    }

    // * PUBLIC FUNCTIONs
    public getNameCard(): string{
        return this.nameCard;
    }

    // TODO: show paricle when destroy. after that hide card and add card to pool object
    public destroyCard(){
        this.node.active = false;
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
