var http =  require('http');
const querystring = require('querystring');

exports.handler = (event, context, callback) => {
    
    console.log(event);
    
    var city = querystring.escape(event.city);
    
    http.get({
      hostname: 'api.openweathermap.org',
      port: 80,
      path: '/data/2.5/weather?q='+ city +'&appid=' + process.env.APPID + '&cnt=3&units=imperial',
      agent: false  // create a new agent just for this one request
    }, (res) => {
       
       var body = '';
        res.on('data', function(d) {
            body += d;
        });
        
        res.on('end', function() {

            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log(body);
            
            var current = parsed.main.temp;
            var maxTemp = parsed.main.temp_max;
            var minTemp = parsed.main.temp_min;
            var description = parsed.weather[0].main ;
            var descriptionText = parsed.weather[0].description ;
            
            callback(null, {
              description: description + ":" + descriptionText,
              current: current,
              maxTemp: maxTemp,
              minTemp: minTemp
            });
            
        });
    }); 
};