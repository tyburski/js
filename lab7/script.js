document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherForSavedLocations();
    displayLocations();
  });
  
  const apiKey = '887c3386ad9fad55d969541f6b897acc';
  
  async function getWeather(city) {

    const formattedCity = formatCityName(city);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error();
      }
  
      const data = await response.json();
      console.log("Pobrano dane");
      return data;
    } catch (error) {
      console.error('Błąd podczas pobierania danych pogodowych:', error);
      return null;
    }
  }

  async function fetchWeatherForSavedLocations() {
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
  
    for (const location of locations) {
      const weatherData = await getWeather(location.name);
  
      if (weatherData) {
        location.weather = weatherData.weather[0].description;
        location.temperature = Math.round(weatherData.main.temp - 273.15);
        location.humidity = weatherData.main.humidity;
      }
    }
  
    localStorage.setItem('locations', JSON.stringify(locations));
  }

  function formatCityName(city) {
    return city.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
  
  function addLocation() {
    const cityName = document.getElementById('city').value.trim();
  
    if (cityName === '') {
      alert('Wpisz nazwę miejscowości.');
      return;
    }
  
    getWeather(cityName)
      .then(weatherData => {
        if (weatherData) {
          const location = {
            name: weatherData.name,
            weather: weatherData.weather[0].description,
            temperature: Math.round(weatherData.main.temp - 273.15),
            humidity: weatherData.main.humidity
          };
  
          let locations = JSON.parse(localStorage.getItem('locations')) || [];
          
          if (locations.length >= 10) {
            alert('Osiągnięto limit miejsc. Usuń jedno miejsce przed dodaniem nowego.');
          } else {
            locations.push(location);
            localStorage.setItem('locations', JSON.stringify(locations));
            fetchWeatherForSavedLocations();
            displayLocations();
            document.getElementById('city').value = '';
          }
        } else {
          alert('Nie udało się pobrać danych pogodowych dla tej miejscowości.');
        }
      });
  }
  
  function displayLocations() {
    const locationsList = document.getElementById('locations-list');
    locationsList.innerHTML = '';
  
    const locations = JSON.parse(localStorage.getItem('locations')) || [];
  
    locations.forEach((location, index) => {
      const locationElement = document.createElement('div');
      locationElement.classList.add('location');
  
      locationElement.innerHTML = `
        <h3>${location.name}</h3>
        <p>Pogoda: ${location.weather}</p>
        <p>Temperatura: ${location.temperature} °C</p>
        <p>Wilgotność: ${location.humidity} %</p>
        <button class="delete-btn" onclick="deleteLocation(${index})">Usuń</button>
      `;
  
      locationsList.appendChild(locationElement);
    });
  }
  
  function deleteLocation(index) {
    let locations = JSON.parse(localStorage.getItem('locations')) || [];
    locations.splice(index, 1);
    localStorage.setItem('locations', JSON.stringify(locations));
    fetchWeatherForSavedLocations();
    displayLocations();
  }
  