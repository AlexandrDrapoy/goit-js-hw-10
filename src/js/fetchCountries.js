import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  width: '320px',
  position: 'center-top',
  fontSize: '18px',
  distance: '5px',
  opacity: 0.7,
});

const URL = 'https://restcountries.com/v3.1/name/';
const FILTER_FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${URL}${name}?fields=${FILTER_FIELDS}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
// (fields = name), capital, currencies;
// name.official - повна назва країни
// capital - столиця
// population - населення
// flags.svg - посилання на зображення прапора
// languages - масив мов
