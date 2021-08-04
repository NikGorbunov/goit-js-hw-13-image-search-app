import './sass/main.scss';
import 'regenerator-runtime/runtime'
import 'simplelightbox/dist/simple-lightbox.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import templateCard from './template/img_card_tpl.hbs';
import { searchForm, gallery } from './js/refs';
import SerchServiceApi from './js/api_servise';
const imgApiService = new SerchServiceApi();


let numberOfPages = 0;
const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });

searchForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {

    e.preventDefault();
    window.addEventListener('scroll', onScroll,2000);
    if (e.currentTarget.elements.searchQuery.value === '') {
        return Notiflix.Notify.warning('ops! Nothing is entered!');
    }
    if (e.currentTarget.elements.searchQuery.value.length > 10) {
        return Notiflix.Notify.warning('ops! Nothing is entered!');
    }

    imgApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    imgApiService.resetPage();
    await imgApiService.fetchDate().then(({ hits, totalHits }) => {
        numberOfPages = Math.ceil(560 / imgApiService.limit);

        clearGallery();
       Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        renderGallery(hits);
        lightbox.refresh();
    });

}

async function onScroll() {

    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 10) {

        try {
             await imgApiService.fetchDate().then(data => {
                 if (numberOfPages === imgApiService.page) {
                 window.removeEventListener('scroll', onScroll);
                    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                 }
                 renderGallery(data.hits);

           });

        }

        catch (error) {
            console.log(error);
        }

    }
}


function renderGallery(t) {
    gallery.insertAdjacentHTML('beforeend', templateCard(t));

}

function clearGallery() {
    gallery.innerHTML = '';
}