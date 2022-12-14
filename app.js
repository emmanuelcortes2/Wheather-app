const weather = {
    apiKey: 'e181d51135142307c89e7f12dc97674d',
	units: 'metric',

    fetchTemp: function (place) {
        fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid=' + this.apiKey +'&units=' + this.units + '&lang=es'
        ).then((response) => response.json())
        .then((data) => this.currentWeather(data))
				.catch(err => { document.querySelector('#error').innerText = 'Lugar no encontrado, ingrese otro lugar y vuelva a intentarlo' })
    },

    currentWeather: function(data) {
			const { name } = data
			const { feels_like, humidity, temp_max, temp_min, pressure, temp } = data.main
			const { description } = data.weather[0]
			document.querySelector('.city').innerText = name
			document.querySelector('.temperature').innerText = Math.round(temp) + ' °C'
			document.querySelector('#condt').innerText = ' ' +  description[0].toUpperCase() + description.substring(1)
			document.querySelector('#feels_like').innerText = ' ' + Math.round(feels_like) + ' °C'
			document.querySelector('#humidity').innerText = ' ' + humidity +' %'
			document.querySelector('#min').innerText = ' ' + Math.round(temp_min) + ' °C'
			document.querySelector('#max').innerText = ' ' + Math.round(temp_max) + ' °C'
			document.querySelector('#press').innerText = ' ' + pressure
			document.querySelector('#error').innerText = ''
    },
}

const weatherF = {
    apiKey: 'e181d51135142307c89e7f12dc97674d',
	units: 'imperial',

    fetchTemp: function (place) {
        fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid=' + this.apiKey +'&units=' + this.units + '&lang=es'
        ).then((response) => response.json())
        .then((data) => this.currentWeather(data))
				.catch(err => { document.querySelector('#error').innerText = 'Lugar no encontrado, ingrese otro lugar y vuelva a intentarlo' })
    },

    currentWeather: function(data) {
			const { name } = data
			const { feels_like, humidity, temp_max, temp_min, pressure, temp } = data.main
			const { description } = data.weather[0]
			document.querySelector('.city').innerText = name
			document.querySelector('.temperature').innerText = Math.round(temp) + ' °F'
			document.querySelector('#condt').innerText = ' ' +  description[0].toUpperCase() + description.substring(1)
			document.querySelector('#feels_like').innerText = ' ' + Math.round(feels_like) + ' °F'
			document.querySelector('#humidity').innerText = ' ' + humidity +' %'
			document.querySelector('#min').innerText = ' ' + Math.round(temp_min) + ' °F'
			document.querySelector('#max').innerText = ' ' + Math.round(temp_max) + ' °F'
			document.querySelector('#press').innerText = ' ' + pressure
			document.querySelector('#error').innerText = ''
    },
}

const input = document.querySelector('.input')
const search = document.getElementById('search')
const imperial = document.getElementById('imperial')
const metric = document.getElementById('metric')

search.addEventListener('click', () => {
    weather.fetchTemp(input.value)
})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        weather.fetchTemp(input.value)
    }
})

input.addEventListener('click', () => {
    input.value = ''
})

imperial.addEventListener('click', () => {
	weatherF.fetchTemp(input.value)
})

metric.addEventListener('click', () => {
	weather.fetchTemp(input.value)
})

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
}

function success(pos) {
  const crd = pos.coords
	placing.fetchPlace(crd.latitude, crd.longitude)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`)
}

navigator.geolocation.getCurrentPosition(success, error, options)

const placing = {
	apiKey: 'e181d51135142307c89e7f12dc97674d',

	fetchPlace: function (lat, lon) {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey
		).then((response) => response.json())
		.then((city) => this.currentPlace(city))
	},

	currentPlace: function(city) {
		const { name } = city
		weather.fetchTemp(name)
		input.value = name
	}
}

