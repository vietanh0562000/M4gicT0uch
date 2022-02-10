
import { _decorator, Component, Node, Prefab, instantiate, Sprite, SpriteFrame, Vec3, System } from 'cc';
import { CardController } from './CardController';
import { Common } from './Common';
import { Constants } from './Constants';
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
    @property([SpriteFrame])
    private cardSprites: SpriteFrame[] = [];
    // TODO: import list art for various cards

    public static instance: GameController = null;
    public static gameLevel: number = 1;
    private cardList: Array<Node>;
    // TODO: UI show cool down time at the beginning
    private coolDownSpawn: number = Constants.BEGINNING_COOL_DOWN;

    // * LIFECYCLE FUNCTIONs
    onLoad(){
        if (GameController.instance === null){
            GameController.instance = this;
        }
    }

    start(){
        this.cardList = new Array<Node>();
    }

    /**
     * * Update game every frame
     * @param dt 
     */
    update(dt: number){
        this.coolDownSpawn -= dt;
        // * spawn a new card every time cool down to 0
        if (this.coolDownSpawn <= 0){
            this.coolDownSpawn = 1 / GameController.gameLevel;
            this.spawnNewCard();
        }
    }

    // * PRIVATE FUNCTIONs
    private spawnNewCard(){
        // * random card id
        let randomCardId = Math.floor(Math.random() * (this.cardSprites.length - 1)) + 1;

        // * spawn new card
        let newCard = instantiate(this.cardPrefab);
        let randomPos = new Vec3(Constants.GAMEPLAY_SCREEN * Math.random(), newCard.position.y, newCard.position.z);
        newCard.setPosition(randomPos);
        this.gameArea.addChild(newCard);
        this.cardList.push(newCard);

        // * change card according to id
        newCard.getComponent(CardController).init(
            this.cardSprites[randomCardId],
            randomCardId.toString(),
            randomCardId,
            Common.CARD_PROP.HEART
        );

        console.log(newCard.getComponent(CardController).getNameCard());
    }

    // * PUBLIC FUNCTIONs
    /**
     * * Find and destroy all card has name equal with nameCard
     * @param nameCard 
     */
    public destroyCards(nameCard: string){
        // * Get array of cards will be destroy
        let cardsDestroy = this.cardList.filter(card => card.getComponent(CardController).getNameCard() === nameCard);

        // * Hide card instead of destroying for reusing
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
