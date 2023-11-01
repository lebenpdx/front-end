const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

// URL for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

// Function to fetch character data
async function fetchCharacterData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data from the API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to calculate the number of characters in each house and group houses with one member as "Other"
function calculateCharactersInHouses(characterData) {
  const houseCounts = {};

  characterData.forEach((character) => {
    let houseName = character.family;

    // Handle specific corrections for "Lanister" and "Targaryn"
    if (houseName === 'House Lanister') {
      houseName = 'Lannister';
    } else if (houseName === 'Targaryan') {
      houseName = 'Targaryen';
    }

    // Append "House" to the name if it doesn't contain it
    if (typeof houseName === 'string' && houseName.trim() !== '') {
      if (!houseName.includes('House ') && houseName !== 'Free Folk') {
        houseName = 'House ' + houseName;
      }

      if (houseName in houseCounts) {
        houseCounts[houseName]++;
      } else {
        houseCounts[houseName] = 1;
      }
    }
  });

  // Group houses with only one member as "Other"
  const groupedHouseCounts = { Unique: 0 };

  for (const house in houseCounts) {
    if (houseCounts[house] === 1) {
      groupedHouseCounts.Unique++;
    } else {
      groupedHouseCounts[house] = houseCounts[house];
    }
  }

  return groupedHouseCounts;
}

// Function to render the donut chart
function renderChart(houseCounts) {
  const donutChart = document.querySelector('.donut-chart');

  const labels = Object.keys(houseCounts);
  const data = Object.values(houseCounts);

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Number of Characters',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
}

// Main function to fetch data, calculate counts, and render the chart
async function main() {
  const characterData = await fetchCharacterData();
  const houseCounts = calculateCharactersInHouses(characterData);
  renderChart(houseCounts);
}

main();
