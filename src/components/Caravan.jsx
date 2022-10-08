import { CardRow } from './';
import { GameContext } from '../App';
import { useContext } from 'react';

const Caravan = (props) => {
    const { gameData } = useContext(GameContext);
    const { idx } = props;
    const caravan = {...gameData.caravans[idx]};

    // 

    return (
        <div className='caravan'>
            {caravan.cards.length?
                caravan.cards.map((cardRow,i) => <CardRow key={i} cards={cardRow} row={i} className='card-row' />) 
                : (<div className='drop-target'>Start Here</div>)
            }
        </div>
    );
};

export default Caravan;
