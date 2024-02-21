/* exported data */
interface EntriesObject {
  title: string;
  url: string;
  notes: string;
  entryId: number;
}

interface Data {
  view: string;
  entries: EntriesObject[];
  editing: EntriesObject | null;
  nextEntryId: number;
}

let data: Data = {
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
