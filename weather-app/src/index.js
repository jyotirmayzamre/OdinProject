const btn = document.getElementById('submit');
const regForm = document.querySelector('form');

async function getWeather(region){
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${region}?unitGroup=us&key=AGA45WP9GCF9P6LWM8943ZLCC&contentType=json`
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

    } catch(err) {
        console.log(err.message)
    }

}


btn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(regForm);
    const data = Object.fromEntries(formData.entries());
    getWeather(data.region);
})