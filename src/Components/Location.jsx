const Location=()=>{

return(
    <div className="right">
        <div className="rightContainer">
          <div className="top">
            <div className="location" id="location"></div>
            <div className="time" id="time"></div>
          </div>
          <div className="currentWeather">
            <div className="weatherIconContainer">
              <img src="" alt="weather icon" id="weatherIcon" />
            </div>
            <div className="currentTemperatureValueContainer">
              <span className="currentTemperatureValue" id="currentTemp"></span>
              <span className="currentTemperatureMetric">˚F</span>
            </div>
            <div className="temperatureDescription" id="weatherDescription"></div>
          </div>
          <div className="sectionTitle">Sunrise & Sunset</div>
          <div className="sunStageContainer">
            <div className="sunIcon"><i className="fa-solid fa-sun"></i></div>
            <div className="col">
              <div className="sunStageTitle">Sunrise</div>
              <div className="sunTime" id="sunrise"></div>
            </div>
            <div className="sunTimeRelative" id="sunriseRelative"></div>
          </div>
          <div className="sunStageContainer">
            <div className="sunIcon"><i className="fa-solid fa-moon"></i></div>
            <div className="col">
              <div className="sunStageTitle">Sunset</div>
              <div className="sunTime" id="sunset"></div>
            </div>
            <div className="sunTimeRelative" id="sunsetRelative"></div>
          </div>
        </div>
      </div>
)
}
export default Location;