export default class SettingsStorage {
    getPopuperStatus() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve({
                popupsEnabled: true
            }));
        });
    }
}