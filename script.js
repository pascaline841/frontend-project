const api_url = "http://localhost:8000/api/v1/titles/"

// move the carousel to the right
for (arrow of document.getElementsByClassName("right--arrow")) {
    arrow.onclick = function () {
        let images = this.parentElement.getElementsByClassName("carousel__img");
        images[0].parentElement.style.display = "none";
        images[0].parentElement.parentElement.append(images[0].parentElement);
        images[3].parentElement.style.display = "inline";
    }
}

// move the carousel to the left
for (arrow of document.getElementsByClassName("left--arrow")) {
    arrow.onclick = function () {
        let images = this.parentElement.getElementsByClassName("carousel__img");
        images[3].parentElement.style.display = "none";
        images[images.length - 1].parentElement.parentElement.prepend(images[images.length - 1].parentElement);
        images[0].parentElement.style.display = "inline";
    }
}

// Get the modal
function getModal() {
    const modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("modal-content__close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    return modal;
}

// Get the datas movie from the API
function fillModal(id, pre) {
    fetch(api_url + id)
        .then(response => response.json())
        .then(json => {
            //fill the title, image(cover) and the description in the best movie section AND modals
            document.getElementById(pre + "__title").innerHTML = json.title;
            document.getElementById(pre + "__img").setAttribute("src", json.image_url);
            document.getElementById(pre + "__description").innerHTML = json.long_description;
            // fill the modal from the best movie section
            if (pre == "best") {
                document.getElementById("info").id = json.id;
            }
            //fill the modal with other datas
            if (pre == "modal") {
                var attributes = ["genres", "date_published", "rated", "imdb_score", "directors", "actors", "duration", "countries", "reviews_from_critics", "worldwide_gross_income"];
                for (var attribute of attributes) {
                    document.getElementById(pre + "__" + attribute).innerHTML = json[attribute];
                }
            }
        })
}
//When the user clicks on Info, open the modal 
function displayModalBest() {
    const topButton = document.getElementById("info");
    topButton.onclick = function () {
        let modal = getModal();
        modal.style.display = "block";
        fillModal(this.id, "modal");
    };
}
// When the user clicks on a cover, open the modal
function displayModalCarousel() {
    for (let i = 0; i < document.getElementsByClassName("carousel__img").length; i++) {
        document.getElementsByClassName("carousel__img")[i].onclick = function () {
            let modal = getModal();
            modal.style.display = "block";
            fillModal(this.id, "modal");
        };
    }
}
// Create the carousel with the cover of the movies from the category
function getCover(top, url, category, slice_start, slice_end, movies = []) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            for (movie of json.results) {
                movies.push([movie.id, movie.image_url])
            }
            if (top - 5 > 0) {
                getCover(top - 5, json.next, category, slice_start, slice_end, movies);
                return []
            }
            return movies;
        })
        .then(movies => {
            if (movies.length > 0) {
                for (movie of movies.slice(slice_start, slice_end)) {
                    const img = document.createElement("img");
                    img.id = movie[0];
                    img.src = movie[1];
                    img.className = "carousel__img";
                    const link = document.createElement("a");
                    link.href = "#";
                    link.appendChild(img);
                    let carousel = document.getElementById(category + "__carousel");
                    carousel.appendChild(link);

                    if (carousel.childNodes.length >= 6) {
                        link.style.display = "none"
                    }
                }
                if (category == "best-rating") {
                    fillModal(movies[0][0], "best");
                }
                displayModalCarousel();
            }
        })
}

// Run the program
function main() {
    const cat1 = document.getElementById("cat1__title").textContent;
    const cat2 = document.getElementById("cat2__title").textContent;
    const cat3 = document.getElementById("cat3__title").textContent;
    getCover(7, api_url + "?sort_by=-imdb_score", "best-rating", 1, 8);
    getCover(7, api_url + "?sort_by=-imdb_score&genre_contains=" + cat1, "first_category", 0, 7);
    getCover(7, api_url + "?sort_by=-imdb_score&genre_contains=" + cat2, "second-category", 0, 7);
    getCover(7, api_url + "?sort_by=-imdb_score&genre_contains=" + cat3, "third-category", 0, 7);
}
displayModalBest();
main();