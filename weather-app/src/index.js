import "./style.css";
import headerIcon from '../assets/cloudy.png';


const btn = document.getElementById('submit');
const regForm = document.querySelector('form');

const headerImage = document.getElementById('icon');
headerImage.src = headerIcon;


const condition = document.querySelector('.desc');
const address = document.querySelector('.address');
const temp = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const feelslike = document.querySelector('.feels-like')

const container = document.getElementById('container');

const progress = document.getElementById('progress');


async function progressBar(response){
    
    
 
}


async function getWeather(region){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${region}?unitGroup=us&include=current&key=AGA45WP9GCF9P6LWM8943ZLCC&contentType=json`
   
    try {
        progress.value = 0;
        const response = await fetch(url);
        const reader = response.body.getReader();
        const length = response.headers.get('Content-Length');

        let receivedLength = 0;
        let chunks = [];
        while(true) {
            const {done, value} = await reader.read();
            if(done){
                break;
            }
            chunks.push(value);
            receivedLength += value.length;
            progress.value = (receivedLength / length) * 100;
        }
        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for(let chunk of chunks){
            chunksAll.set(chunk, position);
            position += chunk.length;
        }

        let result = new TextDecoder("utf-8").decode(chunksAll);
        let data = JSON.parse(result);



        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        
        condition.textContent = data.currentConditions.conditions;
        address.textContent = data.resolvedAddress
        temp.textContent = `${data.currentConditions.temp}`;
        humidity.textContent = `HUMIDITY: ${data.currentConditions.humidity}%`;
        wind.textContent = `WIND SPEED: ${data.currentConditions.windspeed} mph`;
        feelslike.textContent = `FEELS LIKE: ${data.currentConditions.feelslike}`;
        container.style.display = 'block';

    } catch(err) {
        console.log(err.message)
    }

}


btn.addEventListener('click', (e) => {
    e.preventDefault();
    progress.style.display = 'block';
    const formData = new FormData(regForm);
    const data = Object.fromEntries(formData.entries());
    getWeather(data.region);
})