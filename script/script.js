
import {renderPhoneBook, renderContacts} from './modules/render.js';
import {getStorage} from './modules/serviceStorage.js';
import control from './modules/control.js';
const {modalControl, deleteControl, formControl, hoverRow} = control;

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const data = getStorage('data');
    const {
      list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel,
      thead} = renderPhoneBook(app, title);

    // функционал

    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);

    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

    thead.addEventListener('click', e => {
      const target = e.target;
      if (target.closest('.name')) {
        const sortedRows = Array.from(list.rows)
            .sort((rowA, rowB) => (rowA.cells[1].innerHTML > rowB.cells[1]
                .innerHTML ? 1 : -1));
        list.append(...sortedRows);
      }
      if (target.closest('.surname')) {
        const sortedRows = Array.from(list.rows)
            .sort((rowA, rowB) => (rowA.cells[2].innerHTML > rowB.cells[2]
                .innerHTML ? 1 : -1));
        list.append(...sortedRows);
      }
    });
  };

  window.phoneBookInit = init;
}
