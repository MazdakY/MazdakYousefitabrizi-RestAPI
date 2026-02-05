const apiKey = 'ea7cb3c136cc4037acf52550260502';
const weatherSelect = document.getElementById('locations');
const infoBox = document.getElementById('display');

weatherSelect.addEventListener('change', async () => {
    const cityValue = weatherSelect.value;

    if (!cityValue) {
        infoBox.classList.add('hidden');
        return; 
    }

    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Data not found");
        }

        const data = await response.json();

        // Show the display area
        infoBox.classList.remove('hidden');
        
        // Update the UI elements
        document.getElementById('city').textContent = data.location.name;
        document.getElementById('temp').textContent = Math.round(data.current.temp_c) + "°C";
        document.getElementById('text').textContent = data.current.condition.text;
        
        // Fix the icon URL and update image
        const iconUrl = "https:" + data.current.condition.icon;
        document.getElementById('icon').src = iconUrl;

    } catch (err) {
        console.log("Fetch error:", err);
        alert("Could not load weather. Please try again.");
    }
});
