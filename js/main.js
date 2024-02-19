'use strict';
const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');
const $form = document.querySelector('.form');
if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");
if (!$form) throw new Error("There's no form element");
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
  data.entries.push(entriesObject);
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
