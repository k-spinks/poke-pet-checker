# Poké-Pet-Checker

[Poké-Pet-Checker](https://pokemon-pet-check.netlify.app/)

![Poké-Pet-Checker home screen](/img/PPC1.png)

## How its made
**Tech used:** HTML, CSS, JavaScript

This web application allows users to enter a Pokémon name to make a request to the [Pokéapi](https://pokeapi.co/) to evaluate whether the Pokémon is a suitable house pet. Upon entering a valid name, the app fetches data such as the Pokémon types, weight height and encounter locations. It uses **object-oriented programming to encapsulate** this data and apply conditional logic to determine suitability based on potentially dangerous types and physical characteristics.

The app dynamically updates the user interface based on the results, showing whether the Pokémon is a good fit as pet and providing a list of encounter location for valid pets. The key techniques used for this app include **API fetching, DOM manipulation, string/array manipulation, and error handling,** ensuring a smooth user experience with real-time feedback on the Pokémon suitability.

**Valid house pet**
![Poké-Pet-Checker correct screen](/img/PPCcorrect.png)

**Invalid house pet**
![Poké-Pet-Checker incorrect screen](/img/PPCincorrect.png)

## Potential Optimizations
One potential optimization to create a better user experience would be to notify the user when a non-valid Pokémon's name is entered into the search bar.


## What I learned
1. DOM Manipulation and Event Handling
  - The Pokémon's name is fetched from the input field using DOM querying (`document.querySelector("input")`) and this name is cleaned up using string manipulation (`replaceAll()` and `toLowerCase()`).
2. API Fetching
 - The fetch request returns a promise which is handled using `.then()` to parse the response data and `.catch()` to handle potential errors, such as invalid Pokémon names or network issues. Promises ensure that the code remains non-blocking while waiting for the API response.
3. Object-Oriented Programming (OOP)
 - Once the Pokémon data is retrieved, a new instance of the `PokemonInfo` class is created. This class inherits from `PokePet`, demonstrating class inheritance, where the `PokemonInfo` class extends the base functionality of `PokePet`
4. Array and String Manipulation
 - The Pokémon’s types are stored in an array (`typeList`), and **array methods** such as `.push()` are used to add the types. In `isGoodPet()`, **array filtering** (`filter()`) is applied to check whether any of the Pokémon’s types match a predefined list of dangerous types.
5. Dynamic UI Updates and Styling
 - Based on the result of the `isGoodPet()` evaluation, the application dynamically updates the UI to inform the user whether the Pokémon is a suitable pet or not. This is done using **DOM manipulation** techniques such as `innerText` to update text content and `classList.add()` or `classList.remove()` to toggle CSS classes for styling.




