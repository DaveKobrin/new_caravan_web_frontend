import { useContext } from "react";
import './GameBoard.css';
import { GameContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { CaravanPair, PlayerStatus } from '../components';


const LocalGame = () => {
    const { gameData, setGameData } = useContext(GameContext);
    const { user } = useContext(UserContext);
    // const navigate = useNavigate();

    const calcCaravanValue = (cards) => {
        let value = 0;
        // calc the actual value
        // cards will be an array of arrays that hold card data elements
        return value;
    }

    const calcAllCaravans = (data) => {
        console.log({gameData}, "in calcAllCaravans")
        const tmpGameData = {...data};
        const { caravans } = tmpGameData;
        // debugger;
        caravans.forEach(caravan => caravan.value = calcCaravanValue(caravan.cards));
        setGameData(tmpGameData);
    }

    const checkForWin = (data) => {
        const {p1Cards, p2Cards, caravans} = data;
        if (p1Cards.hand.length === 0) return 2; // player 2 has won
        if (p2Cards.hand.length === 0) return 1; // player 1 has won
        let p1wins=0;
        let p2wins=0;
        if (((caravans[0].value > 20 && caravans[0].value < 27) || (caravans[3].value > 20 && caravans[3].value < 27)) && (caravans[0].value !== caravans[3].value)) {
            // first caravan is complete
            if ((caravans[0].value < 27) && (caravans[0].value > caravans[3].value)) {
                p1wins++;
            } else {
                p2wins++;
            }
        }
        if (((caravans[1].value > 20 && caravans[1].value < 27) || (caravans[4].value > 20 && caravans[4].value < 27)) && (caravans[1].value !== caravans[4].value)) {
            // second caravan is complete
            if ((caravans[1].value < 27) && (caravans[1].value > caravans[4].value)) {
                p1wins++;
            } else {
                p2wins++;
            }
        }
        if (((caravans[2].value > 20 && caravans[2].value < 27) || (caravans[5].value > 20 && caravans[5].value < 27)) && (caravans[2].value !== caravans[5].value)) {
            // third caravan is complete
            if ((caravans[2].value < 27) && (caravans[2].value > caravans[5].value)) {
                p1wins++;
            } else {
                p2wins++;
            }
        }
        if((p1wins >= 2) && (p1wins + p2wins === 3)) return 1; //player 1 wins
        if((p2wins >= 2) && (p1wins + p2wins === 3)) return 2; //player 2 wins
        return 0; // no winner yet
    }

    const handleEndMove = (data) => {
        console.log(JSON.stringify(data), "in handleEndMove")
        // calc caravan values
        calcAllCaravans(data);
        // check for win conditions
        const winner = checkForWin(data);
        if ( winner === 0) {
            const tmpGame = {...data};
            // if phase = 1 'init'
            if (tmpGame.phase === 1){
                // check if all caravans are started
                // YES - move to phase 2 'turns'
                let numStarted = 0;
                tmpGame.caravans.forEach(caravan  => caravan.value > 0 ? numStarted++ : null);
                if(numStarted === 6){
                    tmpGame.phase = 2; 
                }
            }
            // if hand.length < 5 && drawpile.length > 0
            // draw a card
            let hand, drawPile;
            if(tmpGame.isPlayer1Turn) 
                ({ hand, drawPile } = tmpGame.p1Cards); 
            else
                ({ hand, drawPile } = tmpGame.p2Cards); 
            if(hand.length < 5 && drawPile.length > 0)
                hand.push(drawPile.pop());
            // toggle isPlayer1Turn
            tmpGame.isPlayer1Turn = !tmpGame.isPlayer1Turn;
            setGameData(tmpGame);
            console.log({tmpGame}, 'in handleEndMove')
        } else {
            // handleWin(winner);
        }

        // let hand, drawPile, discardPile;
        // if(gameData.isPlayer1Turn) 
        //     ({ hand, drawPile, discardPile } = tmpGame.p1Cards); 
        // else
        //     ({ hand, drawPile, discardPile } = tmpGame.p2Cards);
        // discardPile.push(hand[idx]);     
        // hand.splice(idx,1);
        // if(drawPile.length > 0)
        //     hand.push(drawPile.pop());
    };

    // const handleDraw = () => {
    //     const tmpGame = {...gameData};
    //     setGameData(tmpGame);
    // }

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
        tmpGame.handleEndMove = handleEndMove;
        // tmpGame.handleDraw = handleDraw;
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
