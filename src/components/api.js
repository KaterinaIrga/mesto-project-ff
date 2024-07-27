const authorization = '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac';
const baseUrl = 'https://nomoreparties.co/v1/pwff-cohort-1/';

export const getUserInfo = function() {
  return fetch(`${baseUrl}users/me`, {
    method: 'GET', 
    headers: {
      authorization: authorization
    }
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен getUserInfo.');
  });
}

export function switchLikesForCard(idCard, like) {  
  const fetchMethod = like ? 'PUT' : 'DELETE';
  return fetch(`${baseUrl}cards/likes/${idCard}`, {
    method: fetchMethod,
    headers: {
      authorization: authorization
    }
  })
    .then(res => {if(res.ok) {return res.json();}})
    .then(result => {return result})
}

export const getCardsData = function() {
  return fetch(`${baseUrl}cards`, {
    method: 'GET',
    headers: {
      authorization: authorization 
    }
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен getCardsData.');
  });
}

export function SetUserAvatar(url) {
  
  return fetch(`${baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result})
  .catch(err => {console.log(`Ого! Что-то пошло не так: ${err}...`)})
}

export function getCardData(idCard) {
  return fetch(`${baseUrl}cards/${idCard}`, {
    method: 'GET',
    headers: {
      authorization: authorization 
    }
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result})
  .catch(err => console.log(err))
}

export function saveNewCardData(CardData) {
  return fetch(`${baseUrl}cards`, {
    method:'POST',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: CardData.name,
      link: CardData.link
    })
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result})
}

export function saveProfileData(name, description) {
  return fetch(`${baseUrl}users/me`, {
    method: 'PATCH',
    headers: {
      authorization: authorization,
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => { return result;})
  .catch(err => {console.log(err)})
}

export function dropCard(idCard) {
  return fetch(`${baseUrl}cards/${idCard}`, {
    method: 'DELETE',
    headers: {
      authorization: authorization,
    }
  })
  .then(res => {if(res.ok) {return res.json();}})
  .then(result => {return result;})
  .catch(err => {console.log(err);})
}