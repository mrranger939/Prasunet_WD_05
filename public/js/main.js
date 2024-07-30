const cityName = document.getElementById("cityName");
const submitbtn = document.getElementById('submitbutton');
const cityname = document.getElementById("cityname");
const temp_status = document.getElementById("temp_status");
const temp = document.getElementById("temp");
var element = document.querySelector('.data_hide');
// Get references to the elements
const dayElement = document.getElementById('day');
const dateElement = document.getElementById('today_date');

// Function to update the day and date
function updateDayAndDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get current date and time
    const now = new Date();
    const day = days[now.getDay()]; // Get the day of the week
    const date = now.getDate(); // Get the day of the month
    const month = months[now.getMonth()]; // Get the month

    // Update the content of the elements
    dayElement.textContent = day;
    dateElement.textContent = `${date} ${month}`;
}

// Call the function initially to set the initial values
updateDayAndDate();
const getInfo = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;
    if (cityval === "") {
        cityname.innerText = "please fill";
        element.classList.add('data_hide'); // Add data_hide class

    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=&units=metric`
            const response = await fetch(url);
            const data = await response.json()
            console.log(data)
            element.classList.remove('data_hide');
            cityname.innerHTML = `${data.name}, ${data.sys.country}`
            temp.innerText = data.main.temp + "℃";
            temp_status.innerText = data.weather[0].main;

            // Set weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            // Create an image element and set its source
            const iconImg = document.createElement('img');
            iconImg.style.width = "150%"; // Increase by 1.5 times (50 * 1.5 = 75)
            iconImg.style.height = "auto";
            iconImg.src = iconUrl;
            // Replace existing content of temp_status with the weather icon
            temp_status.innerHTML = '';
            temp_status.appendChild(iconImg);
        } catch {
            cityname.innerText = "please enter the city name properly";
            element.classList.add('data_hide');
        }
    }
}





submitbtn.addEventListener("click", getInfo);