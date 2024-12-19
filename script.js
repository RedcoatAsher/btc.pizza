function updateBitcoinPrice(currency = 'USD') {
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot')
      .then(response => response.json())
      .then(data => {
        const price = parseFloat(data.data.amount);
  
        // Calculate price in the selected currency
        let currentPrice = price;
        if (currency === 'GBP') {
          // Assume an exchange rate for GBP (replace with actual fetched rate if needed)
          currentPrice *= 0.8; // Example: 1 USD = 0.8 GBP
        } else if (currency === 'EUR') {
          // Assume an exchange rate for EUR (replace with actual fetched rate if needed)
          currentPrice *= 0.9; // Example: 1 USD = 0.9 EUR
        }
  
        // Calculate multiplied price as a whole number
        const multipliedPrice = Math.round(currentPrice * 10000);
        document.getElementById('multiplied-price').textContent = `${multipliedPrice.toLocaleString('en-US', { style: 'currency', currency: currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      })
      .catch(error => {
        console.error('Error fetching Bitcoin price:', error);
        // Display an error message on the page
        document.getElementById('multiplied-price').textContent = 'Error fetching Bitcoin price.';
      });
  }
  
  // Call the function initially to display the price in USD
  updateBitcoinPrice();
  
  // Add event listeners to the buttons
  const buttons = document.querySelectorAll('.btn-group button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to the clicked button
      button.classList.add('active');
  
      updateBitcoinPrice(button.id.split('-')[0].toUpperCase()); // Extract currency code from button ID
    });
  });