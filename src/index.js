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
      const countryObj = {
        name: data[0].name.common,
        capital: data[0].capital[0],
        flag: data[0].flags.png,
        population: data[0].population,
        languages: Object.values(data[0].languages).join(', ')
      }
      const infoAboutCountry = `
    <div class="country__wrapper">
     <img class="flag__img" src="${countryObj.flag}" alt="${countryObj.name} Flag">
    <h1>${countryObj.name}</h1>
    </div>
    <p><b>Capital:</b> ${countryObj.capital}</p>
    <p><b>Population:</b> ${countryObj.population}</p>
    <p><b>Languages:</b> ${countryObj.languages}</p>

    `
        refs.countryInfoEl.innerHTML = infoAboutCountry
    }).
    catch(err => {
      if (country.length > 1) {
      Notiflix.Notify.warning('Ooops, no such country found');
      } 
      refs.countryInfoEl.innerHTML = ''
      console.log(err)
    })
  
}

