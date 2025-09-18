import Thumbnail from '../thumbnail/Thumbnail';
import './Home.css';
import { itemImages } from '../../code-cafe-resources/items';
import PropTypes from 'prop-types';
import ItemType from '../../types/ItemType';

const Home = ({items}) => {
  return (
    <div className="home-component">
      {items.map((item)=> (
          <Thumbnail
              key={item.itemId}
              image={itemImages[item.imageId]}
              title={item.title}
              itemId={item.itemId}
          />
      ))}
    </div>
  )
}

Home.propTypes = {
  items: PropTypes.arrayOf(ItemType).isRequired,
};

export default Home;
