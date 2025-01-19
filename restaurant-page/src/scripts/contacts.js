export const contactPage = (container) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');

    //contact card
    const item1 = document.createElement('div');
    item1.classList.add('card');

    //heading
    const title = document.createElement('h2');
    title.textContent = 'How to contact us?';
    item1.appendChild(title);

    //location
    const image = document.createElement('img');
    image.src = "../../images/map.jpg";
    image.alt = "Restaurant Location";
    item1.appendChild(image);

    //desc
    const desc = document.createElement('p');
    desc.textContent = "Visit us at 425 Harbor Street in the heart of downtown. Make a reservation by calling the below numbers or by emailing reservations@restaurantname.com. Our dedicated events team is also available to help plan your special occasions!";
    item1.appendChild(desc);

    //phone numbers
    const num1 = document.createElement('p');
    num1.textContent = 'Restaurant Number: 111111';
    item1.appendChild(num1);

    const num2 = document.createElement('p');
    num2.textContent = 'Order Number: 222222';
    item1.appendChild(num2);

    const num3 = document.createElement('p');
    num3.textContent = 'Other Number: 333333';
    item1.appendChild(num3);

    mainContainer.appendChild(item1);

    container.appendChild(mainContainer);

}