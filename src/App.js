import React,{useState} from 'react';
import axios from 'axios';
function App() {
  const hourlyData=[
    {id: 1, temp:26, hour: '19:00'},
    {id: 2, temp:28, hour: '20:00'},
    {id: 3, temp:30, hour: '21:00'},
    {id: 4, temp:28, hour: '22:00'},
    {id: 5, temp:27, hour: '23:00'},
  ]
  const dailyData = [
    {id: 1, temp:26, day: 'Tuesday'},
    {id: 2, temp:28, day: 'Wedmesday'},
    {id: 3, temp:30, day: 'Thursday'},
    {id: 4, temp: 28, day: 'Friday'},
    {id: 5, temp: 27, day: 'Saturday'},
  ];

  const API_KEY="8488893a7b0c3d0e163efad67cbcdb15";
  const [data,setData]=useState({});
  const [location,setLocation]=useState('');
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;
  const searchLocation=(event)=>{
    if(event.key==="Enter"){
      axios.get(url).then((response)=>{
        setData(response.data);
        console.log(response.data);
      })
      setLocation('');
    }
  }
  return (
    <div className="app">
    <div className='search'>
      <input
      value={location}
      onChange={(event)=>setLocation(event.target.value)}
      onKeyPress={searchLocation}
      type='text'
      ></input>
    </div>
    <div className='container'>
      <div className='top'>
        <div className='location'>
          <p>{data.name}</p>
        </div>
        <div className='temp'>
        {data.main ? <h1>{((data.main.temp-32)/1.8).toFixed()} &deg;C</h1>:null}
        </div>
        <div className='description'>

        {data.weather ? <p>{data.weather[0].main}</p>:null}
        </div>

      </div>
      <div className='bottom'>
      <div className='feels'>
      {data.main ? <p>{((data.main.feels_like-32)/1.8).toFixed()} &deg;C </p>:null}
      <p>Feels like</p>
      </div>
      <div className='humidity'>
      {data.main ? <p>{data.main.humidity} %</p>:null}
      <p>Humidity</p>
      </div>
      <div className='wind'>
      {data.wind ? <p>{data.wind.speed} MPH</p>:null}
      <p>Wind Speed</p>
      </div>
      </div>

      <div className='bottom'>
      {hourlyData.map(hourly => {
        return (
          <div key={hourly.id}>
            <h2>{hourly.hour}</h2>
            <p>{hourly.temp} &deg;C</p>
          </div>
        );
      })}
    </div>
    <div className='bottom'>
      {dailyData.map(daily => {
        return (
          <div key={daily.id}>
            <h2>{daily.day}</h2>
            <p>{daily.temp} &deg;C</p>
          </div>
        );
      })}
    </div>
    </div>
    <div>
    </div>
    </div>
  );

 
}

export default App;
