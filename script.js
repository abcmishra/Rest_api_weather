var main = document.createElement('div')
main.classList.add('container')
document.body.appendChild(main)

const countries = fetch('https://restcountries.eu/rest/v2/all')

countries
	.then((response) => {
		return response.json()
	})
	.then((data) => {
		let numofCols = 3
		let numOfRows = Math.ceil(data.length / numofCols)
		let k = 0
		for (let i = 0; i <= numOfRows; i++) {
			let row = document.createElement('div')
			row.classList.add('row')
			for (let j = 0; j < numofCols; j++) {
				if (k === 250) {
					break
				}
				let col = document.createElement('div')
				col.classList.add('col-lg-4', 'col-sm-12', 'my-3')

				let card = document.createElement('div')
				card.classList.add('card', 'h-100')
				col.appendChild(card)

				let cardHeader = document.createElement('h4')
				cardHeader.classList.add(
					'card-header',
					'bg-black',
					'text-light',
					'text-center'
				)
				cardHeader.innerHTML = data[k].name
				card.appendChild(cardHeader)

				let cardBody = document.createElement('div')
				cardBody.classList.add('card-body', 'card-bg', 'text-center')
				card.appendChild(cardBody)

				let flag = document.createElement('img')
				flag.src = data[k].flag
				flag.classList.add('w-100', 'h-50', 'my-3')
				cardBody.appendChild(flag)

				let capital = document.createElement('div')
				capital.classList.add('h5', 'text-white')
				capital.innerHTML = 'Capital: ' + data[k].capital
				cardBody.append(capital)

				let region = document.createElement('div')
				region.classList.add('h5', 'text-white')
				region.innerHTML = 'Region: ' + data[k].region
				cardBody.append(region)

				let countrycode = document.createElement('div')
				countrycode.classList.add('h5', 'text-white')
				countrycode.innerHTML = 'Country Code: ' + data[k].alpha3Code
				cardBody.append(countrycode)

				let weatherbtn = document.createElement('button')
				weatherbtn.classList.add('btn', 'btn-outline-light')
				weatherbtn.innerHTML = 'Click for Weather'
				weatherbtn.addEventListener('click', () => {
					let cap = capital.innerHTML.split(':')[1].trim()
					let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cap}&appid=f89cd7489411e479ce9da485708082d2`
					fetch(weatherAPI)
						.then((response) => {
							if (!response.ok) {
								if (response.status === 400)
									throw Error(`Capital Doesn't Exist`)
								else throw Error(response.statusText)
							}
							return response.json()
						})
						.then((data) => {
							let lines = [
								`The longitude is ${data.coord.lon}`,
								`The latitude is ${data.coord.lat}`,
								`The temprature is ${Math.round(
									data.main.temp - 273.15
								)} degree Celsius.`,
								`The weather is ${data.weather[0].description}.`,
								`The humidity is ${data.main.humidity}%.`,
								`The wind speed is ${data.wind.speed} m/s.`,
							]
							swal(
								`${cardHeader.innerHTML} Weather`,
								lines.join('\n'),
								'success'
							)
						})
						.catch((err) => {
							swal('Error', err.toString(), 'error')
						})
				})

				cardBody.appendChild(weatherbtn)
				k++
				row.appendChild(col)
			}
			main.appendChild(row)
		}
	})
	.catch((err) => {
		console.log(err)
	})
