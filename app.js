// Define your Google Places API key and place ID

const placeId = "ChIJP8i8PSRvyYcREXXh7JgS67Y&";

// Elements from the DOM
const img = document.getElementById("person-img");
const authorElement = document.getElementById("author");
const jobElement = document.getElementById("job");
const infoElement = document.getElementById("info");

// Buttons for navigation and random review
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// Index of the currently displayed review
let currentItem = 0;

// Function to fetch reviews from Google Places API
// Function to fetch reviews from Google Places API
function fetchReviews() {
  fetch(`/api/reviews`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch reviews. Error ${response.status}: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log("API response:", data); // Log the API response for debugging
      if (
        data.result &&
        data.result.reviews &&
        data.result.reviews.length > 0
      ) {
        const businessName = data.result.name || "Business Name";
        document.title = `${businessName} Reviews`;
        reviews = data.result.reviews;
        showReview(currentItem);
      } else {
        console.error("No reviews found in response:", data);
        showErrorMessage("No reviews found in response.");
      }
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
      showErrorMessage(`Error fetching reviews: ${error.message}`);
    });
}

// Function to display a review
function showReview(index) {
  const review = reviews[index];
  img.src = review.profile_photo_url || "default.jpg";
  authorElement.textContent = review.author_name;
  jobElement.textContent = new Date(review.time * 1000).toLocaleDateString();
  infoElement.textContent = review.text;
}

// Function to display error message
function showErrorMessage() {
  img.src = ""; // Clear image
  authorElement.textContent = "Business Name"; // Display default business name
  jobElement.textContent = ""; // Clear job
  infoElement.textContent = "Reviews could not be fetched."; // Display error message
}

// Event listener for next button
nextBtn.addEventListener("click", function () {
  currentItem = (currentItem + 1) % reviews.length;
  showReview(currentItem);
});

// Event listener for previous button
prevBtn.addEventListener("click", function () {
  currentItem = (currentItem - 1 + reviews.length) % reviews.length;
  showReview(currentItem);
});

// Event listener for random button
randomBtn.addEventListener("click", function () {
  currentItem = Math.floor(Math.random() * reviews.length);
  showReview(currentItem);
});

// Initialize: Fetch reviews when DOM content is loaded
window.addEventListener("DOMContentLoaded", fetchReviews);

// Function to toggle full-screen mode for the PDF iframe
function toggleFullScreen() {
  const iframe = document.getElementById("pdfIframe");
  if (!document.fullscreenElement) {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// Function to handle tab switching
function switchTab(tabId) {
  // Remove 'active' class from all tab buttons
  btns.forEach(function (btn) {
    btn.classList.remove("active");
  });
  // Add 'active' class to the clicked tab button
  const activeBtn = document.querySelector(`.tab-btn[data-id="${tabId}"]`);
  activeBtn.classList.add("active");

  // Hide all content sections
  articles.forEach(function (article) {
    article.classList.remove("active");
  });
  // Show the corresponding content section
  const activeContent = document.getElementById(tabId);
  activeContent.classList.add("active");

  // Change the image in the about-img section based on the clicked tab
  const imgSrc = activeBtn.getAttribute("data-img");
  if (imgSrc) {
    aboutImg.innerHTML = `<img src="${imgSrc}" alt="${tabId}" />`;
  }
}

// Initialize tabs functionality
const about = document.querySelector("#about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");
const aboutImg = document.querySelector(".about-img");

// Add click event listener to the tabs container
about.addEventListener("click", function (e) {
  const tabId = e.target.dataset.id;
  if (tabId) {
    switchTab(tabId);
  }
});
