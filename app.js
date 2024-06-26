// local reviews data
const reviews = [
  {
    id: 1,
    name: "Ethan Shoe",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjXVKA2-1MD9ywFq8PDmFedOMHGl1iXFZ4JZGzEny9BZzpr-JTjQJA=s128-c0x00000000-cc-rp-mo-ba7",
    text: "One of the best food trucks I've ever been to. I got the orange chicken and fries rice. The chicken was pretty unique but in a good way, I loved it. I also tried the crab rangoons and they were also great, and fairly priced.",
  },
  {
    id: 2,
    name: "Debisree Ray",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVly3UaAqbhde1dh3oiI3HmJuPjNU47WBorjJp1HF6jBbLpWi5u=s128-c0x00000000-cc-rp-mo-ba7",
    text: "Amazing food. The fried pork wantons were absolutely terrific. I ordered chicken pad Thai noodles whereas my husband ordered grilled chicken with broccoli. The quality and the taste is good, however, the portion wise it’s on the lessar side. My noodles were fine for me. But the grilled chicken portion was really less, which was compensated with white rice! So overall it was a bit dry to eat. You can sit and eat at the benches, the ambience is cool.",
  },
  {
    id: 3,
    name: "Mina Son",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjVFcZsgAyzzKT4rOpqIhY2G7xjIoNstmKQ1BJ44wsIG7KSfV_lC=s128-c0x00000000-cc-rp-mo-ba3",
    text: "My husband and I recently got married and visited Fayetteville, AR as a honeymoon destination! I ordered chow mein with orange chicken on the side. We also ordered egg rolls and they were so delicious! 10/10!",
  },
  {
    id: 4,
    name: "Andrew Hensley",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjUBxU6nsc3e8I7iwgkkQLgOfjZD--hVu7kl0O2NCp8F8gays-hg=s128-c0x00000000-cc-rp-mo-ba4",
    text: "They need a WHOLE restaurant because this food truck is sensational. Do not be afraid to come here. This food is unbelievable. ",
  },
  {
    id: 5,
    name: "beingbailey x",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjW28ah2j4NQDAGc7OUY04kaVIJCQsHcVz49bTpr_1fcm3Yaf19z=s128-c0x00000000-cc-rp-mo",
    text: "My favorite food truck in all of NWA. Their eggrolls and crab rangoons are to die for. They are kind people, great service, great food, cannot say enough good about this little food truck! ",
  },
  {
    id: 6,
    name: "Alana Collins",
    job: "Local Guide",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWbAYVvaMuAtdFqoPrxy7koSpOSnqlaD3NpfwySnFQ5l4pez0xD=w200-h200-p-rp-mo-ba4-br100",
    text: "This food is AMAZING! The only downside is the wait. When I went here the first time I waited over 20 minutes for rice. I was not going to come back but there food is THAT good. I came a second time and added egg rolls to my order and fell in love again. I am also happy to report that it took only 10 minutes. This is my new favorite spot. I’m so happy I found this little place. Just make sure you call ahead or be prepared to wait awhile.",
  },
];
// select items
const img = document.getElementById("person-img");
const author = document.getElementById("author");
const job = document.getElementById("job");
const info = document.getElementById("info");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");

// set starting item
let currentItem = 0;

// load initial item
window.addEventListener("DOMContentLoaded", function () {
  const item = reviews[currentItem];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
});

// show person based on item
function showPerson(person) {
  const item = reviews[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
}
// show next person
nextBtn.addEventListener("click", function () {
  currentItem++;
  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }
  showPerson(currentItem);
});
// show prev person
prevBtn.addEventListener("click", function () {
  currentItem--;
  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }
  showPerson(currentItem);
});
// show random person
randomBtn.addEventListener("click", function () {
  console.log("hello");

  currentItem = Math.floor(Math.random() * reviews.length);
  showPerson(currentItem);
});

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

const fullScreenBtn = document.getElementById("fullScreenBtn");
const menuFrame = document.getElementById("menu-frame");

fullScreenBtn.addEventListener("click", () => {
  console.log("Full Screen button clicked!");
  if (menuFrame.requestFullscreen) {
    menuFrame.requestFullscreen();
  } else if (menuFrame.mozRequestFullScreen) {
    /* Firefox */
    menuFrame.mozRequestFullScreen();
  } else if (menuFrame.webkitRequestFullscreen) {
    /* Chrome, Safari & Opera */
    menuFrame.webkitRequestFullscreen();
  } else if (menuFrame.msRequestFullscreen) {
    /* IE/Edge */
    menuFrame.msRequestFullscreen();
  }
});
