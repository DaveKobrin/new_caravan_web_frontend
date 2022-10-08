import CardImg from './CardImg';
import './Card.css';

const Card = (props) => {
  const { card, idx, isFaceUp, onClick } = props;
  const API = process.env.REACT_APP_CARAVAN_API;
  return (
    <>
      {/* {console.log(card, idx, isFaceUp)} */}
      <div
        className='card'
        onClick={() => {
          onClick(idx);
        }}
      >
        {isFaceUp ? <CardImg src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} /> : <CardImg src={API + '/images/' + card.back} alt={'Card Back ' + card.set} isFace={false} />}
      </div>
    </>
  );
};

export default Card;
