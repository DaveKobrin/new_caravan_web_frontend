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
            if (tmpDragData.dragItem.isModifier) {
                if (cards[row].length === 0) {      //cannot drop modifier on empty row
                    return; 
                }
                targetLoc = ['caravans', caravan, 'cards', row]; //set drop target for a modifier on this row
                console.log({tmpDragData}, targetLoc, 'set target for a modifier card in dragEnter');
            } else {    //card is a value card
                targetLoc = ['caravans', caravan, 'cards']; //set drop target for a new card row
                console.log({tmpDragData}, targetLoc, 'set target for a new CardRow in dragEnter');
            }
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
        <div onDragEnter={dragEnter} onDragLeave={dragLeave} >
            {cards.map((card,i)=><CardImg key={i} src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} />)}
        </div>
    );
};

export default CardRow;
