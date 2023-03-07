import { useContext } from "react";
import './GameBoard.css';
import { GameContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CaravanPair, PlayerStatus } from '../components';


const LocalGame = () => {
    const { gameData, setGameData } = useContext(GameContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // const handleDiscard = (idx) => {
    //     const tmpGame = {...gameData};
    //     // let hand, drawPile;
    //     if(gameData.isPlayer1Turn) 
    //         ({ hand, drawPile, discardPile } = tmpGame.p1Cards); 
    //     else
    //         ({ hand, drawPile, discardPile } = tmpGame.p2Cards);
    //     discardPile.push(hand[idx]);     
    //     hand.splice(idx,1);
    //     if(drawPile.length > 0)
    //         hand.push(drawPile.pop());
    //     setGameData(tmpGame);
    // };

    const handleDraw = () => {
        const tmpGame = {...gameData};
        let hand, drawPile;
        if(gameData.isPlayer1Turn) 
            ({ hand, drawPile } = tmpGame.p1Cards); 
        else
            ({ hand, drawPile } = tmpGame.p2Cards); 
        if(drawPile.length > 0)
            hand.push(drawPile.pop());
        setGameData(tmpGame);
    }

    const randomize = (array) => {
        for(let i=0; i<array.length; i++){
            let tmp = array[i];
            let pos = Math.floor(Math.random()*array.length);
            array[i] = array[pos];
            array[pos] = tmp
        }
        return array;
    }

    useEffect(()=>{
        const tmpGame = {...gameData};
        tmpGame.caravanNames = ['DAYGLOW', 'NEW RENO', 'THE HUB', 'BONEYARD', 'REDDING', 'SHADY SANDS'];
        tmpGame.gamePhases = ['bet', 'init', 'turns', 'over'];
        tmpGame.player1 = user;
        tmpGame.player2 = tmpGame.otherPlayer;
        tmpGame.isGameOver = false;
        tmpGame.isPlayer1Turn = true;
        tmpGame.phase = 1;
        tmpGame.p1Cards = {hand:[], drawPile: randomize([...tmpGame.player1.deck]), discardPile:[]};
        tmpGame.p2Cards = {hand:[], drawPile: randomize([...tmpGame.player2.deck]), discardPile:[]};
        tmpGame.caravans = tmpGame.caravanNames.map((name, i) => {
            const caravan = {
                name: name,
                value: 0,
                isSold: false,
                cards: [],
                owner: i<3?'player1':'player2',
                hasDirection: false,
                isAscending: null,
                curRunValue: null,
                hasSuit: false,
                curSuit: null,
                nextValuePos: 0,
                nextModifierPos: [],
            }
            return caravan;
        });
        for(let i=0; i<8; i++){ // initial draw for both players
            tmpGame.p1Cards.hand.push(tmpGame.p1Cards.drawPile.pop());
            tmpGame.p2Cards.hand.push(tmpGame.p2Cards.drawPile.pop());
        }
        // tmpGame.handleDiscard = handleDiscard;
        tmpGame.handleDraw = handleDraw;
        setGameData(tmpGame);
    },[]);

    return (
        <section>
            {gameData.phase === 1 || gameData.phase === 2?
            <div className="game-container">
                <div className="play-field">
                    <CaravanPair idx1={gameData.isPlayer1Turn?3:0} idx2={gameData.isPlayer1Turn?0:3} />
                    <CaravanPair idx1={gameData.isPlayer1Turn?4:1} idx2={gameData.isPlayer1Turn?1:4} />
                    <CaravanPair idx1={gameData.isPlayer1Turn?5:2} idx2={gameData.isPlayer1Turn?2:5} />
                </div>
                <div className="status-area">
                    <div className={'rotate-180'} >
                        <PlayerStatus isFaceUp={false} owner={gameData.isPlayer1Turn?'player2':'player1'} playerCards={gameData.isPlayer1Turn?gameData.p2Cards:gameData.p1Cards} />
                    </div>
                    <div>
                        <PlayerStatus isFaceUp={true} owner={gameData.isPlayer1Turn?'player1':'player2'} playerCards={gameData.isPlayer1Turn?gameData.p1Cards:gameData.p2Cards} />
                    </div>  
                </div>
            </div>:null}
        </section>
    );
}

export default LocalGame;
