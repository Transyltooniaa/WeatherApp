
console.log("This is javascript")

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// }   )


const messageOne = document.querySelector('.message1')
const messageTwo = document.querySelector('.message2')


messageOne.textContent = 'From Javascript'



document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = document.querySelector('input').value
    console.log(location)
    fetch(`/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = `${data.forecast} throughout the day. It is currently ${data.temperature} and it feels like ${data.feelsLike}`
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})