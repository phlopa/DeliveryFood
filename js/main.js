// ===== DOM =====
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');

const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');

// ===== Scroll control =====
window.disableScroll = function () {
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        left: 0;
        width: 100%;
        overflow: hidden;
        height: 100vh;
    `;
};

window.enableScroll = function () {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY
    });
};

// ===== Modal control =====
function openAuthModal() {
    modalAuth.classList.add('is-open');
    disableScroll();

    // скидання рамок
    loginInput.style.border = '';
    passwordInput.style.border = '';
}

function closeAuthModal() {
    modalAuth.classList.remove('is-open');
    enableScroll();
}

function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');

    modalAuth.classList.contains('is-open')
        ? disableScroll()
        : enableScroll();
}

// ===== Auth =====
function logIn(event) {
    event.preventDefault();

    let isValid = true;

    if (loginInput.value.trim() === '') {
        loginInput.style.border = '2px solid red';
        isValid = false;
    }

    if (passwordInput.value.trim() === '') {
        passwordInput.style.border = '2px solid red';
        isValid = false;
    }

    if (!isValid) return;

    localStorage.setItem('login', loginInput.value.trim());

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

// ===== Events =====
buttonAuth.addEventListener('click', openAuthModal);
closeAuth.addEventListener('click', closeAuthModal);
buttonOut.addEventListener('click', logOut);
logInForm.addEventListener('submit', logIn);

// закриття по кліку на фон
modalAuth.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal-auth')) {
        closeAuthModal();
    }
});

// ===== Init =====
updateUser();

