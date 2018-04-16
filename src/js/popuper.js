class Popuper {
    constructor() {
        this.settingsStorage = new SettingsStorage();
    }

    start() {
        this.settingsStorage.getPopuperStatus();
    }
}