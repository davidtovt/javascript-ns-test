import anime from 'animejs/lib/anime.es.js';

import Modal from './assets/scripts/modal';
import './assets/styles/main.scss';

new Modal('[data-modal-open]', {
  data: './data/content.json',
  duration: 500,
  onOpen: () => {
    anime({
      targets: document.querySelector('.modal-content'),
      scale: [0.9, 1],
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 500,
      easing: 'easeInOutQuad',
    });

    anime({
      targets: document.querySelector('.modal-backdrop'),
      opacity: [0, 1],
      duration: 300,
      easing: 'easeInOutQuad',
    });
  },
  onClose: () => {
    anime({
      targets: document.querySelector('.modal'),
      scale: [1, 0.9],
      opacity: [1, 0],
      translateY: [0, 50],
      duration: 500,
      easing: 'easeInOutQuad',
    });

    anime({
      targets: document.querySelector('.modal-backdrop'),
      opacity: [1, 0],
      duration: 500,
      easing: 'easeInOutQuad',
    });
  },
});