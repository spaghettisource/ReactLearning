import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editItemId, setEditItemId] = useState(null); // Track the ID of the item being edited
  const [editedDescription, setEditedDescription] = useState(''); // Track the edited description

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: editedDescription, completed: true })
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setData(data.map(todo => (todo.id === id ? updatedTodo : todo)));
      setEditItemId(null); // Exit edit mode after successful update
    } catch (error) {
      console.error('Error updating todo:', error);
      // Handle error state or display error to the user
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setData(data.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Handle error state or display error to the user
    }
  };

  const handleEdit = (id, initialDescription) => {
    setEditItemId(id); // Enter edit mode for the selected item
    setEditedDescription(initialDescription); // Set initial description for editing
  };

  const cancelEdit = () => {
    setEditItemId(null); // Cancel edit mode
    setEditedDescription(''); // Clear edited description
  };

  const logMessage = async () => {
    console.log('Fetching todos...');
    const response = await fetch('http://localhost:3000/todos');
    console.log('Response:', response);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {data &&
          data.map(item => (
            <li key={item.id}>
              {editItemId === item.id ? ( // Check if the item is in edit mode
                <>
                  <input
                    type="text"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(item.id)}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {item.description}
                  <button onClick={() => handleEdit(item.id, item.description)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
      </ul>
      <button onClick={logMessage}>Log Message</button>
    </div>
  );
};

export default MyComponent;
