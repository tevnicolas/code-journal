'use strict';
const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');
const $form = document.querySelector('.form');
const $ul = document.querySelector('.list');
const $noEntries = document.querySelector('.no-entries');
if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");
if (!$form) throw new Error("There's no form element");
if (!$ul) throw new Error("There's no ul element");
if (!$noEntries)
  throw new Error("There's no div element with class .no-entries");
$photoURLInput.addEventListener('input', (event) => {
  const eventTarget = event.target;
  $img.setAttribute('src', eventTarget.value);
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const entriesObject = {
    title: $formElements.title.value,
    url: $formElements.url.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(entriesObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
function render(entry) {
  const $liRow = document.createElement('li');
  $liRow.className = 'row';
  const $divColumnHalf1 = document.createElement('div');
  $divColumnHalf1.className = 'column-half img-container';
  const $img = document.createElement('img');
  $img.className = 'img';
  $img.setAttribute('src', entry.url);
  $img.setAttribute('alt', 'image post');
  const $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.className = 'column-half';
  const $title = document.createElement('h3');
  $title.textContent = entry.title;
  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $divColumnHalf2.appendChild($title);
  $divColumnHalf2.appendChild($notes);
  $divColumnHalf1.appendChild($img);
  $liRow.appendChild($divColumnHalf1);
  $liRow.appendChild($divColumnHalf2);
  return $liRow;
}
document.addEventListener('DOMContentLoaded', () => {
  for (const entry of data.entries) {
    const $newLiRowTree = render(entry);
    $ul.appendChild($newLiRowTree);
  }
});
function toggleNoEntries() {
  if ($noEntries.className === 'column-full no-entries') {
    $noEntries.setAttribute('class', 'column-full no-entries hidden');
  } else {
    $noEntries.setAttribute('class', 'column-full no-entries');
  }
}
