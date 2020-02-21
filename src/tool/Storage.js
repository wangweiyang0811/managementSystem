export const session = {
  get(key) {
    let val = sessionStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  },
  set(key, val) {
    let formatVal = JSON.stringify(val);
    sessionStorage.setItem(key, formatVal);
  }
};
// export const local = {
//   get() {

//   },
//   set() {

//   }
// };
