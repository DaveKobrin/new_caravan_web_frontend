import CardImg from './CardImg';
import './Card.css';

const Card = (props) => {
  const { card, idx, isFaceUp, onClick } = props;
  return (
    <>
      {/* {console.log(card, idx, isFaceUp)} */}
      <div
        className='card'
        onClick={() => {
          onClick(idx);
        }}
      >
        {isFaceUp ? <CardImg src={process.env.REACT_APP_CARAVAN_API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} /> : <CardImg src={process.env.REACT_APP_CARAVAN_API + '/images/' + card.back + '.png'} alt={'Card Back ' + card.set} isFace={false} />}
      </div>
    </>
  );
};

export default Card;
