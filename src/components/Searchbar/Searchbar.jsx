import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export default function SearchBar({onSubmit}) {
  const [imageName, setImageName] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Where is the money Lebowski');
      return;
    }
    onSubmit(imageName);
    setImageName('');
  };

  const handleNameChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          name="imageName"
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
