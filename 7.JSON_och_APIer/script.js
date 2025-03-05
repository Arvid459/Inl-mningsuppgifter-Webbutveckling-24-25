let temp = document.getElementById('tempAPI');
let imgDiv = document.querySelector('.images');

const lat = 57.47;
const lon = 12.38;

async function getTempAPI() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=57.47&longitude=12.38&hourly=temperature_2m&timezone=Europe%2FBerlin";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      console.log(new Date().getHours());
      const text = json.hourly.temperature_2m[new Date().getHours()];
      temp.textContent = `The temperature in Töllsjö is: ${text}°C`;
    } catch (error) {
      console.error(error.message);
    }
    
  }

  async function getImgAPI(){
    let input = document.getElementById('input').value;

    // Check if the input is empty before proceeding
    if (!input.trim()) {  // .trim() removes leading/trailing whitespaces
      alert("Please enter a search term.");  // Optionally, display an alert or message to the user
      return;  // Don't proceed if input is empty
  }


    const url = `https://api.unsplash.com/search/photos?query=${input}&client_id=7wPYd7N-lRymYxFd3NgxnCflUWQJklHIQPcN0IABim0`;
    imgDiv.innerHTML = "";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      for (let i = 0; i<10; i++){
      let url = json.results[i].urls.full;


      const newImg = document.createElement("img");
      imgDiv.appendChild(newImg);
      newImg.src = url;

      }  

    } catch (error) {
      console.error(error.message);
    }
    

  }