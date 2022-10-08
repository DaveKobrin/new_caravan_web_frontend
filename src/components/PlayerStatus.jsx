import CardImg from './CardImg';
import './PlayerStatus.css';
const PlayerStatus = (props) => {
  const { hand, drawPile } = props.playerCards;  
  const { isFaceUp } = props;
  const API = process.env.REACT_APP_CARAVAN_API;
  return (
    <div className='player-status'>
        <div className='hand'>
            {hand.map((card, idx)=>{
                return (
                    isFaceUp?<CardImg key={idx} src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} /> : <CardImg key={idx} src={API + '/images/' + card.back} alt={'Card Back ' + card.set} isFace={false} />
                )
            })}
        </div>
        <div className='draw-and-discard'>
            <div className='drawPile'>
                {drawPile.length>0 ? <CardImg src={API + '/images/' + drawPile[drawPile.length-1].back} alt={'Card Back ' + drawPile[drawPile.length-1].set} isFace={false} /> : null }
            </div>
            <div className='discard'>
                Discard Pile
            </div>
        </div>
    </div>
  );
};

export default PlayerStatus;
