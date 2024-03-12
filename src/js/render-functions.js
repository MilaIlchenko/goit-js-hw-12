
export function createMarkup(arr) {

  return arr.hits
    .map(({largeImageURL, 
      webformatURL, 
      tags, 
      likes, 
      views, 
      comments, 
      downloads}) => 
      `<div class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
          <img 
          class="gallery-image" 
          src="${webformatURL}" 
          alt="${tags}" 
          />
      </a>
      <div class="gallery-info">
          <p class="gallery-info-par">
              <span class="gallery-info-span">Likes: <span class="tag-span">${likes}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Views: <span class="tag-span">${views}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Comments: <span class="tag-span">${comments}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Downloads: <span class="tag-span">${downloads}</span>
              </span>    
          </p>
      </div>
  </div>`
    )
    .join('');
}