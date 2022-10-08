import './CaravanPair.css';
import { Caravan } from './';
import { GameContext } from '../App'
import { useContext } from 'react';

const CaravanPair = (props) => {
    const { gameData } = useContext(GameContext);
    const { idx1, idx2 } = props;
  return (
    <div className='caravan-pair'>
        <div className={'rotate-180'}>
            <Caravan idx={idx1}/>
        </div>
        <h2>{gameData.caravans[idx1].name}</h2>
        <h2>{gameData.caravans[idx2].name}</h2>
        <div>
            <Caravan idx={idx2}/>
        </div>
    </div>
  );
};

export default CaravanPair;
