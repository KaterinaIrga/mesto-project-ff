export function createCard(cardData, delCard, likeCard, cardTemplate) {

  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = newCard.querySelector('.card__delete-button');  
  const likeButton =   newCard.querySelector('.card__like-button'); 
  const imageLink = new URL(cardData.link, import.meta.url);

  newCard.querySelector('.card__image').src = imageLink;   
  newCard.querySelector('.card__image').alt = cardData.name; 
  newCard.querySelector('.card__title').textContent = cardData.name;
  deleteButton.addEventListener('click', 
                                () => delCard(deleteButton)
                               ) 
  likeButton.addEventListener('click', 
                              () => likeCard(likeButton)
                            )
  return newCard;
}

export function deleteCard (btn) {
  const delItem = btn.closest('.card');
  delItem.remove();
}

export function likeCard(elem) {
  return elem.classList.add('card__like-button_is-active'); 
}