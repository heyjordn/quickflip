import localforage from "localforage";

const store = localforage.createInstance({
    name: "quickflip"
});

export default store;