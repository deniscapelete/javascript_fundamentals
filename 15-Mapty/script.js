'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;



class App {
    #map;
    #mapEvent;
    constructor(){
        this._getPosition();

        form.addEventListener('submit', this._newWorkout.bind(this));    
        inputType.addEventListener('change', this._toggleElevationField);
    }

    _getPosition(){
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
         function(){
                    alert('Não conseguimos a sua localização')
                }
            );
    }

    _loadMap(position){               
            const {latitude} = position.coords
            const {longitude} = position.coords
           console.log(`https://www.google.com.br/maps/@${latitude},${longitude}z?entry=ttu&g_ep=EgoyMDI1MDEwOC4wIKXMDSoASAFQAw%3D%3D`);
           
           const coords = [latitude, longitude];
    
console.log(this);

           this.#map = L.map('map').setView(coords, 14);
        //    console.log(map);    
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.#map);    
                // Handling clicks on map
                this.#map.on('click', this. _showForm.bind(this));  
    }

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }


    _newWorkout(e){
        e.preventDefault();
    
        // Clear input fields
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = 
        '';

        // Display marker       
                const {lat, lng} = this.#mapEvent.latlng;
                L.marker([lat, lng]).addTo(this.#map)
                .bindPopup(L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose: false,
                    closeOnClick: false,
                    className: 'running-popup'
                }))
                .setPopupContent('Workout')
                .openPopup();
    }

}

const app = new App(); 