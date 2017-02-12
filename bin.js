//initializing commands
$(document).ready(function() {weather()});

//==================== CHALLENGE COMMANDS ==========================
function name(str) {
    setName(str)
}

function machine(str) {
    setMachine(str)
}

function k_to_f(kelvin) {
	return ((9 / 5) * (kelvin - 273) + 32).toFixed(0);
}

function weather() {
    //this might throw a mixed content error, but running it from a local file works
    var json_url = "http://api.openweathermap.org/data/2.5/weather?q=Morningside+Heights,ny&appid=6e131a2916d5d45d8367b72a4675be0a";
    var city;
    var temp_curr;
    var temp_low;
    var temp_high;
    var description;
    var weatherCode;
    var humidity;

    $.when(
        $.getJSON(json_url)
    ).done(function(json_obj) {
		city = json_obj["name"];
		temp_curr = k_to_f(json_obj["main"]["temp"]);
		temp_low = k_to_f(json_obj["main"]["temp_min"]);
		temp_high = k_to_f(json_obj["main"]["temp_max"]);
		description = json_obj.weather[0].description;
        weatherCode = Number(json_obj["weather"][0]["id"]);
        humidity = Number(json_obj["main"]["humidity"])
        var disgusting = (weatherCode > 500
            && weatherCode < 800
            || Number(temp_low) < 30
            || Number(temp_high) > 95
            || humidity > 75);
        description = description.charAt(0).toUpperCase() + description.slice(1)
        var weatherString = "It's " + temp_curr + "&deg; out. " + description + ". "
        disgusting ? weatherString += "Disgusting." : weatherString += "Not bad."
        print(weatherString)
	})
}

function loadURL(url) {
    print("Loading " + url + "...")
    window.location = url
}

function time(str) {
    var today = new Date();
    var h = today.getHours();
    //america
    if (h >= 13) {
        h -= 12;
    } else if (h < 1) {
        h += 12;
    }
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    print(h + ":" + m + ":" + s);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function date(s) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    var date = new Date();
    var day = date.getDate();
    var weekday = date.getDay();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    print(days[weekday] + ", " + monthNames[monthIndex] + " " + day)
}

function reddit(s) {
    print("Usage: /r/[subreddit] or /u/[user]")
}

function chan(s) {
    print("Usage: /[board] or /[board]/")
}

function dice(s) {
    print("Usage: [number]d[number]+[modifier]")
}
