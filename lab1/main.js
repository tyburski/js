// notatnik z zajęć
const liczba1 = document.querySelector('#liczba1')
const liczba2 = document.querySelector('#liczba2')
const liczba3 = document.querySelector('#liczba3')
const liczba4 = document.querySelector('#liczba4')

const suma = document.querySelector('#suma')
const srednia = document.querySelector('#srednia')
const min = document.querySelector('#min')
const max = document.querySelector('#max')

liczba1.addEventListener("change",() => {
    update()
})
liczba2.addEventListener("change",() => {
    update()
})
liczba3.addEventListener("change",() => {
    update()
})
liczba4.addEventListener("change",() => {
    update()
})

function update(){
    let sum = parseInt(liczba1.value)
                +parseInt(liczba2.value)
                +parseInt(liczba3.value)
                +parseInt(liczba4.value)
    suma.innerHTML = sum.valueOf()
    srednia.innerHTML = parseInt(sum.valueOf())/4    
    min.innerHTML = Math.min(liczba1.value, liczba2.value, liczba3.value, liczba4.value)
    max.innerHTML = Math.max(liczba1.value, liczba2.value, liczba3.value, liczba4.value) 
}

