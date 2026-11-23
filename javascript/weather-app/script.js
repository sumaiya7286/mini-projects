let inputBox = document.querySelector("#input-box")
let locationName = document.querySelector("#location")
let temp = document.querySelector("#temp")
let humidity = document.querySelector("#humid")
let speed = document.querySelector("#windspeed")

async function getData(city){
    try {
         let locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
        );

        let locationData = await locationResponse.json();

        if (!locationData.results) {
            throw new Error("City not found");
        }
        let location = locationData.results[0]
        // console.log(location);

        let latitude = location.latitude;
        let longitude = location.longitude;
        
        let url =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;


        let response = await fetch(url)
        if(!response.ok){
            throw new Error(`Error status: ${response.status}`)
        }

        const data = await response.json()
        temp.textContent = data.current.temperature_2m

        humidity.textContent = data.current.relative_humidity_2m
         speed.textContent = data.current.wind_speed_10m
    //    console.log(data);

       
    } catch (err) {
    console.log(err);

    }
}

inputBox.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        let city = inputBox.value.trim();
    if(city==="") return;

    locationName.textContent = city;

  getData(city);
   
}

})

   