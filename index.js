const colorPicker = document.getElementById('color-picker')
const modeSelection = document.getElementById('mode-selection')
const generatorForm = document.getElementById('generator-form')
const colorShowcase = document.getElementById('color-showcase')
let colorsArray = []

let hex = colorPicker.value.slice(1)
let mode = modeSelection.value


colorPicker.addEventListener('change', function(){
    hex = colorPicker.value.slice(1)
})

modeSelection.addEventListener('change', function(){
    mode = modeSelection.value
})

generatorForm.addEventListener('submit', function(e) {
    e.preventDefault()
    getColor()
})

function renderColors() {

    const html = colorsArray.map(color => {
        return `
        <div class="color-container" data-hex="${color.hex.value}">
            <div class="color-canvas" style="background-color: ${color.hex.value}" ></div>
            <div class="color-hex"><p>${color.hex.value}</p></div>
            <span class="tooltip">${color.hex.value} copied to clipboard!</span>
        </div>
        `
    }).join('')

    colorShowcase.innerHTML = html

    document.querySelectorAll('.color-container').forEach(el => {
        el.addEventListener('click', function(){
            const hexValue = el.getAttribute('data-hex')
            navigator.clipboard.writeText(hexValue)
            // show tooltip momentarily
            const tooltip = el.querySelector('.tooltip')
            tooltip.classList.add('show')
            setTimeout(() => tooltip.classList.remove('show'), 1200)
        })
    })
}

function getColor() {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`, { method: "GET" })
    .then(res => res.json())
    .then(data => {
        colorsArray = data.colors
        renderColors()
    })
}

getColor()
