
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');

const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');




function openAuthModal() {
    modalAuth.classList.add('is-open');
}


function closeAuthModal() {
    modalAuth.classList.remove('is-open');
}


function logIn(event) {
    event.preventDefault();

    const login = loginInput.value.trim();


    if (login === '') {
        loginInput.style.border = '2px solid red';
        return;
    }


    localStorage.setItem('login', login);


    loginInput.style.border = '';


    updateUser();


    closeAuthModal();


    logInForm.reset();
}


function logOut() {
    localStorage.removeItem('login');
    updateUser();
}


function updateUser() {
    const login = localStorage.getItem('login');

    if (login) {

        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'flex';

        userName.style.display = 'inline';
        userName.textContent = login;
    } else {

        buttonAuth.style.display = 'flex';
        buttonOut.style.display = 'none';

        userName.style.display = 'none';
        userName.textContent = '';
    }
}


buttonAuth.addEventListener('click', openAuthModal);
closeAuth.addEventListener('click', closeAuthModal);
logInForm.addEventListener('submit', logIn);
buttonOut.addEventListener('click', logOut);


updateUser();
