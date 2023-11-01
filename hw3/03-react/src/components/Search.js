// Search.js
import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [characterData, setCharacterData] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      if (query.trim() === '') {
        // Clear character data and error message when no search query
        setCharacterData([]);
        setError(null);
      } else {
        // Make an API request to search for characters
        const response = await axios.get(
          `https://thronesapi.com/api/v2/Characters`
        );
        const characters = response.data;

        // Filter characters based on the user's input
        const filteredCharacters = characters.filter((character) =>
          character.fullName.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredCharacters.length === 0) {
          setError('Character not found.');
        } else {
          setError(null);
        }

        setCharacterData(filteredCharacters);
      }
    } catch (error) {
      console.error('API Error:', error);
      setError('Error occurred while searching for characters.');
      setCharacterData([]); // Clear character data in case of an error
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Search Results:</h2>
      {characterData.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {characterData.map((character) => (
            <li key={character.id}>
              <div>
                <img src={character.imageUrl} alt={`${character.fullName}`} />
                <p style={{ fontSize: '20px' }}>{character.fullName}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        placeholder="Search for a character"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
    </div>
  );
}

export default Search;
