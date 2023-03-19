import CardImg from './CardImg';
import './PlayerStatus.css';
import { useContext } from 'react';
import { DragContext, GameContext } from '../App';

const PlayerStatus = (props) => {
    const { owner, playerCards } = props
    const { hand, drawPile, discardPile } = playerCards;  
    const { isFaceUp } = props;
    const { gameData, setGameData } = useContext(GameContext);
    const { dragData, setDragData } = useContext(DragContext);
    const API = process.env.REACT_APP_CARAVAN_API;

  const dragEnter = (e) => {
    // e.preventDefault();
    if((gameData.isPlayer1Turn && owner === 'player2') || (!gameData.isPlayer1Turn && owner === 'player1') ) { return; }
    const tmpDragData = {...dragData};
    const targetLoc = [owner === 'player1' ? 'p1Cards':'p2Cards', 'discardPile' ];
    tmpDragData.dragTarget = targetLoc;
    tmpDragData.targetCallback = dragDropDiscard;
    setDragData(tmpDragData);
    // console.log({tmpDragData}, JSON.stringify(gameData), {owner});
  }

  const dragLeave = (e) => {
    setTimeout(()=>{
        // e.preventDefault();
        const tmpDragData = {...dragData};
        // console.log({tmpDragData}, 'here');
        tmpDragData.dragTarget = null;
        tmpDragData.targetCallback = null;
        setDragData(tmpDragData);
    },1000);
  }

  const dragDropDiscard = (e, data) => {
    // e.preventDefault();
    const tmpDragData = {...data};
    const tmpGameData = {...gameData};
    
    // find source and dest locations
    let dropLoc = tmpGameData;
    tmpDragData.dragTarget.forEach(el => {
        dropLoc = dropLoc[el];
    });
    let srcLoc = tmpGameData;
    tmpDragData.dragItem.srcLoc.forEach(el => {
        srcLoc = srcLoc[el];
    });

    if (tmpDragData.dragItem.srcLoc[tmpDragData.dragItem.srcLoc.length -1] === 'hand') {
      // console.log({dragData}, {data}, 'in discard');
      if((gameData.isPlayer1Turn && owner === 'player1') || (!gameData.isPlayer1Turn && owner === 'player2') ) {
        // move dragged item
        // add item to new location
        dropLoc.push(srcLoc[tmpDragData.dragItem.idx]);
        // remove item from old location
        srcLoc.splice(tmpDragData.dragItem.idx, 1);
        setGameData(tmpGameData);
        // console.log( JSON.stringify(gameData), 'before handleEndMove');
        if (gameData.phase === 2) {   
          // don't process end of turn in init phase allow to draw cards if player doesn't have any number cards to play... 
          // need to revisit this to prevent player from stacking their hand at start of game
          gameData.handleEndMove(tmpGameData);
        }
        // console.log({gameData}, 'after handleEndMove');
      }
    } else if (tmpDragData.dragItem.srcLoc[0] === 'caravans' && gameData.phase === 2) {
      // discarding entire caravan 
      if((gameData.isPlayer1Turn && owner === 'player1') || (!gameData.isPlayer1Turn && owner === 'player2') ) {
        // move dragged item
        // add item to new location
        dropLoc.push(srcLoc[tmpDragData.dragItem.idx]);
        // remove item from old location
        tmpGameData.caravans[tmpDragData.dragItem.srcLoc[1]].cards = [];
        // srcLoc.splice(tmpDragData.dragItem.idx, 1);
        setGameData(tmpGameData);
        // console.log( JSON.stringify(gameData), 'before handleEndMove');
        gameData.handleEndMove(tmpGameData);
        // console.log({gameData}, 'after handleEndMove');
      }
    }
    // clear dragging info as player is not dragging anymore
    tmpDragData.dragTarget = null;
    tmpDragData.dragItem = null;

    setDragData(tmpDragData);
  }

  const dragStart = (e, idx) => {
    // e.preventDefault();
    const tmpDragData = {...dragData};
    if((gameData.isPlayer1Turn && owner === 'player1') || (!gameData.isPlayer1Turn && owner === 'player2') ) {
        // set drag item info
        tmpDragData.dragItem = {};
        tmpDragData.dragItem.srcLoc = [gameData.isPlayer1Turn?'p1Cards':'p2Cards', 'hand'];
        tmpDragData.dragItem.idx = idx;
        tmpDragData.dragItem.isModifier = hand[idx].isModifier;
        tmpDragData.dragItem.name = hand[idx].name;
    }
    setDragData(tmpDragData);
    console.log({dragData});
  }

  const dragEnd = (e) => {
    // e.preventDefault();
    // console.log('dropping', {dragData});
    const tmpDragData = {...dragData}   //drag target in dragData was restting to null before access in callback
    if (dragData.targetCallback) dragData.targetCallback(e, tmpDragData);
  }

  return (
    <div className='player-status'>
        {console.log({gameData}, "in player-status return")}
        <div className='hand'>
            {hand.map((card, idx)=>{
                return (
                    <div key={idx} className='hand_card' draggable onDragStart={(e)=>{dragStart(e, idx)}} onDragEnd={(e)=>{dragEnd(e)}}>
                        {isFaceUp?<CardImg key={idx} src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} /> : <CardImg key={idx} src={API + '/images/' + card.back} alt={'Card Back ' + card.set} isFace={false} />}
                    </div>
                )
            })}
        </div>
        <div className='draw-and-discard'>
            <div className='drawPile'>
                {drawPile.length>0 ? <CardImg src={API + '/images/' + drawPile[drawPile.length-1].back} alt={'Card Back ' + drawPile[drawPile.length-1].set} isFace={false} /> : null }
            </div>
            <div className='discard' onDragEnter={(e)=>{dragEnter(e)}} onDragLeave={(e)=>{dragLeave(e)}}>
                
                {discardPile.length>0 ? <CardImg src={API + '/images/' + discardPile[discardPile.length-1].back} alt={'Card Back ' + discardPile[discardPile.length-1].set} isFace={false} /> : null }
            </div>
        </div>
    </div>
  );
};

export default PlayerStatus;
