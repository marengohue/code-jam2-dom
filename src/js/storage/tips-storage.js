import tipsJson from './tips.json';

export default class TipsStorage {
    getTips() {
        return new Promise((resolve, reject) => {
            resolve(tipsJson);
        });
    }
}