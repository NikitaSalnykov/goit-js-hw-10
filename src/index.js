import './css/styles.css';
import Notiflix from 'notiflix';
import { trim } from 'lodash';
import getCountry from './api-countries.js'

Notiflix.Notify.init({
  width: '280px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  clickToClose: true ,
}); 

Notiflix.Notify.info('Enter country');
const DEBOUNCE_DELAY = 300;

var delay = require('lodash.debounce');

const refs = {
  inputSearchEl: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'), 
}


refs.inputSearchEl.addEventListener('input', delay(getInformAboutCountry, DEBOUNCE_DELAY));

function getInformAboutCountry(e) {
  let country = trim(e.target.value)
  refs.countryInfoEl.innerHTML = ''
  refs.countryListEl.innerHTML = ''

  getCountry(country).
    then(data => {
      if (data.length === 1) {
        createMarkup(data);
      } else if (data.length > 1 && data.length <= 10) {
        refs.countryListEl.insertAdjacentHTML('beforeEnd', createMarkupItem(data)) 

      } else if (data.length > 10){
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
      }
    }).
    catch(err => {
      if (data.length > 0) {
     Notiflix.Notify.warning('Ooops, no such country found');
      refs.countryInfoEl.innerHTML = ''
      console.log(err)
     }
    })
  
}

function createMarkup(arr) {

  arr.map(({ name: { common }, capital, flags: { png }, population, languages }) => {

  const infoAboutCountry = `
    <div class="country__wrapper">
     <img class="flag__img" src="${png}" alt="${common} Flag">
    <h1>${common}</h1>
    </div>
    <p><b>Capital:</b> ${capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages).join(', ')}</p>
    `
   return refs.countryInfoEl.innerHTML = infoAboutCountry
 }) 
}
    

function createMarkupItem(arr) {
  return arr.map(({ name: { common }, flags: { png }, }) => 
   `
    <li class="country__wrapper">
     <img class="flags__img" src="${png}" alt="${common} Flag">
    <h2>${common}</h2>
    </li>
    `
  ).join('')
    }