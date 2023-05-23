
export default function getCountry(country) {
  const URL_API = 'https://restcountries.com/v3.1/';

 return fetch(`${URL_API}name/${country}`).
    then(resp => {
      if (!resp.ok) {
      throw new Error(resp.statusText) 
      }
        return resp.json()
     })
}