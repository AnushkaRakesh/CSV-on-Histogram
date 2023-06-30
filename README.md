# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

**First, we imported all of the dependencies that our code relied on.**


```
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { saveAs } from 'file-saver';
import './App.css';
```


**Then we created a functional component named app, within which we utilised react hooks to track the changing states.**


```
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
```


**We created a method handleFetchData within the app component that downloads the data supplied by the API and prepares it for manipulation by the user.**

```
const handleFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const text = await response.text();
```


**We created an algorithm after retrieving the data to segregate each of the words and count their frequencies solely so that they could be sorted in decreasing order afterwards.**

  ```
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

```

**The handleExportCSV method, which exports the csv once the user hits the button, is then handled.**

```
  const handleExportCSV = () => {
    const csvData = data.map(({ word, count }) => `${word},${count}`).join('\n');
    const blob = new Blob(['word,count\n', csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram-data.csv');
  };
```

**On the initial load, we return a button that, when clicked, displays a histogram of the frequency of the 20 most frequently occurring terms**

```
return (
    <div style={{display: 'flex', 
    alignItems: 'center', justifyContent: 'center', fontSize: '20px', height: '100vh',
    flexDirection: 'column'}}>

      {data.length === 0 && <button onClick={handleFetchData} disabled={loading}>Submit</button>}
      {loading && <p>Loading...</p>}
      {data.length > 0 && (
        <>
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
          <button onClick={handleExportCSV}>Export CSV</button>
        </>
      )}
    </div>
  );
};

export default App;

```
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


### Deployment :Hosted on NETLIFY
<!-- Host Link -->
https://csv-on-histogram.netlify.app/
