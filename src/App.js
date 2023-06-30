import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { saveAs } from 'file-saver';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
      
      const wordCounts = {};
      text.split(/[ ,.\n]+/).forEach(word => {
        if (wordCounts[word]) {
          wordCounts[word]++;
        } else {
          wordCounts[word] = 1;
        }
      });
      const wordCountArray = Object.entries(wordCounts)
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);
      setData(wordCountArray);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleExportCSV = () => {
    const csvData = data.map(({ word, count }) => `${word},${count}`).join('\n');
    const blob = new Blob(['word,count\n', csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram-data.csv');
  };

  return (
    <div className="app-container">
      {data.length === 0 && (
        <button className="button-submit" onClick={handleFetchData} disabled={loading}>
          Submit
        </button>
      )}
      {loading && <p className="loading-text">Loading...</p>}
      {data.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="word" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <button className="export-button" onClick={handleExportCSV}>
            Export CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
