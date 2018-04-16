export default class SettingsStorage {
    restoreStatus() {
        return new Promise((resolve, reject) => {
            const popupSettingsString = localStorage.getItem('TIPS_POPUP_SETTINGS');
            if (popupSettingsString) {
                resolve(JSON.parse(popupSettingsString));
            } else {
                resolve({
                    enabled: true
                });
            }
        });
    }

    storeStatus(status) {
        return new Promise((resolve, reject) => {
            localStorage.setItem('TIPS_POPUP_SETTINGS', JSON.stringify(status));
            resolve();
        });
    }
}