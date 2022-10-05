import { useContext } from "react";
// import UserContext from "../contexts/UserContext";
import { GameContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const LocalGame = () => {
    const { gameData, setGameData } = useContext(GameContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleDiscard = (idx) => {
        const tmpGame = {...gameData};
        let hand, drawPile;
        if(gameData.isPlayer1Turn) 
            ({ hand, drawPile } = tmpGame.p1Cards); 
        else
            ({ hand, drawPile } = tmpGame.p2Cards); 
        hand.splice(idx,1);
        if(drawPile.length > 0)
            hand.push(drawPile.pop());
        setGameData(tmpGame);
    };

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
        tmpGame.phase = 0;
        tmpGame.p1Cards = {hand:[], drawPile: randomize([...tmpGame.player1.deck])};
        tmpGame.p2Cards = {hand:[], drawPile: randomize([...tmpGame.player2.deck])};
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
                curSuit: null
            }
            return caravan;
        });
        for(let i=0; i<8; i++){ // initial draw for both players
            tmpGame.p1Cards.hand.push(tmpGame.p1Cards.drawPile.pop());
            tmpGame.p2Cards.hand.push(tmpGame.p2Cards.drawPile.pop());
        }
        tmpGame.handleDiscard = handleDiscard;
        tmpGame.handleDraw = handleDraw;
        setGameData(tmpGame);
    },[]);

    return (
        <section>
            <h1>LocalGame page</h1>
        </section>
    );
}

export default LocalGame;
