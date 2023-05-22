import './css/styles.css';
import Notiflix from 'notiflix';

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

console.log(refs.countryInfoEl);

function getCountry(country) {
  const URL_API = 'https://restcountries.com/v3.1/';

 return fetch(`${URL_API}name/${country}`).
    then(resp => {
      if (!resp.ok) {
      throw new Error(resp.statusText) 
      }
        return resp.json()
     })
}


refs.inputSearchEl.addEventListener('input', delay(getInformAboutCountry, DEBOUNCE_DELAY));

function getInformAboutCountry(e) {
  let country = e.target.value
  

  getCountry(country).
    then(data => {
      if (data.length <= 1) {
        createMarkup(data)
      } else if (data.length < 2 && data.length >= 10) {
         createMarkupItem(data) 
      }
    }).
    catch(err => {
      if (country.length > 1) {
      Notiflix.Notify.warning('Ooops, no such country found');
      } 
      refs.countryInfoEl.innerHTML = ''
      console.log(err)
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
  return arr.map(({ name: { common }, capital, flags: { png }, population, languages }) => {
  `
    <li class="country__wrapper">
     <img class="flag__img" src="${png}" alt="${common} Flag">
    <h1>${common}</h1>
    </li>
    `
  }).join('')
    }