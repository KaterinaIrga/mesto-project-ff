export const getUserInfo = function() {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me', {
    method: 'GET', 
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac'
    }
  })
  .then(res => {return res.json()})
  .then(result => {return result})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен getUserInfo.');
  });
}

export function switchLikesForCard(idCard, like) {  
  const fetchMethod = like ? 'PUT' : 'DELETE';
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/likes/${idCard}`, {
    method: fetchMethod,
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac'
    }
  })
    .then(res => res.json())
    .then(result => {return result})
}

export const getCardsData = function() {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards ', {
    method: 'GET',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac' 
    }
  })
  .then(res => res.json())
  .then(result => {return result})
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен getCardsData.');
  });
}

export function SetUserAvatar(url) {
  
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url
    })
  })
  .then(res => { res.json()})
  .then(result => {return result})
  .catch(err => {console.log(`Ого! Что-то пошло не так: ${err}...`)})
}

export function getCardData(idCard) {
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${idCard}`, {
    method: 'GET',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac' 
    }
  })
  .then(res => res.json())
  .then(result => {return result})
  .catch(err => console.log(err))
}

export function saveNewCardData(CardData) {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/cards ', {
    method:'POST',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: CardData.name,
      link: CardData.link
    })
  })
  .then(res => res.json())
  .then(result => {return result})
}

export function saveProfileData(name, description) {
  return fetch('https://nomoreparties.co/v1/pwff-cohort-1/users/me ', {
    method: 'PATCH',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac',
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(res => res.json())
  .then(result => { return result;})
  .catch(err => {console.log(err)})
}

export function dropCard(idCard) {
  console.log(idCard);
  return fetch(`https://nomoreparties.co/v1/pwff-cohort-1/cards/${idCard} `, {
    method: 'DELETE',
    headers: {
      authorization: '95e6fe45-0fdc-4b40-8bb6-4db715dbdfac',
    }
  })
  .then(res => {res.json()})
  .then(result => {return result;})
  .catch(err => {console.log(err);})
}