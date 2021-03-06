import SettingsStorage from './storage/settings-storage';
import TipsStorage from "./storage/tips-storage";

export default class Popuper {

    constructor() {
        this.settingsStorage = new SettingsStorage();
        this.tipsStorage = new TipsStorage();

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

    get closeButton() {
        return this.popupContainer.getElementsByClassName('close-button')[0];
    }

    get prevTipButton() {
        return this.popupContainer.getElementsByClassName('prev-button')[0];
    }

    get nextTipButton() {
        return this.popupContainer.getElementsByClassName('next-button')[0];
    }

    get disableTipsCheckbox() {
        return this.popupContainer.getElementsByClassName('disable-tips')[0];
    }

    start() {
        this.settingsStorage.restoreStatus().then(status => {
            this.popupStatus = status;
            if (this.popupStatus.enabled) {
                this.tipsStorage.getTips().then(tips => {
                    this.tips = tips;
                    this.updateTipsCount();
                    this.setCurrentTipNumber(this.popupStatus.currentTipNo);
                    this.bindEvents();
                    this.setPopupVisibility(true);
                });
            }
        });
    }

    updateTipsCount() {
        this.totalTipCountSpan.innerText = this.tips.length;
    }

    setPopupVisibility(isVisible) {
        this.popupContainer.classList[isVisible ? 'remove' : 'add']('hidden');
    }

    loadCurrentTip() {
        this.currentTipNoSpan.innerText = this.popupStatus.currentTipNo + 1;
        this.tipTextParagraph.innerHTML = this.tips[this.popupStatus.currentTipNo];
    }

    setCurrentTipNumber(newTipNumber) {
        if (newTipNumber == undefined) {
            this.popupStatus.currentTipNo = Math.floor(Math.random() * this.tips.length);
        } else if (newTipNumber >= this.tips.length) {
            this.popupStatus.currentTipNo = newTipNumber = 0;
        } else if (newTipNumber < 0) {
            this.popupStatus.currentTipNo = this.tips.length - 1;
        } else {
            this.popupStatus.currentTipNo = newTipNumber;
        }

        this.loadCurrentTip();
    }

    showNextTip() {
        this.setCurrentTipNumber(this.popupStatus.currentTipNo + 1);
        this.settingsStorage.storeStatus(this.popupStatus);
    }

    showPrevTip() {
        this.setCurrentTipNumber(this.popupStatus.currentTipNo - 1);
        this.settingsStorage.storeStatus(this.popupStatus);
    }

    closePopup() {
        this.setPopupVisibility(false);
        this.popupContainer.remove();
        document.removeEventListener('keydown', this.boundKbEventsHandler);
    }

    handleKeyboardEvents(event) {
        switch (event.keyCode) {
            // Right arrow
            case 39: {
                this.showNextTip();
                break;
            }
            // LeftArrow
            case 37: {
                this.showPrevTip();
                break;
            }
            // ESC key
            case 27: {
                this.closePopup();
                break;
            }
        }
    }

    handleCheckboxToggle(event) {
        this.popupStatus.enabled = !event.target.checked;
        this.settingsStorage.storeStatus(this.popupStatus);
    }

    bindEvents() {
        this.closeButton.addEventListener('click', this.closePopup.bind(this));
        this.nextTipButton.addEventListener('click', this.showNextTip.bind(this));
        this.prevTipButton.addEventListener('click', this.showPrevTip.bind(this));
        this.disableTipsCheckbox.addEventListener('change', this.handleCheckboxToggle.bind(this));
        this.boundKbEventsHandler = this.handleKeyboardEvents.bind(this);
        document.addEventListener('keydown', this.boundKbEventsHandler);
    }
}