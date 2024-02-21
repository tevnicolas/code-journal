/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');
const $form = document.querySelector('.form') as HTMLFormElement;
const $formElements = $form.elements as FormElements;
const $ul = document.querySelector('.list') as HTMLUListElement;
const $noEntries = document.querySelector('.no-entries') as HTMLDivElement;
const $entryForm = document.querySelector(
  'div[data-view="entry-form"]'
) as HTMLDivElement;
const $entries = document.querySelector(
  'div[data-view="entries"]'
) as HTMLDivElement;
const $entriesHeaderAnchor = document.querySelector(
  '.anchor'
) as HTMLAnchorElement;
const $newAnchor = document.querySelector(
  '.new-button-styling'
) as HTMLAnchorElement;

if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");
if (!$form) throw new Error("There's no form element");
if (!$ul) throw new Error("There's no ul element");
if (!$noEntries)
  throw new Error("There's no div element with class .no-entries");
if (!$entryForm) throw new Error('No entry-form div element');
if (!$entries) throw new Error('No entries div element');
if (!$entriesHeaderAnchor) throw new Error('No entries header anchor element');
if (!$newAnchor) throw new Error('No "new" anchor button element');

$photoURLInput.addEventListener('input', (event: Event): void => {
  const eventTarget = event.target as HTMLInputElement;
  $img.setAttribute('src', eventTarget.value);
});

$form.addEventListener('submit', (event: Event): void => {
  event.preventDefault();

  const entriesObject = {
    title: $formElements.title.value,
    url: $formElements.url.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };

  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(entriesObject);
    const $newLiTree = render(entriesObject);
    $ul.appendChild($newLiTree);
  } else {
    entriesObject.entryId = data.editing.entryId;
    data.editing = entriesObject;
  }

  $form.reset();
  viewSwap('entries');
  toggleNoEntries();
});

function render(entry: EntriesObject): HTMLLIElement {
  const $liRow = document.createElement('li');
  $liRow.className = 'row';
  $liRow.setAttribute('data-entry-id', String(entry.entryId));
  const $divColumnHalf1 = document.createElement('div');
  $divColumnHalf1.className = 'column-half img-container';
  const $postedImg = document.createElement('img');
  $postedImg.className = 'img';
  $postedImg.setAttribute('src', entry.url);
  $postedImg.setAttribute('alt', 'image post');
  const $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.className = 'column-half';
  const $miniRow = document.createElement('div');
  $miniRow.className = 'entries-title-icon-split';
  const $title = document.createElement('h3');
  $title.className = 'entries-title';
  $title.textContent = entry.title;
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-pencil');
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $miniRow.appendChild($title);
  $miniRow.appendChild($pencil);
  $divColumnHalf2.appendChild($miniRow);
  $divColumnHalf2.appendChild($notes);
  $divColumnHalf1.appendChild($postedImg);
  $liRow.appendChild($divColumnHalf1);
  $liRow.appendChild($divColumnHalf2);

  return $liRow;
}

document.addEventListener('DOMContentLoaded', (): void => {
  for (const entry of data.entries) {
    const $newLiRowTree = render(entry);
    $ul.appendChild($newLiRowTree);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

function toggleNoEntries(): void {
  if (data.entries.length > 0) {
    $noEntries.setAttribute('class', 'column-full no-entries hidden');
  } else {
    $noEntries.setAttribute('class', 'column-full no-entries');
  }
}

function viewSwap(viewName: string): void {
  if (viewName === 'entry-form') {
    $entryForm.setAttribute('class', '');
    $entries.setAttribute('class', 'hidden');
  } else if (viewName === 'entries') {
    $entries.setAttribute('class', '');
    $entryForm.setAttribute('class', 'hidden');
  }
  data.view = viewName;
}

$entriesHeaderAnchor.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  viewSwap('entries');
  toggleNoEntries();
});

$newAnchor.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  viewSwap('entry-form');
});

$ul.addEventListener('click', (event) => {
  // const $pencilIcon = document.querySelector('.fa-pencil');
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    const $liAncestor = $eventTarget.closest('li');
    for (const entry of data.entries) {
      if ($liAncestor?.dataset.entryId === String(entry.entryId)) {
        data.editing = entry;
      }
    }
    $formElements.title.value = data.editing?.title as string;
    $formElements.url.value = data.editing?.url as string;
    $formElements.notes.value = data.editing?.notes as string;
    $img.setAttribute('src', $formElements.url.value);

    const $titleEntryForm = document.querySelector('#title-entry-form');
    if (!$titleEntryForm) throw new Error('No title!');
    $titleEntryForm.textContent = 'Edit Entry';
  }
});
