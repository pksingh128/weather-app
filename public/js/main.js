const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const dateElement = document.querySelector('.date');
const dayelement = document.querySelector('.day');
const statusMsg = document.querySelector('#message-3');

const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

dayelement.textContent = days[new Date().getDay() ];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);
const getInfo = async(event) =>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal===""){
        city_name.innerText = `Please provide a location..`;
        datahide.classList.add('data_hide');

    }else{
        try{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&APPID=930fdf0bedc9879d0dddf0b589feb8de`
        const response = await fetch(url);
        const data = await response.json();
        const arrData = [data];
        city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
        temp.innerText = `${arrData[0].main.temp} °C`;
        //temp_status.innerText = arrData[0].weather[0].main;
        //statusMsg.textContent = `${arrData[0].weather[0].description}, ${arrData[0].main.temp}°C out there, feeling like ${arrData[0].main.feels_like}°C, humidity of ${arrData[0].main.humidity}% `;
        const tempMood =  arrData[0].weather[0].main;
        //condition to check cloudy or sunny
        if(tempMood == "Clear") {
            temp_status.innerHTML =
            "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        } else if(tempMood == "Clouds") {
            temp_status.innerHTML =
            "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
        } else if(tempMood == "Rain") {
            temp_status.innerHTML =
            "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
        } else {
            temp_status.innerHTML =
            "<i class='fas fa-sun' style='color: #eccc68;'></i>";
        }
        statusMsg.textContent = `${arrData[0].weather[0].description}, ${arrData[0].main.temp}°C out there, feeling like ${arrData[0].main.feels_like}°C, humidity of ${arrData[0].main.humidity}% `;
        datahide.classList.remove('data_hide');

        }catch(error){
            //console.log(error);
            city_name.innerText = `Unable to find location. Try another search.`;
            datahide.classList.add('data_hide');
           
        }
    }
}
submitBtn.addEventListener('click', getInfo)