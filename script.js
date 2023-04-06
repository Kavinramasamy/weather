var container=document.createElement("div");
container.className="container";

var row=document.createElement("div");
row.className="row";
row.classList.add("row","m-3");
container.append(row);


var res=fetch("https://restcountries.com/v2/all");
res.then((data)=>data.json())
.then((data1)=>foo(data1))
.catch((error)=>console.log(error));
var countrydata;

function foo(data1){
    countrydata=data1;
    console.log(data1);
    for(var i=0;i<data1.length;i++){
       var id_val=i;
       try{
        var lat=data1[i].latlng[0];
        var lng=data1[i].latlng[1];
       }
       catch{
        var lat="no_val";
        var lng="no_val";
       }

      
    
      row.innerHTML+=
      `<div class="col-md-4" >
     <div class="card border-mb-3" style="width: 18rem;">
     <h5 class="card-title">${data1[i].name}</h5>
    <img src="${data1[i].flag}" class="card-img-top" alt="country flag">
     <div class="card-body" id="${id_val}">
    <p class="card-text">Capital:${data1[i].capital}</p>
    <p class="card-text">Population:${data1[i].population}</p>
    <p class="card-text">Region:${data1[i].region}</p>
    <p class="card-text">Country codes:${data1[i].alpha3Code}</p>
    <button class="btn btn-primary" value="${id_val},${lat},${lng}" id="${id_val},${lat}" onclick="weathervalues(value)">Click for Weather</button>
     </div>
    </div>
     </div>`
     }
     
     
    }
    document.body.append(container);
    var Temperature;
    var Humidity;
    var pressure;
    var weather;
    function weathervalues(val){
        var values=val.split(",");
        var i=values[0];
        var latvalue=+values[1];
        var lngvalue=+values[2];
        if(latvalue!="no_val" && lngvalue!="no_val"){
            var url=`https://api.openweathermap.org/data/2.5/weather?lat=${latvalue}&lon=${lngvalue}&appid=063c2ce647b08afd7e654349b7774464`;
            var res=fetch(url);
            res.then((data)=>data.json())
            .then((weatherdata)=>{
                document.getElementById(i).innerHTML=
                    `<p class="card-text">Capital:${countrydata[i].capital}</p>
                    <p class="card-text">population:${countrydata[i].population}</p>
                    <p class="card-text">Region:${countrydata[i].region}</p>
                    <p class="card-text">Country codes:${countrydata[i].alpha3Code}</p>`
                Temperature=weatherdata.main.temp;
                Humidity=weatherdata.main.humidity;
                pressure=weatherdata.main.pressure;
                weather=weatherdata.weather[0].description;
                document.getElementById(i).innerHTML+=`<p class="card-text">Temperature : ${Temperature}</p>`;
                document.getElementById(i).innerHTML+=`<p class="card-text">Presure : ${pressure}</p>`;
                document.getElementById(i).innerHTML+=`<p class="card-text">Humidity : ${Humidity}</p>`;
                document.getElementById(i).innerHTML+=`<p class="card-text">Weather : ${weather}</p>`;

                })
                .catch((error)=>{
                    console.log(error)
                    document.getElementById(i).innerHTML=
                    `<p class="card-text">Capital:${countrydata[i].capital}</p>
                    <p class="card-text">population:${countrydata[i].population}</p>
                    <p class="card-text">Region:${countrydata[i].region}</p>
                    <p class="card-text">Country codes:${countrydata[i].alpha3Code}</p>`
                });
                if(Temperature!=undefined){
                    document.getElementById(i).innerHTML=
                    `
                        <p class="card-text">Capital : ${countrydata[i].capital}</p>
                        <p class="card-text">Region : ${countrydata[i].region}</p>
                        <p class="card-text">Country Codes : ${countrydata[i].alpha3Code}</p>
                        <p class="card-text">Temperature : ${Temperature}</p>
                        <p class="card-text">Humidity : ${Humidity}</p>
                        <p class="card-text">Pressure : ${pressure}</p>
                        <p class="card-text">Weather : ${weather}</p>
                    `
                }
            }
            else{
                document.getElementById(i).innerHTML=
                `
                    
                <p class="card-text">Capital : ${countrydata[i].capital}</p>
                <p class="card-text">Region : ${countrydata[i].region}</p>
                <p class="card-text">Country Codes : ${countrydata[i].alpha3Code}</p>
                <p class="card-text">Sorry We can't get Weather</p>
                `
            }
            }

    
        
    
    
