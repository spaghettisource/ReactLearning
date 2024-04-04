import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        if (!response.ok) {
          //throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    

    fetchData();
  }, []);
    const logMessage = async () => {
      console.log("function called");
      const response = await fetch('http://localhost:3000/todos');
      console.log(response);
    };

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <h1>Test</h1>
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data && (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.description}</li>
          ))}
        </ul>
      )}

      <button onClick={logMessage}></button>
    </div>
  );
};

export default MyComponent;
