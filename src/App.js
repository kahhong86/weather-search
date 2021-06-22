import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const Search = () =>{
	const form = document.querySelector("form");
	const inputCity = document.querySelector('#city');
	const inputCountry = document.querySelector('#country');
	const history = document.querySelector(".history ol");
	const msg = document.querySelector(".message");
	const today = document.querySelector(".today-weather");
	const reset = document.getElementById("reset");
	const toggle = document.querySelector(".magnifier");

	form.addEventListener("submit", e => {
		e.preventDefault();
		let inputCityVal = inputCity.value;
		let inputCountryVal = inputCountry.value;

		const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCityVal},${inputCountryVal}&appid=22dc15f16b68c17e6adeaca94240569a`;

	  	fetch(url)
	    .then(response => response.json())
	    .then(data => {
			// console.log(data);
			const { weather, main } = data;
			const li = document.createElement("li");
			const todayMarkup = `
	          	<span class="input-value"><span class="city-value">${inputCityVal}</span>, <span class="country-value">${inputCountryVal}</span></span>
	           	<div class="result">
	             	<span class="weather">${weather[0]["main"]}<span class="img-icon ${weather[0]["main"]}"></span></span>
	             	<span class="desc"><span class="label">Description: </span> ${weather[0]["description"]}</span>
	             	<span class="temp"><span class="label">Temperature: </span> ${main.temp_min} ~ ${main.temp_max}</span>
	             	<span class="humid"><span class="label">Humidity: </span> ${main.humidity}</span>
	             	<span class="time"><span class="label">Time: </span> ${new Date().toLocaleTimeString()}</span>      
	           	</div>
	      	`;
	      	const historyMarkup = `
	        	<div class="control">
		          	<span class="time">${new Date().toLocaleTimeString()}</span>
	          		<a href="#" class="magnifier" onClick={handleClick}>Open</a>
		          	<a href="#" class="remove">Delete</a>
	        	</div>
	      	`;
			li.innerHTML = '<div class="history-item">' + historyMarkup + todayMarkup + '</div>';
			today.innerHTML = todayMarkup;
			history.appendChild(li);
			msg.innerHTML = "";
	    })
	    .catch((err) => {
	      msg.innerHTML = '<p>Wrong value input. Please key in the correct information.</p>';
		});
	});

	reset.addEventListener("click",() => {
		history.innerHTML = "";
		today.innerHTML = "";
	})

	return null;	
}



export default Search;
