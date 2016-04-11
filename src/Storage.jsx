
import makeFinalStore from 'alt-utils/lib/makeFinalStore';


const storage = {
  get(k) {
    try {
      return JSON.parse(localStorage.getItem(k));
    }
    catch(e) {
      return null;
    }
  },
  set(k, v) {
    localStorage.setItem(k, JSON.stringify(v));
  }
};

export function startSync(alt, storeName) {
  const finalStore = makeFinalStore(alt);

  alt.bootstrap(storage.get(storeName));
  finalStore.listen(() => {
    storage.set(storeName, alt.takeSnapshot());
  });
}
