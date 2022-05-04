fetch('./annunci.json')
.then(Response => Response.json())
.then(data => {

    function setCategoryfilter(){
        let categories = Array.from (new Set(data.map( el => el.category)));
        console.log(categories);
        let radioWrapper = document.querySelector('#radioWrapper');
        categories.forEach(category => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="flexRadioDefault" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>`

            radioWrapper.appendChild(div);
        })
    }

    setCategoryfilter()

    function setCategorycondizioni(){
        let categories = Array.from (new Set(data.map( el => el.condizioniEstetiche)));
        console.log(categories);
        let radioWrapper = document.querySelector('#condizioniEstetiche');
        categories.forEach(condizioniEstetiche => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="flexRadioDefault" id="${condizioniEstetiche}">
            <label class="form-check-label" for="${condizioniEstetiche}">
            ${condizioniEstetiche}
            </label>`

            radioWrapper.appendChild(div);
        })
    }

    setCategorycondizioni()


    function showCards(Array){
        let cardsWrapper = document.querySelector('#cards-wrapper');
        cardsWrapper.innerHTML="";
        Array.forEach(annuncio => {
            let div = document.createElement('div');
            div.classList.add('col-12', 'col-md-4', 'my-4');
            div.innerHTML = `
            <div class="card">
            <img class="immagine-card img-fluid"src="/media/iphone-13-pro-max-silver-select.png" class="card-img-top" alt="Mac">
            <h4 class="card-title">${annuncio.name}</h4>
            <p class="card-title">${annuncio.category}</p>
            <p class="card-text">${annuncio.price} euro</p>
            <p class="card-text">${annuncio.condizioniEstetiche}</p>
            <button type="button" class="btn w-50 m-auto" data-bs-toggle="modal" data-bs-target="#prova">Acquista</button>
            </div>
            `

            cardsWrapper.appendChild(div)
        })

    }

    showCards(data)


    function filterByCategory(){
        let radioButtons = document.querySelectorAll('.form-check-input');
        radioButtons.forEach(button => (
            button.addEventListener('click' , () => {
            
                
                let filtered = data.filter(el => el.category == button.id)
                showCards(filtered)
                
            })
        ))
    }
    filterByCategory()

    function filterBycondizioniEstetiche (){
        let radioButtons = document.querySelectorAll('.form-check-input');
        radioButtons.forEach(button => (
            button.addEventListener('click' , () => {
            
                
                let filtered = data.filter(el => el.condizioniEstetiche == button.id)
                showCards(filtered)
                
            })
        ))
    }
    filterBycondizioniEstetiche ()

    function priceRange() {
        let maxPrice = data.map(el => Number(el.price)).sort((a,b)=> a - b).pop();
        console.log(maxPrice);
        let rangeInput = document.querySelector('#rangeInput');
        rangeInput.max = Math.ceil(maxPrice);
        rangeInput.value = rangeInput.max;
        let inputValue = document.querySelector('#inputValue');
        rangeInput.addEventListener('input' , () => {
            inputValue.innerHTML = `${rangeInput.value} euro`})

    }
    priceRange()
})



// setInterval()
let clientsNumber = document.querySelector('#clientsNumber');
let productsNumber = document.querySelector('#productsNumber');
let notificationNumbers = document.querySelector('#notificationNumbers');


function numbersInterval(finalValue, element, speed){

    let counter = 0;
    
    let interval = setInterval(() => {
    
        if(counter < finalValue){
            counter++
            element.innerHTML = counter
        } else{
            clearInterval(interval)
        }
        
    }, speed);

}


let intersection = document.querySelector('#intersection')
if (intersection){
    let observer = new IntersectionObserver(
        (entries) => { 
            entries.forEach(entry => {
                
                if(entry.isIntersecting){
                    
                    numbersInterval(100, clientsNumber, 40);
                    numbersInterval(150, productsNumber, 22);
                    numbersInterval(400, notificationNumbers, 10);
                }
    
    
            });
          }
    )
    
    observer.observe(intersection)
}

