import css from './ImageGalleryItem.module.css';


export function Item({ image, handlerImgClick }) {
  const { webformatURL, tags, id } = image;

  return (
    <li key={id} className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItem__image}
        onClick={handlerImgClick}
      />
    </li>
  );
}
