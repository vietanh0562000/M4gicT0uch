
import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
import { CardController } from './CardController';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameController
 * DateTime = Wed Feb 09 2022 10:14:10 GMT+0700 (Indochina Time)
 * Author = anhdv56
 * FileBasename = GameController.ts
 * FileBasenameNoExtension = GameController
 * URL = db://assets/scripts/GameController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('GameController')
export class GameController extends Component {
    // * FIELDs
    @property(Node)
    private gameArea: Node = null;
    @property(Prefab)
    private cardPrefab: Prefab = null;
    // TODO: import list art for various cards

    public static instance: GameController = null;
    private cardList: Array<Node>;

    // * LIFECYCLE FUNCTIONs
    onLoad(){
        if (GameController.instance === null){
            GameController.instance = this;
        }
    }

    start(){
        this.cardList = new Array<Node>();
        let newCard = instantiate(this.cardPrefab);
        this.gameArea.addChild(newCard);
        this.cardList.push(newCard);
    }

    // * PRIVATE FUNCTIONs
    // TODO: function spawner. random card number.

    // * PUBLIC FUNCTIONs
    /**
     * * Find and destroy all card has name equal with nameCard
     * @param nameCard 
     */
    public destroyCards(nameCard: string){
        // * Get array of cards will be destroy
        let cardsDestroy = this.cardList.filter(card => card.getComponent(CardController).getNameCard() === nameCard);

        // * Hide card instead of destroying for reusing
        // TODO: Each card should be called for showing destroy particles
        cardsDestroy.forEach(card => {
            card.getComponent(CardController).destroyCard();
        })
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
