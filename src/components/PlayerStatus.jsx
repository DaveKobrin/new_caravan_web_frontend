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
    console.log({tmpDragData}, {gameData}, {owner});
  }

  const dragLeave = (e) => {
    setTimeout(()=>{
        // e.preventDefault();
        const tmpDragData = {...dragData};
        console.log({tmpDragData}, 'here');
        tmpDragData.dragTarget = null;
        tmpDragData.targetCallback = null;
        setDragData(tmpDragData);
    },1);
  }

  const dragDropDiscard = (e, data) => {
    // e.preventDefault();
    const tmpDragData = {...data};
    console.log({dragData}, {data}, 'in discard');
    if((gameData.isPlayer1Turn && owner === 'player1') || (!gameData.isPlayer1Turn && owner === 'player2') ) {
        // move dragged item
        // add item to new location
        const tmpGameData = {...gameData};
        let dropLoc = tmpGameData;
        tmpDragData.dragTarget.forEach(el => {
            dropLoc = dropLoc[el];
        });
        let srcLoc = tmpGameData;
        tmpDragData.dragItem.srcLoc.forEach(el => {
            srcLoc = srcLoc[el];
        });
        dropLoc.push(srcLoc[tmpDragData.dragItem.idx]);
        // remove item from old location
        srcLoc.splice(tmpDragData.dragItem.idx, 1);
        setGameData(tmpGameData);
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
    }
    setDragData(tmpDragData);
    console.log({tmpDragData});
  }

  const dragEnd = (e) => {
    // e.preventDefault();
    // console.log('dropping', {dragData});
    const tmpDragData = {...dragData}   //drag target in dragData was restting to null before access in callback
    if (dragData.targetCallback) dragData.targetCallback(e, tmpDragData);
  }

  return (
    <div className='player-status'>
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
