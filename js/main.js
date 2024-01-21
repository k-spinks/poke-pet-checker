//TODO make the reason for type list what types were matched

document.querySelector('#pokeball').addEventListener("click", getData);

function getData() {
  const pokemon = document
    .querySelector("input")
    .value.replaceAll(" ", "-")
    .replaceAll(".", "")
    .toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const potentialPet = new PokemonInfo(
        data.name,
        data.height,
        data.weight,
        data.types,
        data.sprites.other["official-artwork"].front_default,
        data.location_area_encounters
      );
      let results = "";

      potentialPet.getTypes();
      potentialPet.isGoodPet();

      if (potentialPet.housePet) {
        results = `This Pokemon is a good pet. You can find ${potentialPet.name} in the following area(s):`;
        document.querySelector('#results').classList.remove('bad')
        document.querySelector('#results').classList.add('good')
        document.querySelector('#locations').classList.add('good')
        document.getElementById("locations").innerText = "";
        potentialPet.encounterInfo();
        
      } else {
        document.getElementById("locations").innerText = "";
        document.querySelector('#results').classList.remove('good')
        document.querySelector('#results').classList.add('bad')
        results = `This pokemon would not be a good pet because ${potentialPet.reason.join(" and ")}`;
      }
      document.querySelector("#results").innerText = results;
      document.querySelector("#pokemon").src = potentialPet.image;
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}

class PokePet {
  constructor(name, height, weight, types, image) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.image = image;
    this.housePet = true;
    this.reason = [];
    this.typeList = [];
  }

  getTypes() {
    for (const property of this.types) {
      this.typeList.push(property.type.name); //stores types into an array
    }
  }

  weightToPounds(weight) {
    return Math.round((weight / 4.536) * 100) / 100; //rounds to 2 decimals
  }

  heightToFeet(height) {
    return Math.round((height / 3.048) * 100) / 100; //rounds to 2 decimals
  }

  isGoodPet() {
    let badTypes = [
      "fire",
      "electric",
      "fighting",
      "poison",
      "ghost",
      "dark",
      "dragon",
      "psychic"
    ];
    const weight = this.weightToPounds(this.weight);
    const height = this.heightToFeet(this.height);
    let matchedTypes = badTypes.filter(type => this.typeList.includes(type))
    
    if(matchedTypes.length > 0){
      this.housePet = false;
      this.reason.push(`${matchedTypes.join(' and ')} is a dangerous type`);
    }
    if (weight > 400) {
      this.housePet = false;
      this.reason.push(`it is too heavy at ${weight} pounds`);
    }
    if (height > 7) {
      this.housePet = false;
      this.reason.push(`is too tall at ${height} feet`);
    }
  }
}

class PokemonInfo extends PokePet {
  constructor(name, height, weight, types, image, location) {
    super(name, height, weight, types, image);
    this.locationURL = location;
    this.locationList = [];
    this.locationString = "";
  }

  encounterInfo() {
    fetch(this.locationURL)
      .then((res) => res.json())
      .then((data) => {
        for (const item of data) {
          this.locationList.push(item.location_area.name);
        }
        let target = document.getElementById("locations");
        target.innerText = this.locationCleanUp();
      })

      .catch((err) => {
        console.log(`error ${err}`);
      });
  }

  locationCleanUp() {
    const words = this.locationList
      .slice(0, 5)
      .join(", ")
      .replaceAll("-", " ")
      .split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }
}
