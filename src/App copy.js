import React, { useState } from 'react';

function App() {
  const [customerID, setCustomerID] = useState('');
  const [pageViews, setPageViews] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [predictedProduct, setPredictedProduct] = useState(null);
  const [error, setError] = useState('');

  const handlePredict = async () => {
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerID,
          page_views: parseFloat(pageViews),
          time_spent: parseFloat(timeSpent),
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error);
      }

      const data = await response.json();
      setPredictedProduct(data);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ backgroundColor: '#007bff', color: 'white', padding: '20px', borderRadius: '5px', fontSize: '45px' }}>Product Prediction</h1>
      <div style={{ marginBottom: '10px',  padding: '8px' }}>
        <label style={{ marginRight: '20px', fontSize: '25px' }}>Customer ID:</label>
        <input type="text" value={customerID} onChange={(e) => setCustomerID(e.target.value)} style={{ width: '200px', padding: '7px' }} />
      </div>
      <div style={{ marginBottom: '10px',  padding: '8px' }}>
        <label style={{ marginRight: '26px', fontSize: '25px' }}>Page Views:</label>
        <input type="text" value={pageViews} onChange={(e) => setPageViews(e.target.value)} style={{ width: '200px', padding: '7px' }} />
      </div>
      <div style={{ marginBottom: '10px',  padding: '8px' }}>
        <label style={{ marginRight: '28px', fontSize: '25px' }}>Time Spent:</label>
        <input type="text" value={timeSpent} onChange={(e) => setTimeSpent(e.target.value)} style={{ width: '200px', padding: '7px' }} />
      </div>
      <button onClick={handlePredict} style={{ backgroundColor: '#28a745', color: 'white', padding: '10px', borderRadius: '5px', border: 'none',  width: '200px', fontSize: '25px', marginTop:'40px' }}>Predict</button>
      {predictedProduct && (
        <div style={{ marginTop: '20px', backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px' }}>
          <h2>Predicted Product:</h2>
          <p>Product ID: {predictedProduct.product_id}</p>
          <p>Category: {predictedProduct.category}</p>
          <p>Price: {predictedProduct.price}</p>
          <p>Ratings: {predictedProduct.ratings}</p>
        </div>
      )}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>Error: {error}</p>}
    </div>
  );
}

export default App;
