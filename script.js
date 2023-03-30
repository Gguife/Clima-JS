document.querySelector('.search').addEventListener('submit', async (event) =>{
  event.preventDefault()

  let input = document.querySelector('#searchInput').value

  if(input !== ''){
    showWarning('Carregando...')
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=a6f5b37a9ee95948beb9ebad479b8a98&units=metric&lang=pt_br`

    let response = await fetch(url)
    let result = await response.json()

    if(result.cod === 200){
      showInfo({
        name:result.name,
        country:result.sys.country,
        temp:result.main.temp,
        tempIcon:result.weather[0].icon,
        windSpeed: result.wind.speed,
        windAngle:result.wind.deg
      })
    }else{
      clearInfo()
      showWarning('Não encontramos a localização desejada!')
    }
  }
})

function showInfo(result){
  showWarning('')

  document.querySelector('.info').style.display = 'block'

  document.querySelector('.info-city').innerHTML = `${result.name}, ${result.country}`;
  document.querySelector('.temp-content').innerHTML = `${result.temp} <sup>ºC</sup>`;
  document.querySelector('.wind-content').innerHTML = `${result.windSpeed} <span>km/h</span>`;

  document.querySelector('.info-temp img').setAttribute('src', `http://openweathermap.org/img/wn/${result.tempIcon}@2x.png`);
  document.querySelector('.pointer-wind').style.transform = `rotate(${result.windAngle - 90}deg)`;

}

function clearInfo(){
  showWarning('')
  document.querySelector('.info').style.display = 'none'
}

function showWarning(msg){
  document.querySelector('.alert').innerHTML = msg
}