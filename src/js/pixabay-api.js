import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

const KEY = "34991157-d38b6fef3b34c3f08b128977b";
const URL = "https://pixabay.com/api/";

const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');
const searchForm = document.querySelector('.form');

export async function searchImages(QUERY, perPage, page) {
  
  const LINK = `${URL}?key=${KEY}&q=${QUERY}&image_type=photo&orientation=horizontal&savesearch=true&page=${page}&per_page=${perPage}`;


  loader.style.display = 'block';

  try {
    const response = await axios.get(LINK);

    if (response.data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        timeout: 2000,
        position: 'bottomRight',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      loadMoreBtn.style.display = 'none';
      loader.style.display = 'none';
      searchForm.reset()
    }
    return response.data;

  } catch (error) {
    console.error(`Error: ${error}`);
  } 
}