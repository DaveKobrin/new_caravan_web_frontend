import { CardRow } from './';
import { GameContext, DragContext } from '../App';
import { useContext } from 'react';

const Caravan = (props) => {
    const { gameData, setGameData } = useContext(GameContext);
    const { dragData, setDragData } = useContext(DragContext);

    const { idx } = props;
    const caravan = {...gameData.caravans[idx]};

    const dragEnter = (e) => {
        // e.preventDefault();
        console.log('start of drag enter')
        if ((gameData.isPlayer1Turn && caravan.owner !== 'player1') || (!gameData.isPlayer1Turn && caravan.owner !== 'player2')) return; // initial space only available for the caravan's owner
        const tmpDragData = {...dragData};
        if( caravan.cards.length === 0 && !tmpDragData.dragItem.isModifier) { //initial location only accepts a value card
            const targetLoc = ['caravans', idx, 'cards']; //set drop target for first card in a caravan
            tmpDragData.dragTarget = targetLoc;
            tmpDragData.targetCallback = dragDropCaravan;
            setDragData(tmpDragData);
            console.log({tmpDragData}, {caravan}, 'in dragEnter');
        }
    }
    
      const dragLeave = (e) => {
        setTimeout(()=>{
            // e.preventDefault();
            const tmpDragData = {...dragData};
            console.log({tmpDragData}, 'dragLeave');
            tmpDragData.dragTarget = null;
            tmpDragData.targetCallback = null;
            setDragData(tmpDragData);
        },1000);
      }
    
      const dragDropCaravan = (e, data) => {
        // e.preventDefault();
        const tmpDragData = {...data};
        console.log({dragData}, {data}, 'in dragDropCaravan');
        if((gameData.isPlayer1Turn && caravan.owner === 'player1') || (!gameData.isPlayer1Turn && caravan.owner === 'player2') ) {
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
            dropLoc.push([srcLoc[tmpDragData.dragItem.idx]]);
            // remove item from old location
            srcLoc.splice(tmpDragData.dragItem.idx, 1);
            setGameData(tmpGameData);
            console.log( JSON.stringify(gameData), 'before handleEndMove');
            gameData.handleEndMove(tmpGameData);
            console.log({gameData}, 'after handleEndMove');
        }
        // clear dragging info as player is not dragging anymore
        tmpDragData.dragTarget = null;
        tmpDragData.dragItem = null;
    
        setDragData(tmpDragData);
      }

    return (
        <div className='caravan' onDragEnter={dragEnter} onDragLeave={dragLeave}>
            {caravan.cards.length?
                caravan.cards.map((cardRow,i) => <CardRow key={i} cards={cardRow} row={i} className='card-row' />) 
                : (<div className='drop-target'>Start Here</div>)
            }
        </div>
    );
};

export default Caravan;
