import './Card.css';
const CardImg = (props) => {
  const { src, alt, isFace } = props;
  return <img crossOrigin='use-credentials' src={src} alt={alt} className={isFace ? 'face' : 'back'} />;
};

export default CardImg;
