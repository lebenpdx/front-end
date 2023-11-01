// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const section = document.querySelector('section');

// Function to create a character card
function createCharacterCard(character) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = character.imageUrl;
  img.alt = character.fullName;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const name = document.createElement('h5');
  name.textContent = character.fullName;

  const title = document.createElement('p');
  title.textContent = character.title;

  cardBody.appendChild(name);
  cardBody.appendChild(title);

  card.appendChild(img);
  card.appendChild(cardBody);

  card.addEventListener('mouseenter', () => {
    card.classList.add('hovered');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('hovered');
  });

  return card;
}

// Fetch data from the API and create character cards
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((character) => {
      const card = createCharacterCard(character);
      section.appendChild(card);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
