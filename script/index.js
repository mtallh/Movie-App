
toggle.addEventListener("click", function () {

    if (sidnav.classList.contains("d-none")) {
        sidnav.classList.replace("d-none", "d-block");
        toggle.classList.replace("fa-bars", "fa-xmark");
    } else {

        sidnav.classList.replace("d-block", "d-none");
        toggle.classList.replace("fa-xmark", "fa-bars");
    }
}
);
let row = document.getElementById("row");

async function getMovie() {
    let api = await fetch("https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44");
    let data = await api.json();
    displayData(data); // Pass fetched data to the displayData function
}

getMovie();
function displayData(data) {
    let cartona = "";
    for (let i = 0; i < data.results.length; i++) {
        let imagePath = data.results[i].backdrop_path ? `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}` : "https://via.placeholder.com/500x281?text=Image+Not+Available";
        // Round vote_average to one decimal place
        let voteAverage = Math.round(data.results[i].vote_average * 10) / 10;
        // Convert vote_average to integer
        let integerVote = Math.floor(voteAverage);
        cartona += `<div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn">
                            <div class="container position-relative overflow-hidden border-3">
                                <img id="image${i}" src="${imagePath}" alt="" style="height: 400px; width:320px;">
                                <div class="overlay position-absolute">
                                    <h2>${data.results[i].original_name}</h2>
                                    <h2>${data.results[i].original_title}</h2>
                                    <p>${data.results[i].overview}</p>
                                    <p>${data.results[i].release_date}</p>
                                    ${generateStars(integerVote)}
                                    <h3 class="rate">${integerVote}</h3>
                                </div>
                            </div>
                        </div>`;
    }
    row.innerHTML = cartona;

    // Add event listeners to show/hide overlay on hover
    let containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            let overlay = container.querySelector('.overlay');
            overlay.classList.add('show', 'animate__animated', 'animate__fadeIn'); // Add fadeIn animation
            overlay.querySelectorAll('h2, p').forEach(el => {
                el.classList.add('animate__animated', 'animate__fadeInDown'); // Add fadeInDown animation to h2 and p elements
            });
            overlay.querySelector('.rate').classList.add('animate__animated', 'animate__slideOutLeft'); // Add slideOutLeft animation to rating
        });
        container.addEventListener('mouseleave', () => {
            let overlay = container.querySelector('.overlay');
            overlay.classList.remove('show', 'animate__animated', 'animate__fadeIn'); // Remove fadeIn animation
            overlay.querySelectorAll('h2, p').forEach(el => {
                el.classList.remove('animate__animated', 'animate__fadeInDown'); // Remove fadeInDown animation
            });
            overlay.querySelector('.rate').classList.remove('animate__animated', 'animate__slideOutLeft'); // Remove slideOutLeft animation
        });
    });
}



// Add event listeners to show/hide overlay on hover
containers.forEach(container => {
    container.addEventListener('mouseenter', () => {
        container.querySelector('.overlay').classList.add('show');
    });
    container.addEventListener('mouseleave', () => {
        container.querySelector('.overlay').classList.remove('show');
    });
});

function generateStars(rating) {
    const maxRating = 4;
    const roundedRating = Math.round(rating / 2); // Convert rating out of 10 to out of 5
    let stars = '<div class="stars-container">';
    for (let i = 0; i < maxRating; i++) {
        if (i < roundedRating) {
            stars += `<i class="fa-solid fa-star text-warning fs-6 "></i>`;
        } else {
            stars += `<i class="far fa-star text-warning fs-6"></i>`;
        }
    }
    stars += '</div>'; // Close the stars container
    return stars;
}








/*async function searchMovie() {
    const searchTerm = document.getElementById("search").value; // Assuming you're searching based on user input
    const api = await fetch('https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=API_KEY');
    const data = await api.json();
    console.log(data);

    function displayData() {
        let cartona = "";
        for (let i = 0; i < data.results.length; i++) {
            let imagePath = data.results[i].backdrop_path ? `hhttps://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}` : "https://via.placeholder.com/500x281?text=Image+Not+Available";
            cartona += `<div class="row col-lg-4 col-md-6 col-sm-12">
                                <img src="${imagePath}" alt="">
                                <h2 class="name">${data.results[i].original_title}</h2>
                            </div>`;
        }
        document.getElementById("row").innerHTML = cartona;
    }
    displayData();
}
searchMovie();*/




function validations() {
    submitBtn = document.getElementById("submitBtn")


    document.getElementById("name").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("email").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phone").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("age").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("password").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repassword").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}
let nameTouched = false;
let emailTouched = false;
let phoneTouched = false;
let ageTouched = false;
let passwordTouched = false;
let repasswordTouched = false;




function inputsValidation() {
    if (nameTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.\d)(?=.[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("repassword").value == document.getElementById("password").value
}
function repasswordValidation() {
    // Get the values of the "Password" and "ReEnter Password" fields
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;

    // Check if the passwords match
    if (password !== repassword) {
        return "Passwords do not match.";
    }

    // If passwords match, return an empty string
    return "";
}

// Function to handle form submission
document.getElementById("contact").addEventListener("submit", function (event) {
    // Prevent default form submission
    event.preventDefault();

    // Validate the "ReEnter Password" field
    let errorMessage = repasswordValidation();

    // Display error message if any
    let errorMessageElement = document.getElementById("error-message");
    if (errorMessage) {
        errorMessageElement.textContent = errorMessage;
        errorMessageElement.style.display = "block";
    } else {
        // Clear error message if passwords match
        errorMessageElement.textContent = "";
        errorMessageElement.style.display = "none";
        // Submit form if everything is valid
        this.submit();
    }
});
let Nowplaying = document.getElementById("Nowplaying");

Nowplaying.addEventListener("click", function() {
    getNowplaying();
});
async function getNowplaying() {
    let api = await fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US');
    let data = await api.json();
    displayData(data);
}

getNowplaying(); // Call the function to fetch and display data

function displayData(data) {
    let cartona = "";
    for (let i = 0; i < data.results.length; i++) {
        let imagePath = data.results[i].backdrop_path ? `https://image.tmdb.org/t/p/w500${data.results[i].backdrop_path}` : "https://via.placeholder.com/500x281?text=Image+Not+Available";
        // Round vote_average to one decimal place
        let voteAverage = Math.round(data.results[i].vote_average * 10) / 10;
        // Convert vote_average to integer
        let integerVote = Math.floor(voteAverage);
        cartona += `<div class="col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeIn">
                            <div class="container position-relative overflow-hidden border-3">
                                <img id="image${i}" src="${imagePath}" alt="" style="height: 400px; width:320px;">
                                <div class="overlay position-absolute  ">
                                        <h2>${data.results[i].original_name}</h2>
                                        <h2>${data.results[i].original_title}</h2>
                                        <p>${data.results[i].overview}</p>
                                        <p>${data.results[i].release_date}</p>
                                        ${generateStars(integerVote)}
                                        <h3 class="rate animate__animated vote animate__slideOutLeft">${integerVote}</h3>
                                    
                                </div>
                            </div>
                        </div>`;
    }
    row.innerHTML = cartona;
}

let contact = document.getElementById("contact");

contact.addEventListener("click", function() {
    validations()
});





