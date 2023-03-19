import { CardImg } from './';
import { GameContext, DragContext } from '../App';
import { useContext } from 'react';


const CardRow = (props) => {
    const { cards, row, caravan } = props;
    const API = process.env.REACT_APP_CARAVAN_API;
    const { gameData, setGameData } = useContext(GameContext);
    const { dragData, setDragData } = useContext(DragContext);
    // const { caravan } = {...gameData.caravans[idx]}
    
    const dragEnter = (e) => {
        // e.preventDefault();
        console.log('start of drag enter in CardRow')
        const tmpDragData = {...dragData};
        if (tmpDragData.dragItem.srcLoc[tmpDragData.dragItem.srcLoc.length -1] === 'hand') {    //can only drop cards from your hand
            let targetLoc = [];
            // debugger;
            if (tmpDragData.dragItem.isModifier && cards.length === 0) {
                return;     //cannot drop modifier on empty row
            }

            targetLoc = ['caravans', caravan, 'cards']; //set drop target for a new card row
            
            if (tmpDragData.dragItem.name === 'Queen') {     //Queen applies to last card row
                tmpDragData.dragTargetRow = gameData.caravans[caravan].cards.length-1;
            } else {    // other modifiers apply to selected row
                tmpDragData.dragTargetRow = row;
            }
            
            console.log({tmpDragData}, targetLoc, 'set target for a new CardRow in dragEnter');

            tmpDragData.dragTarget = targetLoc;
            tmpDragData.targetCallback = dragDropCardRow;
            setDragData(tmpDragData);
        }
    }
    
    const dragLeave = (e) => {
        setTimeout(()=>{
            // e.preventDefault();
            const tmpDragData = {...dragData};
            console.log({tmpDragData}, 'CardRow dragLeave');
            tmpDragData.dragTarget = null;
            tmpDragData.targetCallback = null;
            setDragData(tmpDragData);
        },1000);
    }

    const dragDropCardRow = (e, data) => {
        // e.preventDefault();
        const tmpDragData = {...data};
        console.log({dragData}, {data}, 'in dragDropCardRow');
        const tmpGameData = {...gameData};
        
        let dropLoc = tmpGameData;
        tmpDragData.dragTarget.forEach(el => {
            console.log({dropLoc})
            dropLoc = dropLoc[el];
        });
        let srcLoc = tmpGameData;
        tmpDragData.dragItem.srcLoc.forEach(el => {
            srcLoc = srcLoc[el];
        });
        
        if (tmpDragData.dragItem.isModifier) {
            //do the modifier specific code
            //KING - push to this row
            if (tmpDragData.dragItem.name === 'King') {
                dropLoc[tmpDragData.dragTargetRow].push(srcLoc[tmpDragData.dragItem.idx]);
                srcLoc.splice(tmpDragData.dragItem.idx, 1);
            }
            //JACK - remove this row
            if (tmpDragData.dragItem.name === 'Jack') {
                //TODO: place dropLoc's value card into owner's discard pile
                dropLoc.splice(tmpDragData.dragTargetRow, 1);
                //TODO: place JACK into owner's discard pile
                srcLoc.splice(tmpDragData.dragItem.idx, 1);
                
            }
            //QUEEN - reverse direction and change suit to match this queen
            if (tmpDragData.dragItem.name === 'Queen') {
                dropLoc[tmpDragData.dragTargetRow].push(srcLoc[tmpDragData.dragItem.idx]);
                srcLoc.splice(tmpDragData.dragItem.idx, 1);
                //TODO: process direction and suit change
            }
            //JOKER - on ace - remove all value cards of the ace's suit from the board OTHER than THIS ace
            //      - on any other value card - remove all cards of that value from board OTHER than THIS card 
            if (tmpDragData.dragItem.name === 'Red Joker' || tmpDragData.dragItem.name === 'Black Joker') {
                dropLoc[tmpDragData.dragTargetRow].push(srcLoc[tmpDragData.dragItem.idx]);
                srcLoc.splice(tmpDragData.dragItem.idx, 1);
                //TODO: process the removal of other cards
            }
        } else {
            //handle a value card
            // move dragged item
            // add item to new location
            dropLoc.push([srcLoc[tmpDragData.dragItem.idx]]);
            // remove item from old location
            srcLoc.splice(tmpDragData.dragItem.idx, 1);

        }
        setGameData(tmpGameData);
        gameData.handleEndMove(tmpGameData);
        tmpDragData.dragTarget = null;
        tmpDragData.dragItem = null;
        setDragData(tmpDragData);
    }

    return (
        <div onDragEnter={dragEnter} onDragLeave={dragLeave} className={'caravan-row-card'}>
            {cards.map((card,i)=><CardImg key={i} src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} />)}
        </div>
    );
};

export default CardRow;
