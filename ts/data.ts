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
  editing: unknown;
  nextEntryId: number;
}

const data: Data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

console.log(data);
