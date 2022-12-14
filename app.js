const weather = {
    apiKey: 'e181d51135142307c89e7f12dc97674d',

    fetchTemp: function (place) {
        fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ place +'&appid=' + this.apiKey
        ).then((response) => response.json())
        .then((data) => this.temperature(data))
    },

    temperature: function(data) {
        const { temp } = data.main
        const { name } = data
        document.querySelector('.city').innerText = name
        document.querySelector(".temperature").innerText = temp + ' °F'
    },

    celsius: function() {
        console.log((this.temp - 32) / (1.8)) 
    }
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

