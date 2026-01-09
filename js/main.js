// ================= DOM =================
const buttonAuth = document.querySelector('.button-auth');
const buttonOut = document.querySelector('.button-out');
const userName = document.querySelector('.user-name');

const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');

const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');

const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');

// ================= DATA =================
const restaurantsData = [
  {
    name: 'Піца плюс',
    image: 'img/pizza-plus/preview.jpg',
    time: '50 хвилин',
    rating: '4.5',
    price: 'від 200 ₴',
    category: 'Піца'
  },
  {
    name: 'Танукі',
    image: 'img/tanuki/preview.jpg',
    time: '60 хвилин',
    rating: '4.5',
    price: 'від 1 200 ₴',
    category: 'Суші, роли'
  },
  {
    name: 'FoodBand',
    image: 'img/food-band/preview.jpg',
    time: '40 хвилин',
    rating: '4.5',
    price: 'від 150 ₴',
    category: 'Піца'
  },
  {
    name: 'Ikigai',
    image: 'img/palki-skalki/preview.jpg',
    time: '55 хвилин',
    rating: '4.5',
    price: 'від 250 ₴',
    category: 'Піца'
  },
  {
    name: 'Пузата хата',
    image: 'img/gusi-lebedi/preview.jpg',
    time: '75 хвилин',
    rating: '4.5',
    price: 'від 300 ₴',
    category: 'Українські страви'
  },
  {
    name: 'PizzaBurger',
    image: 'img/pizza-burger/preview.jpg',
    time: '45 хвилин',
    rating: '4.5',
    price: 'від 700 ₴',
    category: 'Піца'
  }
];

// ================= SCROLL =================
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
  window.scrollTo(0, document.body.dbScrollY);
};

// ================= MODAL =================
function openAuthModal() {
  modalAuth.classList.add('is-open');
  disableScroll();

  loginInput.style.border = '';
  passwordInput.style.border = '';
}

function closeAuthModal() {
  modalAuth.classList.remove('is-open');
  enableScroll();
}

// ================= AUTH =================
function logIn(event) {
  event.preventDefault();

  let valid = true;

  if (!loginInput.value.trim()) {
    loginInput.style.border = '2px solid red';
    valid = false;
  }

  if (!passwordInput.value.trim()) {
    passwordInput.style.border = '2px solid red';
    valid = false;
  }

  if (!valid) return;

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
  }
}

// ================= CARDS =================
function createRestaurantCard(data) {
  const card = document.createElement('a');
  card.className = 'card card-restaurant';
  card.href = 'restaurant.html';
  card.dataset.link = 'restaurant.html';

  card.insertAdjacentHTML('beforeend', `
    <img src="${data.image}" alt="image" class="card-image" />
    <div class="card-text">
      <div class="card-heading">
        <h3 class="card-title">${data.name}</h3>
        <span class="card-tag tag">${data.time}</span>
      </div>
      <div class="card-info">
        <div class="rating">${data.rating}</div>
        <div class="price">${data.price}</div>
        <div class="category">${data.category}</div>
      </div>
    </div>
  `);

  return card;
}

function renderRestaurants() {
  cardsRestaurants.textContent = '';
  restaurantsData.forEach(item => {
    cardsRestaurants.insertAdjacentElement(
      'beforeend',
      createRestaurantCard(item)
    );
  });
}

// ================= NAVIGATION =================
function openGoods(event) {
  const restaurant = event.target.closest('.card-restaurant');
  if (!restaurant) return;

  event.preventDefault(); // ⬅️ СЮДИ, після перевірки

  const login = localStorage.getItem('login');
  if (!login) {
    openAuthModal();
    return;
  }

  window.location.href = restaurant.dataset.link;
}

logo.addEventListener('click', () => {
  containerPromo.classList.remove('hide');
  restaurants.classList.remove('hide');
  menu.classList.add('hide');
});

// ================= EVENTS =================
buttonAuth.addEventListener('click', openAuthModal);
closeAuth.addEventListener('click', closeAuthModal);
buttonOut.addEventListener('click', logOut);
logInForm.addEventListener('submit', logIn);

modalAuth.addEventListener('click', (event) => {
  if (event.target === modalAuth) {
    closeAuthModal();
  }
});

cardsRestaurants.addEventListener('click', openGoods);

// ================= INIT =================
renderRestaurants();
updateUser();
