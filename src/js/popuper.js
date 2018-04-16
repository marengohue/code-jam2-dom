import SettingsStorage from './persistance/settings-storage';
import tips from "./tips.json";

export default class Popuper {

    constructor() {
        this.settingsStorage = new SettingsStorage();
        this.popupContainer = document.getElementsByClassName('popup-container')[0];
        if (!this.popupContainer) {
            throw new Error('Something went wrong with the popup initiaization. We were unable to find the .popup-container element in the DOM.');
        }
    }

    get totalTipCountSpan() {
        return this.popupContainer.getElementsByClassName('total-tip-count')[0];
    }

    get currentTipNoSpan() {
        return this.popupContainer.getElementsByClassName('current-tip-no')[0];
    }

    get tipTextParagraph() {
        return this.popupContainer.getElementsByClassName('popup-contents')[0];
    }

    start() {
        this.settingsStorage.getPopuperStatus().then(status => {
            if (status.popupsEnabled) {
                this.updateTipsCount();
                this.setCurrentTipNumber(status.currentTipNo);
                this.loadCurrentTip();
                this.setPopupVisibility(true);
            }
        });
    }

    updateTipsCount() {
        this.totalTipCountSpan.innerText = tips.length;
    }

    setPopupVisibility(isVisible) {
        this.popupContainer.classList[isVisible ? 'remove' : 'add']('hidden');
    }

    loadCurrentTip() {
        this.currentTipNoSpan.innerText = this.currentTipNo + 1;
        this.tipTextParagraph.innerHTML = tips[this.currentTipNo];
    }

    setCurrentTipNumber(newTipNumber) {
        if (newTipNumber == undefined) {
            this.currentTipNo = Math.floor(Math.random() * tips.length);
        } else if (newTipNumber >= tips.length) {
            this.currentTipNo = newTipNumber = 0;
        } else if (newTipNumber < 0) {
            this.currentTipNo = tips.length - 1;
        } else {
            this.currentTipNo = newTipNumber;
        }
    }
}