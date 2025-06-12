# Memory Card Game

This is the memory card game. Basically, click on a card from a selection and if it hasn't been clicked before, points increase. Cards get shuffled every time.

## Components

### App Component
State: pokemonIDs (array), clickedIDs (set), points, best

handleClick: If the argument id is in the clickedIDs, then it is an invalid click and the game restarts. Otherwise it is a valid click and points increments by 1.

shuffle: Function to shuffle an array. Generated IDs are shuffled after every valid click.

### AllCards
Takes in pokemonIDs and handleClick and passes to each Card component. Uses key to keep track of components so that shuffling the ids array renders the Cards in different order.


### Card
Takes in id and handleClick. Fetches the pokemon from the server using the id (via useEffect) and renders.
