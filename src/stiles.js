import settings from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.js-lightbox .lightbox__image');
const coseModalBtnRef = document.querySelector('.js-lightbox .lightbox__button');
const lightboxOverlayRef = document.querySelector('.js-lightbox .lightbox__overlay');
const imageMarkupRef = createImageMarkup(settings);

galleryRef.insertAdjacentHTML('beforeend', imageMarkupRef);
galleryRef.addEventListener('click', onClickOpenLightbox);
coseModalBtnRef.addEventListener('click', onClickCloseModal);
lightboxOverlayRef.addEventListener('click', onClickCloseModal);


function createImageMarkup(settings) {
    return settings.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    }).join('')
};

function onClickOpenLightbox(e) {
    e.preventDefault();
    if (e.currentTarget === e.target) {
        return;
    };

    window.addEventListener('keydown', onEscKeyPress);
    lightboxRef.classList.add('is-open');
    console.log(getImageUrlAndAlt(e));

};

function getImageUrlAndAlt(e) {
    const bigImgUrl = e.target.dataset.source;
    const bigImgAlt = e.target.alt;

    lightboxImageRef.src = bigImgUrl;
    lightboxImageRef.alt = bigImgAlt;
};

function onClickCloseModal(e) {
    if (e.target !== e.currentTarget) {
        return;
    };
    closeModal()
}

function onEscKeyPress(e) {
    if (e.code !== 'Escape') {
        return;
    }
    closeModal();
}

function closeModal() {

    window.removeEventListener('keydown', onEscKeyPress);
    lightboxImageRef.src = "";
    lightboxRef.classList.remove('is-open');
}