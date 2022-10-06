import Card from './Card';
import './CardSlider.css';

const CardSlider = (props) => {
  const { offset, isDeck, cardsInDeck, ownedCards, onClick } = props;

  return (
    <div className='slider'>
      {ownedCards.map((card, idx) => {
        return idx >= offset && idx < offset + 7 ? <Card key={idx} card={card} idx={idx} isFaceUp={(cardsInDeck[idx] && isDeck) || (!cardsInDeck[idx] && !isDeck) ? true : false} onClick={onClick} /> : null;
      })}
    </div>
  );
};

export default CardSlider;
