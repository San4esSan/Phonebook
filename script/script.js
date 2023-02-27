'use strict';

let data = [
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

{
    const getStorage = (key) => {
        const contactLocalStorage = localStorage.getItem(key);
        if (contactLocalStorage !== null) {
            return data = JSON.parse(contactLocalStorage);
        }
        return data = [];
    };

    const setStorage = (key, newContact) => {
        let contact = getStorage('data');
        contact.push(newContact);
        localStorage.setItem(key, JSON.stringify(contact));
    };

    const removeStorage = (phoneNumber) => {
        let contact = getStorage('data');

        let newList = []
        for (let i = 0; i < phoneNumber.length; i++) {
            for (let k = 0; k < contact.length; k++)
            if (contact[k]['phone'] === phoneNumber[i]) {
                newList.push(contact[k])
            }
        }

        localStorage.setItem('data', JSON.stringify(newList));
    }

    const addContactData = (contact) => {
        data.push(contact);
    };

    const createContainer = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    };

    const createHeader = () => {
        const header = document.createElement('header');
        header.classList.add('header');

        const headerContainer = createContainer();
        header.append(headerContainer);

        header.headerContainer = headerContainer;

        return header;
    };

    const createLogo = title => {
        const h1 = document.createElement('h1');
        h1.classList.add('logo');
        h1.textContent = `Телефонный справочник. ${title}`;

        return h1
    };

    const creatFooter = (title) => {
        const footer = document.createElement('footer');
        footer.classList.add('footer');

        footer.innerHTML = `Все права защищены &copy; ${title}`;

        const footerContainer = createContainer();
        footer.append(footerContainer);

        footer.footerContainer = footerContainer;

        return footer;
    };

    const createMain = () => {
        const main = document.createElement('main');

        const mainContainer = createContainer();
        main.append(mainContainer);
        main.mainContainer = mainContainer;

        return main;
    };

    const createButtonsGroup = params => {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('btn-wrapper');

        const btns = params.map(({className, type, text}) => {
            const button = document.createElement('button');
            button.type = type;
            button.textContent = text;
            button.className = className;

            return button
        })
        btnWrapper.append(...btns);

        return {
            btnWrapper,
            btns,
        };
    };

    const createTable = () => {
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped');

        const thead = document.createElement('thead');
        thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete">Удалить</th>
                <th class="name">Имя</th>
                <th class="surname">Фамилия</th>
                <th>Телефон</th>
            </tr>
        `);

        const tbody = document.createElement('tbody');

        table.append(thead, tbody);
        table.tbody = tbody;

        return table;
    };

    const createForm = () => {
        const overlay = document.createElement('div');
        overlay.classList.add('form-overlay');

        const form = document.createElement('form');
        form.classList.add('form');
        form.insertAdjacentHTML('beforeend', `
            <button class="close" type="button"></button>
            <h2 class="form-title">Добавить контакт</h2>
            <div class="form-group">
                <label class="form-label" for="name">Имя:</label>
                <input class="form-input" name="name" id="name" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="surname">Фамилия:</label>
                <input class="form-input" name="surname" id="surname" type="text" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="phone">Телефон:</label>
                <input class="form-input" name="phone" id="phone" type="number" required>
            </div>
        `);
        const buttonGroup = createButtonsGroup([
            {
                className: 'btn btn-primary mr-3',
                type: 'submit',
                text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'reset',
                text: 'Отмена',
            },
        ]);


        form.append(...buttonGroup.btns);

        overlay.append(form);
        return {
            overlay,
            form,
        };
    };

    const renderPhoneBook = (app, title) => {
        const header = createHeader();
        const logo = createLogo(title);
        const main = createMain();
        const buttonGroup = createButtonsGroup([
            {
              className: 'btn btn-primary mr-3 js-add',
              type: 'button',
              text: 'Добавить',
            },
            {
                className: 'btn btn-danger',
                type: 'button',
                text: 'Удалить',
            },
        ]);
        const table = createTable();
        const footer = creatFooter(title);
        const {form, overlay} = createForm();

        header.headerContainer.append(logo);
        main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);
        footer.footerContainer.append()
        app.append(header, main, footer);
        return {
            thead: table.tHead,
            list: table.tbody,
            logo,
            btnAdd: buttonGroup.btns[0],
            btnDel: buttonGroup.btns[1],
            formOverlay: overlay,
            form: form,
        };

    };

    const createRow = ({name: firstName, surname, phone}) => {
        const tr = document.createElement('tr');
        tr.classList.add('contact');

        const td = document.createElement('td');
        const tdDel = document.createElement('td');
        tdDel.classList.add('delete')
        const buttonDel = document.createElement('button');
        buttonDel.classList.add('del-icon');
        tdDel.append(buttonDel);

        const tdName = document.createElement('td');
        tdName.textContent = firstName;

        const tdSurname = document.createElement('td');
        tdSurname.textContent = surname;

        const tdPhone = document.createElement('td');
        const phoneLink = document.createElement('a');
        phoneLink.href = `tel:${phone}`;
        phoneLink.textContent = phone;
        tr.phoneLink = phoneLink;

        tdPhone.append(phoneLink);

        tr.append(tdDel, tdName, tdSurname, tdPhone);

        return tr;
    };

    const renderContacts = (elem, data) => {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
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

    const modalControl = (btnAdd, formOverlay) => {
        const openModal = () => {
            formOverlay.classList.add('is-visible');
        }

        const closeModal = () => {
            formOverlay.classList.remove('is-visible');
        }

        btnAdd.addEventListener('click', () => {
            openModal()
        });

        formOverlay.addEventListener('click', (e) => {
            const target = e.target;
            if (target === formOverlay || target.closest('.close')){
                closeModal()
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
            })
        });

        list.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.del-icon')) {
                target.closest('.contact').remove();
                const contact = document.querySelectorAll('.contact')
                const phoneNumber = []
                for (let key of Array.from(contact)) {
                    phoneNumber.push((key.phoneLink.textContent))
                }
                removeStorage(phoneNumber)
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
        })
    }

    const init = (selectorApp, title) => {
        const app = document.querySelector(selectorApp);

        const { list, logo, btnAdd, formOverlay, form, btnDel, thead } = renderPhoneBook(app, title);

        // функционал

        // setStorage('data', data);
        getStorage('data')
        // localStorage.setItem('data', JSON.stringify(data))
        // data = JSON.parse(localStorage.getItem('data'));

        const allRow = renderContacts(list, data);
        const {closeModal} = modalControl(btnAdd, formOverlay);


        hoverRow(allRow, logo);
        deleteControl(btnDel, list);
        formControl(form, list, closeModal);

        thead.addEventListener('click', e => {
            const target = e.target;
            if (target.closest('.name')) {
                let sortedRows = Array.from(list.rows).sort((rowA, rowB) => rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1)
                list.append(...sortedRows);
            }
            if (target.closest('.surname')) {
                let sortedRows = Array.from(list.rows).sort((rowA, rowB) => rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1)
                list.append(...sortedRows);
            }
        });

    };

    window.phoneBookInit = init;
}