import css from './ImageGalleryItem.module.css';


export function Item({ image, handlerImgClick }) {
  const { webformatURL, tags, id } = image;

  return (
    <li key={id} className={css.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImage}
        onClick={handlerImgClick}
      />
    </li>
  );
}
