function searchMovie() {
    $('#movie-list').html('')
  
  $.ajax({
    url: 'http://www.omdbapi.com/',
    type: 'GET',
    dataType: 'json',
    data: {
      'apikey': 'c138db6b',
      's': $('#search-inpt').val()
    },
    success: (result) => {
      if( result.Response == "True" ) {
        
        let movie = result.Search;
        
        $.each(movie, (i, data) => {
          $('#movie-list').append(`
            <div class="col-md-4">
              <div class="card mb-3">
                <img src="${data.Poster}" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title">${data.Title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                  <a href="#" class="btn btn-primary see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.imdbID}">See Detail</a>
                </div>
              </div>
            </div>
          `);
        })
        
        $('#search-inpt').val('')
        
      } else {
        $('#movie-list').html(`
        <div class="col">
          <h2 class="text-danger text-center">${result.Error}!</h2>
        </div>
        `)
      }
    }
  })
}

$('#search-btn').on('click', () => {
  searchMovie()
})

$('#search-inpt').on('keyup', (e) => {
  if(e.which == 13) {
    searchMovie();
  }
})

$('#movie-list').on('click', '.see-detail',function() {
  
  $.ajax({
    url: 'http://omdbapi.com',
    type: 'GET',
    dataType: 'json',
    data: {
      'apikey': 'c138db6b',
      'i': $(this).data('id'),
    },
    success: (movieId) => {
      if( movieId.Response === "True" ) {
        
        $('.modal-body').html(`
          <div class="container-fluid">
            <div class="row">
            
              <div class="col-md-4">
                <img src="${movieId.Poster}" class="img-fluid">
              </div>
              
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item"><b>${movieId.Title}</b></li>
                  <li class="list-group-item">Released : ${movieId.Released}</li>
                  <li class="list-group-item">Genre : ${movieId.Genre}</li>
                  <li class="list-group-item">Director : ${movieId.Director}</li>
                  <li class="list-group-item">Actors : ${movieId.Actors}</li>
                </ul>
              </div>
              
            </div>
          </div>
        `)
        
      }
    }
  })
  
})