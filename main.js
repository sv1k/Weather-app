$(function () {
	"use strict";


	function currentTime(){
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		hours = checkTime(hours);
		minutes = checkTime(minutes);
		$(document).ready(function(){
			$(".status-bar").html(hours + ":" + minutes)
		})
		var repeat = setTimeout(currentTime, 500);
		return currentTime;
	};


	function checkTime(i){
		if(i < 10) {
			i = "0" + i;
		}
		return i;
	};

	var city,
		latitude,
		longitude;

	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};


	var getPosition = function (options) {
	return new Promise(function (resolve, reject) {
		navigator.geolocation.getCurrentPosition(resolve, reject, options);
	});
}

	getPosition()
		.then((res) => {
			latitude = res.coords.latitude;
			longitude = res.coords.longitude;
		})
		.then((res) => {
			createScript(latitude, longitude);
			req(latitude, longitude);
		})
		.catch((err) => {
			console.error(err.message);
		});


	function createScript(lat, long) {
		let basicUrl = "https://api.darksky.net/forecast/b1d8361f145557f19805d62a45a93e3a/",
		cb = "?callback=getWeather" + langVersion,
		script = document.createElement("script");

		script.src = basicUrl + lat + "," + long + cb;

		document.body.appendChild(script);
	};

	function req(latitude, longitude) {
		let url = `http://api.geonames.org/countrySubdivisionJSON?lat=${latitude}&lng=${longitude}&username=sv1k`;
		fetch(url).
		then(res => res.json()).
		then(res => {
			city = res.adminName1;

			$(".location").append("<p>" + city.toUpperCase() + "<br>" + "</p>");
			$(".location-tommorow").append("<p>" + city.toUpperCase() + "<br>" + "</p>");
		}).
		catch(e => console.log(e));
	};


currentTime();
checkTime();

});


	var userLang = navigator.language;
	if(userLang === "ru") {
		var langVersion = "&lang=ru&units=si";
	} else {
		var langVersion = "&lang=ru&units=si";
	}


function getWeather(data) {
	var weather = data,
			tomorrow = weather.daily.data[1],
			tomorrowTemp = Math.floor((tomorrow.temperatureMax + tomorrow.temperatureMin) / 2),
			secondDay = weather.daily.data[2],
			secondDayTemp = Math.floor((secondDay.temperatureMax + secondDay.temperatureMin) / 2),
			thirdDay = weather.daily.data[3],
			thirdDayTemp = Math.floor((thirdDay.temperatureMax + thirdDay.temperatureMin) / 2),
			fourthDay = weather.daily.data[4],
			fourthDayTemp = Math.floor((fourthDay.temperatureMax + fourthDay.temperatureMin) / 2),
			wind = Math.floor(weather.currently.windSpeed),
			tempFeels = weather.currently.apparentTemperature,
			humidity = (weather.currently.humidity) * 100;
	var temperature = weather.currently.temperature;
			temperature = (Math.floor(temperature)),
			todaySummary = weather.daily.data[0].summary;
	var weekWeather = weather.daily.summary,
			todayTempMin = Math.floor(weather.daily.data[0].temperatureMin),
			todayTempMax = Math.floor(weather.daily.data[0].temperatureMax);

	var todayDate = new Date(weather.currently.time * 1000)
			.toLocaleString('en', 
			{weekday: 'long',
			month: 'short',
			day: 'numeric'});

	var weatherIcon = weather.currently.icon;

	var active = [];

	active.push(todayDate, weatherIcon, temperature, todaySummary, weekWeather, todayTempMin, todayTempMax);

	console.log(active);

	console.log(weekWeather);

			

			console.log(wind);

	$(document).ready(function(){
		$(".temp").html(active[2] + "<span>" + "&deg" + "</span>");
		$(".weather-icon").addClass('flaticon-' + active[1]);
		$(".location p").append("<span>" + active[0].toUpperCase() + "</span>");
		$("p.day1").append(new Date(tomorrow.time * 1000).toLocaleString('en', {weekday: 'long'}));
		$(".tab-1 span").addClass('flaticon-' + tomorrow.icon);
		$(".tab-1-temp").append( tomorrowTemp + "&deg;");
		$("p.day2").append(new Date(secondDay.time * 1000).toLocaleString('en', {weekday: 'long'}));
		$(".tab-2 span").addClass('flaticon-' + secondDay.icon);
		$(".tab-2-temp").append( secondDayTemp + "&deg;");
		$("p.day3").append(new Date(thirdDay.time * 1000).toLocaleString('en', {weekday: 'long'}));
		$(".tab-3 span").addClass('flaticon-' + thirdDay.icon);
		$(".tab-3-temp").append( thirdDayTemp + "&deg;");
		$("p.day4").append(new Date(fourthDay.time * 1000).toLocaleString('en', {weekday: 'long'}));
		$(".tab-4 span").addClass('flaticon-' + fourthDay.icon);
		$(".tab-4-temp").append( fourthDayTemp + "&deg;");
		$(".weather-status p").append("<span>"+wind + "m/s"+"</span>").append("<span>"+ "Feels like: "+ Math.floor(tempFeels) + "&deg;" + "c" + "</span>").append("<span class='flaticon-raindrop'>"+" %" + Math.floor(humidity)+"</span>");
		$(".additional-info p").append("<br>" + active[3] + "<br>" + "<br>" + "H: " + active[6] + "&#x2103;" + " / " + "L: " + active[5] + "&#x2103;" + "<br>" + "<br>"+ active[4]).css("display", "none");

	});

			$(".screen").on("click", function () {
				$(".tabs p span").slideToggle(400);
				$(".tabs").slideToggle(300);
				$(".additional-info p").slideToggle(400);
			});
			$(".tabs").on("click", function (ev) {
				ev.stopPropagation();
			});
			console.log(tomorrowTemp);
			$(".tab-1").click( function (){
				$(".second-screen").fadeIn(500);
			});
			$(".second-screen").click(function (){
				$(this).fadeOut(400);
			});
			$(".second-screen").on("click", function (ev){
				ev.stopPropagation();
			});


	if(temperature < 0) {
		$(".temp").css("padding-right", "10%");
	};


	console.log(todayDate);

	console.log(weather);
};

