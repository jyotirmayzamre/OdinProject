export const menuPage = (container) => {
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('container');

    //salmon card
    const item1 = document.createElement('div');
    item1.classList.add('card');

    //image
    const image1 = document.createElement('img');
    image1.src = "../../images/salmon.jpg";
    image1.alt = 'Grilled Salmon';
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

    //pizza card
    const item2 = document.createElement('div');
    item2.classList.add('card');

    //image
    const image2 = document.createElement('img');
    image2.src = "../../images/pizza.jpg";
    image2.alt = "Vegetarian Pizza";
    item2.appendChild(image2);

    //heading
    const title2 = document.createElement('h2');
    title2.textContent = 'Vegetarian Pizza';
    item2.appendChild(title2);

    //ingredients
    const desc2 = document.createElement('p');
    desc2.textContent = "A pizza with a base of tomato sauce, mozzarella cheese, and various vegetables. Ingredients include pizza dough, tomato sauce, mozzarella cheese, bell peppers, onions, mushrooms, and olives."
    item2.appendChild(desc2);

    mainContainer.appendChild(item2);


    //pasta card
    const item3 = document.createElement('div');
    item3.classList.add('card');

    //image
    const image3 = document.createElement('img');
    image3.src = "../../images/pasta.jpg";
    image3.alt = 'Chicken Alfredo Pasta';
    item3.appendChild(image3);

    //heading
    const title3 = document.createElement('h2');
    title3.textContent = "Chicken Alfredo Pasta";
    item3.appendChild(title3);

    //ingredients
    const desc3 = document.createElement('p');
    desc3.textContent = 'Pasta tossed in a creamy Alfredo sauce with grilled chicken. INgredients include pasta, Alfredo sauce (made with cream, butter, parmesan cheese, and garlic), chicken breast, and parsley.'
    item3.appendChild(desc3);

    mainContainer.appendChild(item3);

    //burger card
    const item4 = document.createElement('div');
    item4.classList.add('card');

    //image
    const image4 = document.createElement('img');
    image4.src = "../../images/burger.jpg";
    image4.alt = 'Beef Burger';
    item4.appendChild(image4);

    //heading
    const title4 = document.createElement('h2');
    title4.textContent = 'Beef Burger';
    item4.appendChild(title4);  

    //ingredients
    const desc4 = document.createElement('p');
    desc4.textContent = "A classic beef patty with lettuce, tomato, and cheese on a bun. Ingredients include ground beef, lettuce, tomato, cheddar cheese, and a sesame bun."
    item4.appendChild(desc4);

    mainContainer.appendChild(item4);

    container.appendChild(mainContainer);
}