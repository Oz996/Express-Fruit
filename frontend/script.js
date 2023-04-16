const wares = []

const fruit = document.getElementById('fruits')
const vegetable = document.getElementById('vegetables')

const getWares = async () => {

    try{

        const response = await fetch('http://localhost:6020/api/wares/')
        const data = await response.json()
        data.forEach((ware) => {
            wares.push(ware)
        })
        console.log(wares)
        listFruits()
        listVeggies()
        

    } catch (err){
        console.log(err)
    }


}

const listFruits = () => {

wares.forEach((ware) => {

    if(ware.category === 'fruit'){

        const fruitDiv = document.createElement('div')
        fruitDiv.className = 'fruit-div'
    
        const fruitTitle = document.createElement('h3')
        fruitTitle.textContent = ware.name
    
        const fruitPrice = document.createElement('p')
        fruitPrice.textContent = ware.price
    
        const fruitImg = document.createElement('img')
        fruitImg.setAttribute('src', fruit.image)

        fruitDiv.append(fruitTitle, fruitPrice, fruitImg)
        fruit.append(fruitDiv)
    }  
})
}

const listVeggies = () => {

    wares.forEach((ware) => {
    
        if(ware.category === 'vegetable'){
    
            const vegDiv = document.createElement('div')
            vegDiv.className = 'vegetable-div'
        
            const vegTitle = document.createElement('h3')
            vegTitle.textContent = ware.name
        
            const vegPrice = document.createElement('p')
            vegPrice.textContent = ware.price
        
            const vegImg = document.createElement('img')
            vegImg.setAttribute('src', vegetable.image)
    
            vegDiv.append(vegTitle, vegPrice, vegImg)
            vegetable.append(vegDiv)
        }  
    })
    }

getWares()
console.log(wares)