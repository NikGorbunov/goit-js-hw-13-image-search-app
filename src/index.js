import './sass/main.scss';
import 'regenerator-runtime/runtime'
import imgCardTpl from './templates/img_card_tpl.hbs';
import { searchForm, gallery } from './js/refs';
import ImagesApiService from './js/api_service';
import LoadMoreBtn from './js/load_more_btn';


searchForm.addEventListener('submit', onSearch);

const imgApiService = new ImagesApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

function onSearch(event) {
  if(event.currentTarget.elements.query.value === '') {
    return;
  }

  event.preventDefault();

  imgApiService.query = event.currentTarget.elements.query.value;
  loadMoreBtn.show();
  imgApiService.resetPage();
  clearGallery();
  getImages();
}

function getImages() {
  loadMoreBtn.disable();
  imgApiService.fetchImages().then(images => {
    imgMarkup(images);
  });
  loadMoreBtn.enable();
}

function imgMarkup(images) {
  const imgMarkup = imgCardTpl(images);
  gallery.insertAdjacentHTML('beforeend', imgMarkup);
}

function clearGallery() {
  gallery.innerHTML = '';
}

loadMoreBtn.refs.button.addEventListener('click', handleButtonClick);

async function handleButtonClick(e) {
  const images = await imgApiService.fetchImages().then(images => images);
  imgMarkup(images);
  gallery.scrollIntoView({ block: 'end', behavior: 'smooth' });
}
