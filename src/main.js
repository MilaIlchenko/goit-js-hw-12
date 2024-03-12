import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {createMarkup} from "./js/render-functions.js"
import {searchImages} from "./js/pixabay-api.js"

const lightbox = new SimpleLightbox('div .gallery-link ', {
  captionsData: 'alt',
  captionDelay: 250,
  alertError: false,
});

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');

searchForm.addEventListener('submit', handleSearch);

let currentPage;
let currentQuery;
let totalHits;
loadMoreBtn.style.display = 'none'

async function handleSearch(event) {
  currentPage = 1;
  event.preventDefault();
  loader.style.display = 'block';

  gallery.innerHTML = '';

  const form = event.currentTarget;
  currentQuery = form.elements.query.value.trim();

  if (currentQuery === '') {
    iziToast.show({
      title: 'Error',
      color: 'yellow',
      message: 'Please search for something',
    });
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'none';
    return;
  }

  searchImages(currentQuery, currentPage)
  .then(arr => {
    totalHits = arr.totalHits;
    gallery.innerHTML = createMarkup(arr);
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'none';
    lightbox.refresh();
    form.reset()
  })
  .catch(error => {
    console.error('Error:', error);
  })
}

loadMoreBtn.addEventListener('click', async () => {
  loader.style.display = 'block';

  try {
    const data = await searchImages(currentQuery, 15, currentPage);
    currentPage += 1;

    if (currentPage * 15 < totalHits) {
      gallery.innerHTML += createMarkup(data);
      lightbox.refresh();
      loader.style.display = 'none';
      loadMoreBtn.style.display = 'none';
      smoothScroll();
    } else {
      iziToast.info({
        title: 'Info',
        timeout: 2000,
        color: 'blue',
        position: 'bottomRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  } finally {
    loadMoreBtn.style.display = 'none';
  }
});

window.onscroll = function () {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if (currentPage * 15 < totalHits) {
      loadMoreBtn.style.display = 'block';
      loader.style.display = "block";
    } else {
      loadMoreBtn.style.display = 'none';
      loader.style.display = "none";
    }
  } else {
    loadMoreBtn.style.display = 'none';
    loader.style.display = "none";
  }
};

function smoothScroll() {
  const galleryHeight = gallery.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: 2 * galleryHeight,
    behavior: 'smooth',
  });
}