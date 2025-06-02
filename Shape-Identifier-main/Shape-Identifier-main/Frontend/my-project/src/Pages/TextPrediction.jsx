import { useState } from 'react';

const TextPrediction = () => {
  const [input, setInput] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase().slice(0, 1);
    setInput(value);
  };

  const handlePredict = async () => {
    const response = await fetch('http://localhost:8000/text-predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Alphabet/Digit Prediction</h2>
      <input
        type="text"
        className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        maxLength={1}
        placeholder="Enter a single character"
        value={input}
        onChange={handleInputChange}
      />
      <button
        onClick={handlePredict}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>
      {prediction && (
        <div className="mt-4 text-green-600 font-bold">
          Prediction: {prediction}
        </div>
      )}
    </div>
  );
};

export default TextPrediction;
