import Popuper from './popuper';

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() =>
        new Popuper().start()
    , 100);
}, true);