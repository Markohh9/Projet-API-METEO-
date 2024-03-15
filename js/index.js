const cityForm=document.querySelector("form"),card=document.querySelector(".card"),icon=document.querySelector(".icon img"),resetBtn=document.getElementById("changeCityBtn"),displayForm=document.getElementById("formInput"),updateUI=async t=>{let{cityDets:e,weather:i,sunrise:a,sunset:r,forecast:n}=t,o=t=>{let e=new Date,i={timeZone:t,hour:"numeric",minute:"numeric",second:"numeric"},a=new Intl.DateTimeFormat("fr-FR",i);return a.format(e)},s=e.TimeZone.Name,h=o(s);console.log("Local time:",h);let c=t=>{let e=parseInt(t.split(":")[0]);return e>=8&&e<18?"day":e>=6&&e<8||e>=18&&e<21?"twilight":"night"},g=i.WeatherIcon;console.log("Weather icon code:",g);let l=t=>{let e={Soleil:[1,2,3,4,30,33,34],Nuageux:[5,6,7,38],Pluie:[12,13,14,18,39,40],Vent:[32,35,36],Brume:[8,11,37],Neige:[22,23,24,25,26,29,44],Tempete:[15,16,17,19,20,21,31,41,42,43]};for(let[i,a]of Object.entries(e))if(a.includes(t))return i;return"Autre"},m={day:{Soleil:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-day.gif",Nuageux:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-day.gif",Pluie:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-day.gif",Vent:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-day.gif",Brume:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-day.gif",Neige:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-day.gif",Tempete:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-day.gif"},twilight:{Soleil:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-twilight.gif",Nuageux:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-twilight.gif",Pluie:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-twilight.gif",Vent:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-twilight.gif",Brume:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-twilight.gif",Neige:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-twilight.gif",Tempete:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-twilight.gif"},night:{Soleil:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/sun-night.gif",Nuageux:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/cloud-night.gif",Pluie:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/rain-night.gif",Vent:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/wind-night.gif",Brume:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/fog-night.gif",Neige:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/snow-night.gif",Tempete:"https://raw.githubusercontent.com/Markohh9/Projet-API-METEO-/main/img/weather/storm-night.gif"}},u=c(h),d=l(g);console.log("Type de m\xe9t\xe9o:",d),console.log("Time of day:",c(h));let p=m[u][d];console.log("Chemin du fond d'\xe9cran:",p);let w=t=>{let e=document.querySelector(".container-body");e.style.backgroundImage=`url(${t})`,e.style.backgroundSize="cover",e.style.opacity="1",e.style.backgroundRepeat="no-repeat"};w(p);let f=t=>{let e=Math.floor((t[0].Temperature.Value-32)*5/9),i=Math.floor((t[5].Temperature.Value-32)*5/9);return{morningTemperature:e,afternoonTemperature:i}},{morningTemperature:y,afternoonTemperature:E}=f(n);console.log("Morning temperature:",y),console.log("Afternoon temperature:",E),card.innerHTML=`
    <div class="align-top-card">
        <div class="txt-top-card">
            <div class="weather-name">${i.WeatherText}</div>
            <h5 class="city-name-desc">${e.EnglishName}, ${e.Country.EnglishName}, ${e.AdministrativeArea.EnglishName}</h5>
        </div>
        <div class="temp-txt">
            <span>${i.Temperature.Metric.Value}</span>
            <span>&deg</span>
        </div>
    </div>
    <div class="cardimgtemp">
        <div class="infoday">
            <div class="cardinfoday">
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Ce matin il devrait faire:</p>
                    <div class="temp-txt">
                        <span>${y}</span>
                        <span>&deg</span>
                    </div>
                    <span class="weatherofpartday">${l(n[0].WeatherIcon)}</span>
                </div>
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Le soleil se l\xe8ve \xe0:</p>
                    <span class="infocardhours">${a}</span>
                </div>
            </div>
            <div class="cardinfoday">
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Cet apr\xe8s midi il devrait faire:</p>
                    <div class="temp-txt">
                        <span>${E}</span>
                        <span>&deg</span>
                    </div>
                    <span class="weatherofpartday">${l(n[5].WeatherIcon)}</span>
                </div>
                <div class="cardsectioninfo">
                    <p class="infocardtitle">Le soleil se couche \xe0:</p>
                    <span class="infocardhours">${r}</span>
                </div>
            </div>
        </div>
    </div>
    `;let P=`img/icons/${i.WeatherIcon}.svg`;icon.setAttribute("src",P),card.classList.contains("d-none")&&(card.classList.remove("d-none"),resetBtn.style.display="block",displayForm.style.display="none"),console.log(t)},getSun=async(t,e)=>{let i=await fetch(`https://api.sunrise-sunset.org/json?lat=${t}&lng=${e}&date=today&formatted=0`),a=await i.json();console.log(a);let r=new Date(a.results.sunrise).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",hour12:!1}).replace(":","h"),n=new Date(a.results.sunset).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit",hour12:!1}).replace(":","h");return{sunrise:r,sunset:n}},updateCity=async t=>{let e=await getCity(t),i=await getWeather(e.Key),{sunrise:a,sunset:r}=await getSun(e.GeoPosition.Latitude,e.GeoPosition.Longitude),n=await getHourlyForecast(e.Key);return{cityDets:e,weather:i,sunrise:a,sunset:r,forecast:n}};cityForm.addEventListener("submit",t=>{t.preventDefault();let e=cityForm.city.value.trim();cityForm.reset(),updateCity(e).then(t=>updateUI(t)).catch(t=>console.log(t))}),resetBtn.addEventListener("click",()=>{window.location.reload()});