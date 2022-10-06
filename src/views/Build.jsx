import DoubleCardSlider from '../components/DoubleCardSlider';
import { UserContext } from '../App';
import { useContext, useState, useEffect } from 'react';

const Build = () => {
  const { user, setUser } = useContext(UserContext);
  const ownedCards = user.ownedCards;
  const { deck, id } = user;
  const [cardsInDeck, setCardsInDeck] = useState(Array(ownedCards.length).fill(false));

  const compareCards = (a, b) => {
    const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Red Joker', 'Black Joker'];
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const sets = ['Standard', 'Gomorrah', 'Lucky_38', 'Sierra_Madre', 'Tops', 'Ultra-Luxe'];

    let val = names.indexOf(a.name) - names.indexOf(b.name);
    if (val !== 0) return val;
    val = suits.indexOf(a.suit) - suits.indexOf(b.suit);
    if (val !== 0) return val;
    val = sets.indexOf(a.set) - sets.indexOf(b.set);
    return val;
  };

  const findIndexOfCard = (card, array) => {
    for (const idx in array) {
      if (array[idx]._id === card._id) return idx;
    }
    return -1;
  };

  useEffect(() => {
    ownedCards.sort((a, b) => compareCards(a, b));
    const tmp = [...cardsInDeck];
    deck.forEach((el) => {
      const pos = findIndexOfCard(el, ownedCards);
      if (pos !== -1) tmp[pos] = true;
      else console.log('error!!!! card not found!!!!!');
    });
    setCardsInDeck(tmp);
  }, []);

  useEffect(() => {
    const tmp = { ...user };
    tmp.deck = cardsInDeck
      .map((el, idx) => {
        return el ? ownedCards[idx] : null;
      })
      .filter((el) => el !== null);
    setUser(tmp);
  }, [cardsInDeck]);

  const handleClick = (idx) => {
    //check if trying to add a duplicate card
    //toggle bool at cardsInDeck[idx] and store deck changes in database
    if (findIndexOfCard(ownedCards[idx], deck) !== -1 && !cardsInDeck[idx]) return;
    fetch(`${process.env.REACT_APP_CARAVAN_API}/user/deck/toggle/${id}/${ownedCards[idx]._id}`, {
      method: 'PUT',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const tmp = [...cardsInDeck];
        tmp[idx] = !tmp[idx];
        setCardsInDeck(tmp);
      });
  };

  return (
    <section>
      {/* <h2 style={{margin:'0.5em 43%'}}>Cards in Deck</h2> */}
      <DoubleCardSlider ownedCards={ownedCards} cardsInDeck={cardsInDeck} onClick={handleClick} />
      {/* <h2 style={{margin:'0.5em 43%'}}>Owned Cards</h2> */}
    </section>
  );
};

export default Build;
