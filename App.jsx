import React, { useState } from 'react';

const JokeGenerator = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJoke = () => {
    setLoading(true);

    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch a joke');
        }
        return response.json();
      })
      .then((data) => {
        setJoke(`${data.setup} - ${data.punchline}`);
      })
      .catch(() => {
        setJoke('Oops! Failed to fetch a joke. Try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Random Joke Generator</h1>
      <button
        onClick={fetchJoke}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mb-4"
      >
        {loading ? 'Loading...' : 'Get a Joke'}
      </button>
      {joke && (
        <div className="mt-4 p-4 bg-white shadow rounded-lg text-center text-gray-800">
          <p>{joke}</p>
        </div>
      )}
    </div>
  );
};

export default JokeGenerator;
