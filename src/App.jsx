import React, {useState, useEffect, useRef} from 'react';
import Location from './Components/Location';
import Temperature from './Components/Temperature Forecast';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './App.css';
// ok boss
// Join the audio call on the left
function App() {
	const [weathervalue, setweathervalue] = useState(null);
	const [searchcity, setsearchcity] = useState();
	const [tempmin, settemp] = useState();
	const [sunrise, setsunnrise] = useState();
	const chartRef = useRef();
	const [cityName, setCityName] = useState('Lagos');
	const [weatherIcon, setweathericon] = useState();
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const getweatherdata = async () => {
		let forcast = fetch(
			`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=8109965e7254a469d08a746e8b210e1e&units=imperial&cnt=10`
		)
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				return data;
			});

		let currentweatherdata = fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=40e60d65dccd1808a9bd71eab81def8b&units=imperial`
		)
			.then(res => {
				return res.json();
			})
			.then(data => {
				//console.log( data[0].main.temp.toFixed(1)
				return data;
			});

		let allpromise = await Promise.all([forcast, currentweatherdata]);
		setweathervalue(allpromise);
		//console.log(allpromise)
	};
	useEffect(() => {
		getweatherdata();
	}, [cityName]);
	//console.log(weathervalue)
	//const newdate=(new Date(weathervalue[0].sys.sunset * 1000))
	useEffect(() => {
		const renderChart = () => {
			// Store the DOM element that will hold the chart
			//@ts-ignore
			const myChart = echarts.init(chartRef.current);
			const data = weathervalue[0].list;

			const option = {
				legend: {
					data: ['temperature'],
				},
				tooltip: {},
				xAxis: {
					data: data.map(item => item.dt_txt),
				},
				yAxis: {},
				series: [
					{
						type: 'line',
						smooth: true,
						areaStyle: {
							opacity: 0.5,
						},
						data: data.map(item => item.main.temp),
					},
				],
			};

			// Using the given function from the documentation, generate the chart using the options above
			myChart.setOption(option);
		};
		weathervalue && weathervalue[0].cod == '200' && renderChart();
	}, [weathervalue]);
	const handleSearch = e => {
		setCityName(searchcity);
	};
	return (
		<div className="App">
			<div className="wrapper">
				<div className="container">
					<div className="container-inner ">
						<header>
							<div className="date">
								{new Date(Date.now()).toLocaleString('en-US', {
									weekday: 'long',
									month: 'short',
									day: 'numeric',
									year: 'numeric',
								})}
							</div>
							<div className="searchBar">
								<i className="fa-solid fa-magnifying-glass"></i>
								<input
									className="searchInput"
									id="searchInput"
									type="text"
									onChange={e => {
										setsearchcity(e.target.value);
										//	console.log(e.target.value);
									}}
								/>

								<button className="searchButton" onClick={handleSearch}>
									Search
								</button>
							</div>
						</header>
						<div className="todayOverview">
							<div className="sectionTitle">Today Overview</div>

							<div className="row">
								<div className="overviewProp">
									<div className="propIconContainer">
										<i className="propIcon fa-solid fa-wind"></i>
									</div>
									<div className="propValueContainer">
										<div className="propMain">
											<span className="primaryData">
												<div className="propTitle">Wind</div>
												{weathervalue && weathervalue[0].cod == '200' && (
													<span className="propValue" id="wind">
														{weathervalue[1].wind.speed.toFixed(1)}
													</span>
												)}

												<span className="propMetric"> mph</span>
											</span>
											<span className="secondaryData" id="windDir"></span>
										</div>
									</div>
								</div>
								<div className="overviewProp">
									<div className="propIconContainer">
										<i className="propIcon fa-solid fa-temperature-half"></i>
									</div>
									<div className="propValueContainer">
										<div className="propTitle">Lowest / Highest</div>
										<div className="propMain">
											<span className="primaryData">
												{weathervalue && weathervalue[0].cod == '200' && (
													<span className="propValue" id="lowestToday">
														{Math.round(weathervalue[1].main.temp_min)}
													</span>
												)}

												<span className="propMetric">˚F</span>
												<span> / </span>
												{weathervalue && weathervalue[0].cod == '200' && (
													<span className="propValue" id="highestToday">
														{Math.round(weathervalue[1].main.temp_max)}
													</span>
												)}

												<span className="propMetric">˚F</span>
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="overviewProp">
									<div className="propIconContainer">
										<i className="propIcon fa-solid fa-water"></i>
									</div>
									<div className="propValueContainer">
										<div className="propTitle">Pressure</div>
										<div className="propMain">
											<span className="primaryData">
												{weathervalue && weathervalue[0].cod == '200' && (
													<span className="propValue" id="pressure">
														{weathervalue[1].main.pressure}
													</span>
												)}
												<span className="propMetric">hpa</span>
											</span>
										</div>
									</div>
								</div>

								<div className="overviewProp">
									<div className="propIconContainer">
										<i className="propIcon fa-solid fa-droplet"></i>
									</div>
									<div className="propValueContainer">
										<div className="propTitle">Humidity</div>
										<div className="propMain">
											<span className="primaryData">
												{weathervalue && weathervalue[0].cod == '200' && (
													<span className="propValue" id="humidity">
														{weathervalue[1].main.humidity}
													</span>
												)}
												<span className="propMetric">%</span>
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="tempForecast">
								<div className="sectionTitle">Temperature Forecast</div>
								<div
									ref={chartRef}
									style={{width: '100%', height: '400px', marginTop: '-45px',marginLeft:'-15px'}}
								></div>
							</div>
						</div>
					</div>
				</div>
				<div className="right">
					<div className="rightContainer">
						<div className="top">
							<div className="location" id="location">
								{weathervalue &&
									weathervalue[0].cod == '200' &&
									weathervalue[0].city.name}
							</div>
							<div className="time" id="time">
								{new Date(Date.now()).toLocaleString('en-US', {
									hour: 'numeric',
									minute: 'numeric',
								})}
							</div>
						</div>
						{weathervalue && weathervalue[0].cod == '200' && (
							<div className="currentWeather">
								<div className="weatherIconContainer">
									<img
										src={`https://openweathermap.org/img/wn/${weathervalue[1].weather[0].icon}@2x.png`}
										alt="weather icon"
										id="weatherIcon"
									/>
								</div>
								<div className="currentTemperatureValueContainer">
									<span
										className="currentTemperatureValue"
										id="currentTemp"
									></span>
									<span className="currentTemperatureMetric">
										{weathervalue[1].main.temp.toFixed(1)}˚F
									</span>
								</div>
								<div className="temperatureDescription" id="weatherDescription">
									{weathervalue[1].weather[0].main}
								</div>
							</div>
						)}
						<div className="sectionTitle">Sunrise & Sunset</div>
						<div className="sunStageContainer">
							<div className="sunIcon">
								<i className="fa-solid fa-sun"></i>
							</div>
							<div className="col">
								<div className="sunStageTitle">Sunrise</div>
								{weathervalue && weathervalue[0].cod == '200' && (
									<div className="sunTime" id="sunrise">
										{new Date(
											weathervalue[1].sys.sunrise * 1000
										).toLocaleTimeString('en-US', {
											hour: 'numeric',
											minute: 'numeric',
										})}
									</div>
								)}
							</div>
							{weathervalue && weathervalue[0].cod == '200' && (
								<div className="sunTimeRelative" id="sunriseRelative">
									{timeago.format(new Date(weathervalue[1].sys.sunrise * 1000))}
								</div>
							)}
						</div>
						<div className="sunStageContainer">
							<div className="sunIcon">
								<i className="fa-solid fa-moon"></i>
							</div>
							<div className="col">
								<div className="sunStageTitle">Sunset</div>
								{weathervalue && weathervalue[0].cod == '200' && (
									<div className="sunTime" id="sunset">
										{new Date(
											weathervalue[1].sys.sunset * 1000
										).toLocaleTimeString('en-US', {
											hour: 'numeric',
											minute: 'numeric',
										})}
									</div>
								)}
							</div>
							{weathervalue && weathervalue[0].cod == '200' && (
								<div className="sunTimeRelative" id="sunsetRelative">
									{timeago.format(new Date(weathervalue[1].sys.sunset * 1000))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
