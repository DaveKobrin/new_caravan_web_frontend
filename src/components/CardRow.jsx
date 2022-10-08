import { CardImg } from './';


const CardRow = (props) => {
    const { cards, row } = props;
    const API = process.env.REACT_APP_CARAVAN_API;
    return (
        <div>
            {cards.map((card,i)=><CardImg key={i} src={API + '/images/' + card.face} alt={card.name + ' of ' + card.suit} isFace={true} />)}
        </div>
    );
};

export default CardRow;
