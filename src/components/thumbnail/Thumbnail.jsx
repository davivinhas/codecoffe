import './Thumbnail.css';
import PropTypes from 'prop-types';

function Thumbnail({image , title}) {
  return (
    <>
    <a 
      href="#todo"
      className='thumbnail-component'
    >
      <div>
        <img src={image} alt={title} />
      </div>
      <p>{title}</p>
    </a>
    </>
  );
}

Thumbnail.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};


export default Thumbnail
