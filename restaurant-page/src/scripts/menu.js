export const menuPage = (container) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');

    //salmon card
    const item1 = document.createElement('div');
    item1.classList.add('card');

    //image
    const image1 = document.createElement('img');
    image1.src = '../../images/salmon.jpg';
    item1.appendChild(image1);

    //heading
    const title1 = document.createElement('h2');
    title1.textContent = 'Grilled Salmon';
    item1.appendChild(title1);

    //ingredients
    const desc1 = document.createElement('p');
    desc1.textContent = 'A fillet of salmon, grilled and served with a side of vegetables. Ingredients include fresh salmon, olive oil, lemon, salt, pepper, and a mix of seasonal vegetables.'
    item1.appendChild(desc1);

    mainContainer.appendChild(item1);


    container.appendChild(mainContainer);


}