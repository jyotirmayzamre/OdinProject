export const homePage = (container) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');

    //description card
    const descContainer = document.createElement('div');
    descContainer.classList.add('card');
    const descPara = document.createElement('p');
    descPara.textContent = "At The Crooked Knife, we believe that dining should be an adventure. Our menu is a playful exploration of flavors, where unexpected combinations and innovative techniques come together to create dishes that tantalize your taste buds. Coupled with an inviting ambiance and impeccable service, The Crooked Knife promises an unforgettable dining experience that will leave you wanting more."
    descContainer.appendChild(descPara);
    mainContainer.appendChild(descContainer);

    //timings card
    const timingContainer = document.createElement('div');
    timingContainer.classList.add('card');
    timingContainer.innerHTML = `
        <h2>Hours</h2>
        <p>Monday: 6AM - 6PM</p>
        <p>Tuesday: 6AM - 6PM</p>
        <p>Wednesday: 6AM - 6PM</p>
        <p>Thursday: 6AM - 10PM</p>
        <p>Friday: 6AM - 10PM</p>
        <p>Saturday: 8AM - 10PM</p>
        <p>Sunday: 8AM - 8PM</p>
    `
    mainContainer.appendChild(timingContainer);

    //random image card
    const imageCard = document.createElement('div');
    imageCard.classList.add('card');
    imageCard.innerHTML = `
        <p>Best food in the nation!</p>
        <img src="../../images/chef.jpg">
        <p>Serving with love since 2008</p>
    `
    mainContainer.appendChild(imageCard);




    container.appendChild(mainContainer);
}