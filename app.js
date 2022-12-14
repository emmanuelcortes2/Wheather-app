const weather = {
    apiKey: 'e181d51135142307c89e7f12dc97674d',

    fetchTemp: function (place) {
        fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid=' + this.apiKey +'&units=metric&lang=es'
        ).then((response) => response.json())
        .then((data) => this.currentWeather(data))
    },

    currentWeather: function(data) {
			const { temp } = data.main
			const { name } = data
			const { feels_like } = data.main
			const { humidity } = data.main
			const { temp_min } = data.main
			const { temp_max } = data.main
			const { pressure } = data.main
			const { description } = data.weather[0]
			document.querySelector('.city').innerText = name
			document.querySelector(".temperature").innerText = Math.round(temp) + ' °C'
			document.querySelector('#condt').innerText = ' ' +  description[0].toUpperCase() + description.substring(1)
			document.querySelector('#feels_like').innerText = ' ' + Math.round(feels_like) + ' °C'
			document.querySelector('#humidity').innerText = ' ' + humidity +' %'
			document.querySelector('#min').innerText = ' ' + Math.round(temp_min) + ' °C'
			document.querySelector('#max').innerText = ' ' + Math.round(temp_max) + ' °C'
			document.querySelector('#press').innerText = ' ' + pressure
    },
}

weather.fetchTemp('Mexico')

const input = document.querySelector('.input')

const search = document.getElementById('search')


search.addEventListener('click', () => {
    weather.fetchTemp(input.value)
    input.value = ''
})

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        weather.fetchTemp(input.value)
        input.value = ''
    }
})

