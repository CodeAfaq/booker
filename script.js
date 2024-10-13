const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUi();

let ticket = +movieSelect.value;

// Save Selected Movie index & price to local storage

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieSelectedIndex', movieIndex);
    localStorage.setItem('movieSelectedPrice', moviePrice);
}

// Update Total and Count

function updateSelectedCount(){
    const seatsSelected = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...seatsSelected].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('seatSelectedIndex', JSON.stringify(seatsIndex));
    const seatsSelectedCount = seatsSelected.length;
    count.innerText = seatsSelectedCount
    total.innerText = seatsSelectedCount * ticket
}

// Getting data from local storage
function populateUi(){
    const selectedSeats = JSON.parse(localStorage.getItem('seatSelectedIndex'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('movieSelectedIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Selecting Movie
function selectedMovie(){
    movieSelect.addEventListener('change', (e) => {
        ticket = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value)
        updateSelectedCount()
    })
}

// Selecting Seats
function selectedSeats(){
    container.addEventListener('click', (e)=>{
        if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
    })
}

selectedMovie()
selectedSeats()
updateSelectedCount()