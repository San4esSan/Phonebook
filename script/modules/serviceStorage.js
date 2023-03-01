export let data = [
  // {
  //     name: 'Семён',
  //     surname: 'Иванов',
  //     phone: '+79800252525',
  // },
  // {
  //     name: 'Мария',
  //     surname: 'Попова',
  //     phone: '+79876543210',
  // },
  // {
  //     name: 'Игорь',
  //     surname: 'Семёнов',
  //     phone: '+79999999999',
  // },
  // {
  //     name: 'Семён',
  //     surname: 'Иванов',
  //     phone: '+79800252525',
  // },
  // {
  //     name: 'Иван',
  //     surname: 'Петров',
  //     phone: '+79514545454',
  // },
];

export const addContactData = (contact) => {
  data.push(contact);
};

export const getStorage = (key) => {
  const contactLocalStorage = localStorage.getItem(key);
  if (contactLocalStorage !== null) {
    return data = JSON.parse(contactLocalStorage);
  }
  return data = [];
};

export const setStorage = (key, newContact) => {
  const contact = getStorage('data');
  contact.push(newContact);
  localStorage.setItem(key, JSON.stringify(contact));
};

export const removeStorage = (phoneNumber) => {
  const contact = getStorage('data');

  const newList = [];
  for (let i = 0; i < phoneNumber.length; i++) {
    for (let k = 0; k < contact.length; k++) {
      if (contact[k]['phone'] === phoneNumber[i]) {
        newList.push(contact[k]);
      }
    }
  }

  // const newList = contact.filter(elem => elem.phone !== phoneNumber);

  localStorage.setItem('data', JSON.stringify(newList));
};
