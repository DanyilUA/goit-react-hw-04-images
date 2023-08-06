import { imageFetch } from 'utilities/fetch';
import { useState, useEffect } from 'react';
import SearchBar from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { toast } from 'react-toastify';
import Modal from 'components/Modal/Modal';

export default function AppImage() {

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [hitsPerPage, setHitsPerPage] = useState(12);


  useEffect(() => {

      if (inputValue.trim() === '') {
        return;
      }

      imageFetch(inputValue, currentPage)
        .then(data => {
          if (data.hits.length === 0) {
            toast.error('thats a great plan Walter that a genius plan');
            setLoading(false);

          } else {
        setImages(prevState => [...prevState, ...data.hits]);
            setLoading(false);
            setTotalHits(data.totalHits);
          }
        })
        .catch(error => {
          console.error('Error fetching images:', error);
          setLoading(false);
        });
    
  }, [inputValue, currentPage]);


  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setCurrentPage(1);
  };

  const buttonLoadMore = () => {
    setLoading(true);
    setCurrentPage(prevState => prevState + 1);
  };

  const handlerImgClick = largeImageURL => {
    setLargeImageURL(largeImageURL)
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };


    const lastPage = Math.ceil(totalHits / hitsPerPage);
    const showLoadMoreButton = currentPage < lastPage && !loading && images.length > 0;

    return (
      <div>
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery
          images={images}
          onClick={handlerImgClick}
          handlerImgClick={handlerImgClick}
        />
        {showLoadMoreButton && <Button onClick={buttonLoadMore} />}
        {showModal && (
          <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
        )}
        {loading && <Loader />}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
