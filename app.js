$(document).ready(function () {
    $(document).on("click", ".city-btn", alertCityName);
    var m = moment();
    $(".redCard").hide()
    console.log(m)

    var userStorageArray = JSON.parse(localStorage.getItem("savedSearches")) || [];
    storageArray();

    function storageArray() {
        // $(".userButtonsDiv").empty();
        console.log("this is what is in userStorageArray: " + userStorageArray);
        for (var j = 0; j < userStorageArray.length; j++) {
            var buttonTag = $("<button>");
            buttonTag.textContent = userStorageArray[j];
            // Adding a class of movie-btn to our button
            buttonTag.addClass("city-btn");
            // Adding a data-attribute
            buttonTag.attr("data-name", userStorageArray[j]);
            // Providing the initial button text
            buttonTag.text(userStorageArray[j]);
            // Adding the button to the buttons-view div
            $(".userButtonsDiv").append(buttonTag);
            $(".userButtonsDiv").append("<br></br>");
        }
    }

    function renderButtons() {
        var userStorageArray = JSON.parse(localStorage.getItem("savedSearches")) || [];
        $(".userButtonsDiv").empty();
        for (var k = 0; k < userStorageArray.length; k++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var newButton = $("<button>");
            // Adding a class of movie-btn to our button
            newButton.addClass("city-btn");
            // Adding a data-attribute
            newButton.attr("data-name", userStorageArray[k]);
            // Providing the initial button text
            newButton.text(userStorageArray[k]);
            // Adding the button to the buttons-view div
            $(".userButtonsDiv").append(newButton);
            $(".userButtonsDiv").append("<br></br>");

        }

    };

    function alertCityName() {
        var newCity = $(this).attr("data-name");
        var newURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + newCity + "&units=metric" + "&APPID=8260f022448e3f07d6465f550bc77374";
        $.ajax({
            url: newURL,
            method: "GET",
            dataType: "jsonp",
            statusCode: {
                404: function () {
                    alert("city not found");
                    return;
                }
            }

        })
            // this is getting the UV index info"

            .then(function (mydata) {
                var newlat = mydata.city.coord.lat;
                var newlong = mydata.city.coord.lon;
                var newCoordsURL;

                if (location.protocol === 'http:') {
                    newCoordsURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + newlat + "&lon=" + newlong + "&APPID=8260f022448e3f07d6465f550bc77374";
                    ;
                } else {
                    newCoordsURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + newlat + "&lon=" + newlong + "&APPID=8260f022448e3f07d6465f550bc77374";

                }


                // var newCoordsURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + newlat + "&lon=" + newlong + "&APPID=8260f022448e3f07d6465f550bc77374";
                console.log(newCoordsURL);

                $.ajax({
                    url: newCoordsURL,
                    method: "GET",

                })
                    //     // We store all of the retrieved data inside of an object called "uvData"
                    .then(function (newUVData) {


                        $(".redCard").text(newUVData[0].value);


                    })

                // Log the queryURL

                $(".card").show();
                $(".redCard").show();
                $(".uvindex").show();
                $(".five-day").show();
                var datecreate = moment().format('D-M-Y');

                // Transfer content to HTML
                $(".city").text(mydata.city.name);
                $(".date").text('(' + datecreate + ')');
                var topIconcode = mydata.list[0].weather[0].icon;
                var topIconurl = "https://openweathermap.org/img/w/" + topIconcode + ".png";
                $("<img>").attr("src", topIconurl);
                $(".iconTop").attr("src", topIconurl);

                $(".temp").text("Temperature: " + mydata.list[0].main.temp + "°C");
                $(".humidity").text("Humidity: " + mydata.list[0].main.humidity + "%");
                $(".wind").text("Wind Speed: " + mydata.list[0].wind.speed + "MPH");


                for (var i = 0; i < 6; i++) {

                    var iconcode = mydata.list[i * 8].weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $("<img>").attr("src", iconurl);
                    $(".icon" + i).attr("src", iconurl);
                    $(".tempCard" + i).text("Temp: " + mydata.list[i * 8].main.temp + "°C");
                    $(".humidCard" + i).text("Humidity: " + mydata.list[i * 8].main.humidity + "%");
                    var timeTest = mydata.list[i * 8].dt_txt.slice(0, -9);
             
                    $(".dateCard" + i).text(timeTest);

                }
            });
    };



    $(".mag").on("click", function () {
        event.preventDefault();
        var userCity = $("#searchField").val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + userCity + "&units=metric" + "&APPID=8260f022448e3f07d6465f550bc77374";
        document.querySelector("#searchField").value = '';

        // Here we are building the URL we need to query the database
        if (userCity !== '') {
            $(".card").show();
            $(".redCard").show();
            $(".five-day").show();
            $(".uvindex").show();
            // var APIKey = "";
            myAjax();
        } else {
            alert("field cannot be empty");
        }

        // Condition

        // IF exisintCityNameArray contains the userCity, then do nothing
        // ELSE do the rest, & add userCity to existingCityNameArray

        function myAjax() {
            // // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
                url: queryURL,
                method: "GET",
                dataType: "jsonp",
                statusCode: {
                    404: function () {
                        alert("city not found");
                        // $("#searchField").clear();
                        return false;

                    }
                }

            })
                //     // this is getting the UV index info"
                .then(function (data) {
                    var lat = data.city.coord.lat;
                    var long = data.city.coord.lon;

                    // var coordsURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&APPID=8260f022448e3f07d6465f550bc77374";

                    var coordsURL;

                    if (location.protocol === 'http:') {
                        coordsURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&APPID=8260f022448e3f07d6465f550bc77374";
                        ;
                    } else {
                        coordsURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + long + "&APPID=8260f022448e3f07d6465f550bc77374";

                    }


                    console.log("i want to know what the lat is: " + lat);
                    console.log("i want to know what the long is: " + long);
                    console.log(coordsURL);

                    $.ajax({
                        url: coordsURL,
                        method: "GET",

                    })
                        //     // We store all of the retrieved data inside of an object called "uvData"
                        .then(function (UVData) {

                            console.log(UVData);
                            $(".redCard").text(UVData[0].value);


                        });

                    var grabStorage = JSON.parse(localStorage.getItem("savedSearches")) || [];

                    var cityAlreadySaved = false;

                    for (var i = 0; i < grabStorage.length; i++) {
                        if (grabStorage[i] === userCity) {
                            cityAlreadySaved = true;
                        }
                    }

                    if (cityAlreadySaved === false) {
                        grabStorage.push(userCity);
                    }

                    localStorage.setItem("savedSearches", JSON.stringify(grabStorage));


                    renderButtons();

                    // Transfer content to HTML
                    $(".city").text(data.city.name);
                    var now = moment();
                    var readableTime = now.format('MMMM Do YYYY');
                    console.log("readable time " + readableTime);



                    var newreadableTime = data.list[0].dt_txt;
                    console.log("new time " + newreadableTime);
                    var create = moment().format('D-M-Y');
                    console.log("moment " + create);
                    // var format = data.list[0].dt_txt.format('MM D YYYY');

                    // console.log("new format " + format)
                    $(".date").text('(' + create + ')');
                    var topIconcode = data.list[0].weather[0].icon;
                    var topIconurl = "http://openweathermap.org/img/w/" + topIconcode + ".png";
                    $("<img>").attr("src", topIconurl);
                    $(".iconTop").attr("src", topIconurl);
                    // console.log("tonnette wants to know " + data.city.name);
                    $(".temp").text("Temperature: " + data.list[0].main.temp + "°C");
                    $(".humidity").text("Humidity: " + data.list[0].main.humidity + "%");
                    $(".wind").text("Wind Speed: " + data.list[0].wind.speed + "MPH");


                    for (var i = 0; i < 6; i++) {
                        var iconcode = data.list[i * 8].weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $("<img>").attr("src", iconurl);
                        $(".icon" + i).attr("src", iconurl);
                        $(".tempCard" + i).text("Temp: " + data.list[i * 8].main.temp + "°C");
                        $(".humidCard" + i).text("Humidity: " + data.list[i * 8].main.humidity + "%");
                        $(".dateCard" + i).text(data.list[i * 8].dt_txt.slice(0, -9));

                    }


                });

        }

    });


});