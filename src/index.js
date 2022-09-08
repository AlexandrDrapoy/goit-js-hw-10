const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

//  name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages

import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '320px',
  position: 'center-top',
  fontSize: '18px',
  distance: '5px',
  opacity: 0.7,
});
const DEBOUNCE_DELAY = 300;
const getObjectValues = obj => [...Object.values(obj)];
searchBox.addEventListener(
  'input',
  debounce(evt => {
    const name = evt.target.value.trim();
    renderMarkup(name);
  }, DEBOUNCE_DELAY)
);

function cliaredMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
function renderMarkup(name) {
  if (!name) {
    return cliaredMarkup();
  }
  fetchCountries(name)
    .then(countries => {
      cliaredMarkup();

      if (countries.length === 1) {
        return markupCountry(countries);
      }
      if (countries.length <= 10) {
        return markupCountries(countries);
      }
      Notify.warning(
        'Too many matches found. Please enter a more specific name.'
      );
    })
    .catch(error => {
      cliaredMarkup();
      Notify.failure('Oops, there is no country with that name.');
      console.log(error);
    });
}

function markupCountries(countries) {
  countryList.insertAdjacentHTML(
    'afterbegin',
    countries.reduce((acc, { name, flags }) => {
      return (
        acc +
        `<li class="countryFlagsAtList "><img src="${flags.svg}" alt="flag of ${name.official}"><p>${name.official}</p></li>`
      );
    }, '')
  );
  countryList.addEventListener('click', onClickChoiseCountries);
}

function onClickChoiseCountries(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  searchBox.value = evt.target.textContent;
  renderMarkup(searchBox.value);
}

function markupCountry(countries) {
  countryInfo.insertAdjacentHTML(
    'afterbegin',
    countries.reduce((acc, { name, capital, population, flags, languages }) => {
      return (
        acc +
        ` <ul class ="country-info-list"><li class="countryFlags"><img src="${
          flags.svg
        }" alt="flag of ${name.official}"></li>
      <li class="countryName">Country Name - ${name.official}</li>
      <li class="countryCapital">Capital - ${getObjectValues(capital)}</li>
      <li class="countryLanguages">Languages - ${getObjectValues(
        languages
      )}</li>
      <li class="countryPopulation">Population - ${population}</li></ul>`
      );
    }, '')
  );
}
