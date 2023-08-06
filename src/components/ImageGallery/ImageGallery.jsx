import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { Item } from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ handlerImgClick, images }) {
  return (
    <div className={css.container}>
      <ul className={css.imageGallery}>
        {images.map(image => (
          <Item
            image={image}
            key={image.id}
            handlerImgClick={() => handlerImgClick(image.largeImageURL)}
          />
        ))}
      </ul>
    </div>
  );
}


ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  handlerImgClick: PropTypes.func.isRequired,
};
