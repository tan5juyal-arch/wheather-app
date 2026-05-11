// http://api.weatherapi.com/v1/current.json?key=ff459adffdbf4457914143236262401&q=Mumbai&aqi=no
const temperaturefield = document.querySelector(".temp");
const locationfield = document.querySelector(".time_location p");
const dateandTimefield = document.querySelector(".time_location p:nth-child(2)");
const conditionfield = document.querySelector(".condition p");
const searchfield = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener("submit",searchForLocation)

let target="Lucknow"
const fetchResults = async (targetLocation) =>{
    let url = `https://api.weatherapi.com/v1/current.json?key=ff459adffdbf4457914143236262401&q=${targetLocation}&aqi=no`
    const res = await fetch (url)
    const data= await res.json()
    console.log(data) 

    let locationName = data.location.name ;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    updateDetails(temp,locationName,time,condition);

}

function updateDetails(temp, locationName, time, condition) {
  const dateObj = new Date(time.replace(" ", "T"));

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const currentDay = days[dateObj.getDay()];

  const timePart = time.split(" ")[1];

  temperaturefield.innerText = temp + "°C";
  locationfield.innerText = locationName;
  dateandTimefield.innerText = `${currentDay}, ${timePart}`;
  conditionfield.innerText = condition;
}




function searchForLocation(e){
    e.preventDefault()
    target=searchfield.value
    fetchResults(searchfield.value)
}
function getDayName(number){


  switch(number){

    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "";
  }
}

fetchResults(target);