import React, { useState } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

const NewCardForm = (props) => {

  const [formFields, setFormFields] = useState({
    text: '',
    emoji: '',
  });

  const onInputChange = (event) => {
    const newFormFields = {...formFields};
    newFormFields[event.target.name] = event.target.value;
    setFormFields(newFormFields);
  };

  return (
    <form className="new-card-form">
      <h3 className="new-card-form__header">Add Card</h3>
    <div>
      <label className="new-card-form__form-label" htmlFor="text">Text:</label>
      <input className="new-card-form__form-textarea" name="text" onChange={onInputChange}/>
    </div>
    <div>
      <label className="new-card-form__form-label" htmlFor="emoji">Emoji:</label>
      <input className="new-card-form__form-textarea" name="emoji" onChange={onInputChange}/>
    </div>
    <input className="new-card-form__form-button"
      type="submit"
      value="Add Card"
    />
  </form>
  );

};

NewCardForm.propTypes = {
  boardName: PropTypes.string.isRequired,
  addCardCallBack: PropTypes.func.isRequired,
};

export default NewCardForm;