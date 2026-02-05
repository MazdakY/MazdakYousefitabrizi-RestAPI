const apiKey = 'ea7cb3c136cc4037acf52550260502';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

const locationSelect = document.getElementById('locations');
const displayDiv = document.getElementById('display');
const cityHeader = document.getElementById('city');
const iconImg = document.getElementById('icon');
const tempSpan = document.getElementById('temp');
const textP = document.getElementById('text');

locationSelect.addEventListener('change', function() {
    const city = locationSelect.value;
    
    if (city) {
        fetchWeatherData(city);
    } else {
        displayDiv.classList.add('hidden');
    }
});

function fetchWeatherData(query) {
    const url = `${baseUrl}?key=${apiKey}&q=${query}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error loading data');
            }
            return response.json();
        })
        .then(data => {
            updateUI(data);
        })
        .catch(err => {
            console.error(err);
        });
}

function updateUI(data) {
    displayDiv.classList.remove('hidden');
    
    cityHeader.textContent = data.location.name;
    tempSpan.textContent = Math.round(data.current.temp_c) + '°C';
    textP.textContent = data.current.condition.text;
    iconImg.src = 'https:' + data.current.condition.icon;
}