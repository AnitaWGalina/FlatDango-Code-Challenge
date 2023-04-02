document.addEventListener("DOMContentLoaded", function() {
    menu();
    fetchMovieDetails();
    });
  
  function fetchMovieDetails() {
    fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(movie => displayMovieDetails(movie));
  }
  
  let  movieDetailsContainer = document.querySelector(".c2");
  
  function displayMovieDetails(movie) {
    let availableTickets = movie.capacity - movie.tickets_sold;
    let  movieDetailsContainer = document.querySelector(".c2");
  
    const poster = document.createElement("img");
    poster.src = movie.poster;
  
    const title = document.createElement("p");
    title.textContent = `Title: ${movie.title}`;
  
    const runtime = document.createElement("p");
    runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  
    const showtime = document.createElement("p");
    showtime.textContent = `Showtime: ${movie.showtime}`;

    const availableTicketsElement = document.createElement("p");
    availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
  
    const button = document.createElement("button");
    button.textContent = "Buy Tickets";
    button.addEventListener("click" , () =>  {
       if(availableTickets>0){
        availableTickets -- 
       } 
       if(availableTickets === 0){
        button.textContent = "Sold Out"
        button.disabled = true;
       }

       else{
        button.textContent="Buy Tickets"
       }
      
       availableTicketsElement.textContent = `Available Tickets: ${availableTickets}`;
    });
  
   movieDetailsContainer.innerHTML = " ";
    movieDetailsContainer.append(title,poster,runtime,showtime,availableTicketsElement,button);
    

  }


  function menu() {
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(allMovies => newMenu(allMovies));
    
  }

   function newMenu(allMovies) {
    
    const Container1 = document.querySelector(".container");
    allMovies.forEach((allMovies) => {
        const newMenuContainer = document.createElement("div")
        newMenuContainer.textContent = `${allMovies.id}.${allMovies.title}`
       newMenuContainer.addEventListener("click" ,  displayMovieDetails(allMovies)
       

       );


        Container1.append(newMenuContainer);
    });
  
}


