import{a as w,i as p,S as $}from"./assets/vendor-5401a4b0.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function g(s){return s.hits.map(({largeImageURL:r,webformatURL:o,tags:l,likes:e,views:t,comments:c,downloads:b})=>`<div class="gallery-item">
      <a class="gallery-link" href="${r}">
          <img 
          class="gallery-image" 
          src="${o}" 
          alt="${l}" 
          />
      </a>
      <div class="gallery-info">
          <p class="gallery-info-par">
              <span class="gallery-info-span">Likes: <span class="tag-span">${e}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Views: <span class="tag-span">${t}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Comments: <span class="tag-span">${c}</span>
              </span>    
          </p>
          <p class="gallery-info-par">
              <span class="gallery-info-span">Downloads: <span class="tag-span">${b}</span>
              </span>    
          </p>
      </div>
  </div>`).join("")}const L="34991157-d38b6fef3b34c3f08b128977b",v="https://pixabay.com/api/",f=document.querySelector(".loader"),S=document.querySelector(".load-btn"),E=document.querySelector(".form");async function m(s,r,o){const l=`${v}?key=${L}&q=${r}&image_type=photo&orientation=horizontal&savesearch=true&page=${o}&per_page=15`;f.style.display="block";try{const e=await w.get(l);return e.data.hits.length===0&&(p.error({title:"Error",timeout:2e3,position:"bottomRight",message:"Sorry, there are no images matching your search query. Please try again!"}),S.style.display="none",f.style.display="none",E.reset()),e.data}catch(e){console.error(`Error: ${e}`)}}const h=new $("div .gallery-link ",{captionsData:"alt",captionDelay:250,alertError:!1}),q=document.querySelector(".form"),d=document.querySelector(".gallery"),a=document.querySelector(".loader"),n=document.querySelector(".load-btn");q.addEventListener("submit",H);let i,y,u;n.style.display="none";async function H(s){i=1,s.preventDefault(),a.style.display="block",d.innerHTML="";const r=s.currentTarget;if(y=r.elements.query.value.trim(),y===""){p.show({title:"Error",color:"yellow",message:"Please search for something"}),n.style.display="none",a.style.display="none";return}m(y,i).then(o=>{u=o.totalHits,d.innerHTML=g(o),n.style.display="none",a.style.display="none",h.refresh(),r.reset()}).catch(o=>{console.error("Error:",o)})}n.addEventListener("click",async()=>{a.style.display="block";try{const s=await m(y,15,i);i+=1,i*15<u?(d.innerHTML+=g(s),h.refresh(),a.style.display="none",n.style.display="none",M()):p.info({title:"Info",timeout:2e3,color:"blue",position:"bottomRight",message:"We're sorry, but you've reached the end of search results."})}catch(s){p.error({title:"Error",message:s.message})}finally{n.style.display="none"}});window.onscroll=function(){window.innerHeight+window.scrollY>=document.body.offsetHeight&&i*15<u?(n.style.display="block",a.style.display="block"):(n.style.display="none",a.style.display="none")};function M(){const s=d.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*s,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
