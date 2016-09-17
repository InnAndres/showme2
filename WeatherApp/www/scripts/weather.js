// Get a free key at http://openweathermap.org/. Replace the "Your_Key_Here" string with that key.
var OpenWeatherAppKey = "def53599590cafd10b18d957bb6b8ac5";

var title;
var comments;

function getTextFields() {

    title = $('#title-text-input').val();
    comments = $('#comment-text').val();

    getWeatherWithGeoLocation();

//    var queryString =
//        'http://api.openweathermap.org/data/2.5/weather?zip='
//         + zipcode + ',us&appid=' + OpenWeatherAppKey + '&units=imperial';

//    $.getJSON(queryString, function (results) {

        showWeatherData(results);

//    }).fail(function (jqXHR) {
//        $('#error-msg').show();
//        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
//    });

    return false;

}

function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise * 1000);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunset * 1000);
        $('#sunset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }

// snap a photo
    navigator.camera.getPicture(function (imageUri) {
        var lastPhotoContainer = document.getElementById("lastPhoto");
        lastPhotoContainer.innerHTML = "<img src='" + imageUri + "' style='width:75%' />";
    })


}

function getWeatherWithGeoLocation() {

    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
      { enableHighAccuracy: true });

    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');

    $('#takePhoto-btn').prop('disabled', true);
}
function onGetLocationSuccess(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
      + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial';

    $('#takePhoto-btn').prop('disabled', false);

    $.getJSON(queryString, function (results) {

        showWeatherData(results);

    }).fail(function (jqXHR) {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
    });


    $.post("http://52.30.207.161/teabeleht/index.php/request/post/k2admin/items?api_key=B4S5NJLS94Y134OR4V2N",
{
    title: '' + title + '',
    text: '' + comments + '',
    catid: '40',
    published: '1',
    created_by: '587',
    K2ExtraField_1: '' + latitude + '',
    K2ExtraField_2: '' + longitude + '',
    K2ExtraField_3: '15.5',
},

      function (data, status) {
//          window.alert("Sisestatud");
      });

}
function onGetLocationError(error) {

    $('#error-msg').text('Error getting location');
    $('#takePhoto-btn').prop('disabled', false);
}
