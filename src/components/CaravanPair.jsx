import './CaravanPair.css';
import {Caravan} from './';

const CaravanPair = (props) => {
//   const {  } = props;
  return (
    <div className='caravan-pair'>
        <div className={'rotate-180'}>
            <Caravan />
        </div>
        <h2>Label 1</h2>
        <h2>Label 2</h2>
        <div>
            <Caravan />
        </div>
    </div>
  );
};

export default CaravanPair;
