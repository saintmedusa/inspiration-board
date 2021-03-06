
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';

const reformatData = (data) => {
  return data.map((element) => {
    return element.card;
  });
};

const Board = (props) => {

  const [cardList, setCardList] = useState([]);

  const endPoint = `${props.url}${props.boardName}/cards`

  const getCards = (url) => {
    axios.get(url)
      .then((response) => {
        const apiCardList = reformatData(response.data);
        setCardList(apiCardList);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  useEffect(() => { getCards(endPoint); }, [endPoint]);

  const deleteCallBack = (cardID) => {
    const newCardList = [];
    console.log(cardList);
    cardList.forEach((card) => {
      if (card.id === cardID) {
        // axios call to remove this card
        axios.delete(`https://inspiration-board.herokuapp.com/cards/${cardID}`)
          .then((response) => {
            console.log(`Card # ${cardID} deleted.`);
          })
          .catch((error) => {
            console.log(`Couldn't delete card # ${cardID}`);
          });
      } else {
        newCardList.push(card);
      }
    });
    return setCardList(newCardList);
  };

  const formatCards = cardList.map((card) => {

    return (
      <Card
        key={card.id}
        id={card.id}
        text={card.text}
        emoji={card.emoji}
        deleteCallBack={deleteCallBack}
      />
    );
  });

  //setCardList(formatCards);

  const addCardCallBack = (newCard) => {
    const updatedData = [newCard, ...cardList];
    setCardList(updatedData);
    axios.post(endPoint, newCard)
      .then((response) => {
        console.log("New card added.");
      })
      .catch((error) => {
        console.log("New card couldn't be added.");
      });
  };

  return (
    <main>
      <div className="board">
        {formatCards}
      </div>
      <div>
        <NewCardForm
          boardName={props.boardName}
          addCardCallBack={addCardCallBack}
        />
      </div>
    </main>
  );
};
Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired,
};

export default Board;
