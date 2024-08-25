document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const jsonInput = document.getElementById('jsonInput').value;

    try {
        const data = JSON.parse(jsonInput);
        console.log('Parsed JSON Data:', data); // Log the parsed JSON data

        fetch('/bfhl', { // Relative URL since Flask serves the frontend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('API Response:', result); // Log the API response
            displayResponse(result);
        })
        .catch(error => {
            console.error('Fetch Error:', error); // Log fetch errors
        });

    } catch (error) {
        alert('Invalid JSON format. Please correct it and try again.');
    }
});

function displayResponse(response) {
    console.log('Displaying Response:', response); // Log the data to be displayed
    const selectElement = document.getElementById('responseSelect');
    const selectedValue = selectElement.value;
    const outputElement = document.getElementById('responseOutput');

    if (response.is_success) {
        let dataToDisplay = response[selectedValue] || [];

        if (selectedValue === 'highest_lowercase_alphabet' && dataToDisplay.length === 0) {
            dataToDisplay = ['None']; // Handle case where no lowercase alphabet is found
        }

        outputElement.innerHTML = `<strong>${selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}:</strong> ${dataToDisplay.join(', ')}`;
    } else {
        outputElement.innerHTML = '<strong>Error:</strong> Failed to process data.';
    }
}
