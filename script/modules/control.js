import {addContactData, removeStorage, setStorage} from './serviceStorage.js';
import * as createElement from './createElements.js';

const {createRow} = createElement;


const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    formOverlay.classList.add('is-visible');
  };

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  };

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  formOverlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === formOverlay || target.closest('.close')) {
      closeModal();
    }
  });

  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    });
  });

  list.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.del-icon')) {
      target.closest('.contact').remove();
      const contact = document.querySelectorAll('.contact');
      const phoneNumber = [];
      for (const key of Array.from(contact)) {
        phoneNumber.push((key.phoneLink.textContent));
      }
      removeStorage(phoneNumber);
      // removeStorage(target.dataset.phone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newContact = Object.fromEntries(formData);
    addContactPage(newContact, list);
    addContactData(newContact);
    setStorage('data', newContact);
    form.reset();
    closeModal();
  });
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach(contact => {
    contact.addEventListener('mouseenter', () => {
      logo.textContent = contact.phoneLink.textContent;
    });
  });
  allRow.forEach(contact => {
    contact.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  });
};

export default {
  modalControl,
  deleteControl,
  formControl,
  hoverRow,
};
