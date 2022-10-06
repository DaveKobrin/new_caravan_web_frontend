import { useState } from 'react';
import CardSlider from './CardSlider';
import './DoubleCardSlider.css';

const DoubleCardSlider = (props) => {
  const { ownedCards, cardsInDeck, onClick } = props;
  const [offset, setOffset] = useState(0);

  const handleScrollLeft = () => {
    let tmp = offset - 7;
    tmp = tmp >= 0 ? tmp : 0;
    setOffset(tmp);
  };

  const handleScrollRight = () => {
    let tmp = offset + 7;
    tmp = tmp < ownedCards.length - 7 ? tmp : ownedCards.length - 7;
    setOffset(tmp);
  };

  return (
    <div>
      <div className='double-slider-container'>
        <div className='left-arrow' onClick={handleScrollLeft}></div>
        <div className='double-slider-body'>
          <CardSlider offset={offset} isDeck={true} cardsInDeck={cardsInDeck} ownedCards={ownedCards} onClick={onClick} />
          <CardSlider offset={offset} isDeck={false} cardsInDeck={cardsInDeck} ownedCards={ownedCards} onClick={onClick} />
        </div>
        <div className='right-arrow' onClick={handleScrollRight}></div>
      </div>
      <ul>
        <li>Select cards from the bottom row to be placed into your deck</li>
        <li>Click the card on the top row to be removed from your deck</li>
      </ul>
    </div>
  );
};

export default DoubleCardSlider;
