import "./styles.css";

const loadingDiv = document.getElementById("loading");

showSpinner();
getImages();

function getImages() {
  //add 8 images to the UI
  for (let i = 0; i < 8; i++) {
    const api_url =
      "https://api.giphy.com/v1/gifs/random?api_key=pVtUYH6SYIVVniIrTeK1DpF0Uskw41bW&tag=&rating=g";
    async function getapi(url) {
      // Storing response
      const response = await fetch(url);

      // Storing data in form of JSON
      let data = await response.json();

      if (response) {
        showImages(data);
      }
    }
    getapi(api_url);
  }
}
function showImages(data) {
  //populate the UI with images
  let url = data.data.images.downsized.url;
  //var url = data.data.images.original.url;
  let createImg = document.createElement("img");
  let getDiv = document.getElementById("container");
  createImg.className = "imgList";
  createImg.src = url;
  getDiv.appendChild(createImg);
  addModal(createImg);
  setTimeout(hideSpinner, 3000);
}
function addModal(img) {
  //creating a modal when clicking on a img
  // create references to the modal...
  let modal = document.getElementById("myModal");
  // the image in the modal
  let modalImg = document.getElementById("modalImg");

  img.onclick = function (evt) {
    let currImg = img;
    let prevImg = img.previousSibling;
    let nextImg = img.nextSibling;
    let img1 = document.getElementById("img1");
    let img2 = document.getElementById("img2");
    modal.style.display = "block";
    modalImg.src = currImg.src;
    img1.src = prevImg.src;
    img2.src = nextImg.src;

    img1.onclick = function () {
      currImg = prevImg;
      prevImg = prevImg.previousSibling;
      nextImg = nextImg.previousSibling;
      modalImg.src = currImg.src;
      img1.src = prevImg.src;
      img2.src = nextImg.src;
    };
    img2.onclick = function () {
      currImg = nextImg;
      prevImg = prevImg.nextSibling;
      nextImg = nextImg.nextSibling;
      modalImg.src = currImg.src;
      img1.src = prevImg.src;
      img2.src = nextImg.src;
    };
  };
  let close = document.getElementsByClassName("close")[0];

  close.onclick = function () {
    modal.style.display = "none";
  };
}

function showSpinner() {
  //show the loading spinner
  loadingDiv.style.visibility = "visible";
}

function hideSpinner() {
  //hide the loading spinner
  loadingDiv.style.visibility = "hidden";
}

//reload the browser when user clicks on the refresh button
document.getElementById("refresh").addEventListener("click", refreshButton);

function refreshButton() {
  //reload the page when clicking on refreshbutton
  window.location.reload();
}
//reload the browser when user clicks on the refresh button in modal
document
  .getElementById("refreshModal")
  .addEventListener("click", refreshButton);

window.addEventListener("scroll", function () {
  //infinite scroll
  let bottom = document.documentElement.getBoundingClientRect().bottom;
  let clientHeight = document.documentElement.clientHeight;

  if (bottom < clientHeight + 150) {
    getImages();
  }
});
