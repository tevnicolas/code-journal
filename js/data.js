'use strict';
let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};
window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});
const previousDataJSON = localStorage.getItem('javascript-local-storage');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
// document.addEventListener('DOMContentLoaded', (): void => {
//   for (let entry of data.entries) {
//     const $newLiRowTree = render(entry);
//     $ul.appendChild($newLiRowTree);
//   }
// });
