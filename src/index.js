import {createCard, deleteCard, likeCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {clearValidation, enableValidation} from './components/validation.js';
import {validationConfig} from './components/ValidationConfig.js';
import logoImg from './images/logo.svg';
import './index.css';
import {getUserInfo, getCardsData, checkAvatarLink, saveProfileData, saveNewCardData, setUserAvatar} from './components/api.js';

const page = document.querySelector('.page');
const profile = page.querySelector('.profile');
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;


//Todo: обернуть вызов в промис и в этом же промисе запрлнить глобавльную переменную с iduser . 
//сначала все генерим, потом заполняем переменную
createPage();

let popupProfileIsCreated = false;
let popupAvatarIsCreated = false;
let popupCardIsCreated = false;


document.querySelector('.header__logo').src = logoImg;

function avatarMouseOver() {
const editLink = new URL('./images/edit-icon.svg', import.meta.url);

profile.querySelector('.profile__image-edit')
  .style = `background-image : url('${editLink}'), linear-gradient(rgba(0,0,0, 0.5), rgba(0,0,0, 0.5))`;
}

function avatarMouseOut() {
  profile.querySelector('.profile__image-edit').style = `background-image: none;`;
}

function createProfile(profile, userData) {
  const avatarButton = profile.querySelector('.profile__image-edit');
  updateProfile(profile, userData);
  profile.querySelector('.profile__edit-button').addEventListener('click', openModalProfile);
  avatarButton.addEventListener('click', openModalAvatar);
  avatarButton.addEventListener('mouseover', () => {avatarMouseOver()});
  avatarButton.addEventListener('mouseout', () => {avatarMouseOut()});
  console.log('Профиль успешно создан.');
}

function updateProfile(profile, userData) {
  profile.querySelector('.profile__title').textContent = userData.name;
  profile.querySelector('.profile__description').textContent = userData.about;
  profile.querySelector('.profile__image').style = `background-image: url('${userData.avatar}')`;  
}

function createCards(cardsData, idUser) {
  let newCard;

  //ToDo: Сюда иногда приходит пустой объект
//console.log(cardsData)


  Array.from(cardsData).forEach(card => { 
    newCard = createCard(card, deleteCard, likeCard, cardTemplate, openModalImage, idUser);
    placesList.append(newCard); 
  });
  console.log('Карточки успешно загружены.');
}

function updateCards(cardsData, idUser) {
  Array.from(cardsData).forEach(card => { 
    placesList.append(createCard(card, deleteCard, likeCard, cardTemplate, openModalImage, idUser)); 
  });
}

function createPage() {
  const cardAddButton = page.querySelector('.profile__add-button');

  cardAddButton.addEventListener('click', openModalNewCard);

  //ToDo: Переписать all через массив возвращаемых результатов, а вызовы обоих промисов выше убрать.


  Promise.all([getUserInfo(), getCardsData()])
  .then((result) => {
                      createProfile(profile, result[0]);
                      createCards(result[1], result[0]._id);
                      enableValidation(validationConfig); 
                    }) 
  .catch((err) => {console.log(err)});                       
}

function openModalProfile() {
  const elem = openModal(document.querySelector('.popup_type_edit')); 
  const formElement = elem.querySelector(`.${validationConfig.formSelector}`);
  if (!popupProfileIsCreated) {
    popupProfileIsCreated = true;
    formElement.addEventListener('submit',  saveData);
  } else {
    const inputName = elem.querySelector('.popup__input_type_name');
    const inputDescription = elem.querySelector('.popup__input_type_description');  
    clearValidation(formElement, validationConfig); //очистим значения сообщений об ошибке  
    inputName.textContent = '';
    inputDescription.textContent = '';
    inputDescription.placeholder = document.querySelector('.profile__description').textContent;
    inputName.placeholder = document.querySelector('.profile__title').textContent;
  }  
}

function openModalAvatar() {
  const elem = openModal(document.querySelector('.popup_type_avatar')); 
  const formElement = elem.querySelector(`.${validationConfig.formSelector}`);
  if (!popupAvatarIsCreated) {
    popupAvatarIsCreated = true;
    formElement.addEventListener('submit',  saveData);
  } else {
    clearValidation(formElement, validationConfig); //очистим значения сообщений об ошибке
  }  
}

function openModalNewCard() {
  const elem = openModal(document.querySelector('.popup_type_new-card'));
  const formElement = elem.querySelector(`.${validationConfig.formSelector}`);
  if (!popupCardIsCreated) {
    popupCardIsCreated = true;
    formElement.addEventListener('submit',  saveData);
  } else {
    const inputNewCard = elem.querySelector('.popup__input_type_card-name');
    const inputUrl = elem.querySelector('.popup__input_type_url');
    inputNewCard.textContent = '';
    inputUrl.textContent = '';  
    clearValidation(formElement, validationConfig); //очистим значения сообщений об ошибке  
  }  
}

function openModalImage(e) {
  const cardElem = document.querySelector('.card');
  const buttonLike = cardElem.querySelector('.card__like-button');
  if ((e.currentTarget === cardElem) && (e.target !== buttonLike) ) {
    const elem = openModal(document.querySelector('.popup_type_image'));
    elem.querySelector('.popup__image').src = cardElem.querySelector('.card__image').getAttribute('src');
    elem.querySelector('.popup__caption').textContent = cardElem.querySelector('.card__title').textContent;
    e.stopPropagation();
  }  
}

export function changeButtonContent(btn, btnContent) {
  btn.textContent = btnContent;
}

export function saveData(e) {
  e.preventDefault();
  const formElem = e.target;

  changeButtonContent(formElem.querySelector(`.${validationConfig.submitButtonSelector}`), 'Сохранение...');
  const promiseSave = new Promise((resolve, reject) => {
    switch (formElem.getAttribute('name')) {
      case 'edit-avatar': {
        Promise.all([ checkAvatarLink(formElem.elements.avatar.value), setUserAvatar(formElem.elements.avatar.value) ])
          .then((result) => {
                              updateProfile(profile, result[1]);
                              resolve('Сохранить');
                            }) 
          .catch((err) => {console.log('setUserAvatar, checkAvatarLink error', err); 
                            reject(new Error('Где-то произошла ошибка...'));});
                    
        break;
      }
      case 'edit-profile': {
        saveProfileData(formElem.elements.name.value, formElem.elements.description.value)
          .then((result) => {updateProfile(profile, result);
                             closeModal(formElem.closest(`.${validationConfig.popupSelector}`));
                              resolve('Сохранить');
          })
          .catch(err => {console.log('saveProfileData error', err); reject(new Error('Где-то произошла ошибка...'));});
          
        break;
      }
      case 'new-place': {
        const newCardData = {
          name:formElem.elements['place-name'].value,
          link: formElem.elements.link.value
        };     
        saveNewCardData(newCardData)
          .then((result) => {
                              placesList.prepend(createCard(
                                                            result, 
                                                            deleteCard, 
                                                            likeCard, 
                                                            cardTemplate, 
                                                            openModalImage, 
                                                            result.owner._id
                                                          ));
                              closeModal(formElem.closest(`.${validationConfig.popupSelector}`));
                              resolve('Сохранить');
                            })
          .catch((err) => {console.log(err); reject(new Error('Где-то произошла ошибка...'));});
   
        break;
      }
      default: {
        e.stopPropagation();
        }
  }});
  promiseSave
    .then(() => {
      console.log('Данные успешно сохранены.');      
    })
    .finally(() => { changeButtonContent(formElem.querySelector(`.${validationConfig.submitButtonSelector}`), 'Сохранить'); })
    .then(() => { closeModal(formElem.closest(`.${validationConfig.popupSelector}`)); })
    .catch(err => {console.log(err)})
    
}



