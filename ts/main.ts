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
const $titleEntryForm = document.querySelector('#title-entry-form');
const $deleteEntryAnchor = document.querySelector('#delete-entry');
const $modal = document.querySelector('#delete-modal') as HTMLDialogElement;
const $cancel = document.querySelector('#cancel');
const $confirm = document.querySelector('#confirm');

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
if (!$titleEntryForm) throw new Error('No title!');

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
    $ul.prepend($newLiTree);
  } else {
    entriesObject.entryId = data.editing.entryId;
    data.editing = entriesObject;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = data.editing;
      }
    }
    const $newLiTree = render(entriesObject);
    const $oldLiTree = document.querySelector(
      'li[data-entry-id="' + String(data.editing.entryId) + '"]'
    );
    if (!$oldLiTree) throw new Error('No li element found to replace.');
    $oldLiTree.replaceWith($newLiTree);
    $titleEntryForm.textContent = 'New Entry';
    data.editing = null;
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
  clearForm();
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
  clearForm();
});

$newAnchor.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  viewSwap('entry-form');
  clearForm();
});

$ul.addEventListener('click', (event): void => {
  const $eventTarget = event.target as HTMLElement;
  if ($eventTarget.tagName === 'I') {
    viewSwap('entry-form');
    const $liAncestor = $eventTarget.closest('li');
    for (const entry of data.entries) {
      if ($liAncestor?.dataset.entryId === String(entry.entryId)) {
        data.editing = entry;
      }
    }
    toggleDeleteEntry();
    $formElements.title.value = data.editing?.title as string;
    $formElements.url.value = data.editing?.url as string;
    $formElements.notes.value = data.editing?.notes as string;
    $img.setAttribute('src', $formElements.url.value);

    $titleEntryForm.textContent = 'Edit Entry';
  }
});

function clearForm(): void {
  $formElements.title.value = '';
  $formElements.url.value = '';
  $formElements.notes.value = '';
  $img?.setAttribute('src', 'images/placeholder-image-square.jpg');
  $titleEntryForm!.textContent = 'New Entry';
  data.editing = null;
  toggleDeleteEntry();
}

function toggleDeleteEntry(): void {
  if (data.editing === null) {
    $deleteEntryAnchor?.setAttribute('class', 'hidden');
  } else {
    $deleteEntryAnchor?.setAttribute('class', '');
  }
}

$deleteEntryAnchor?.addEventListener('click', (): void => {
  $modal?.showModal();
});

$modal.addEventListener('click', (event) => {
  const $eventTarget = event.target as HTMLButtonElement;
  if ($eventTarget === $cancel) {
    $modal.close();
  }

  // start adding more code here for $confirm, rest of tasks etc.
});

console.log($confirm);
