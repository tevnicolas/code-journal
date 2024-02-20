/* global data */
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  url: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');
const $form = document.querySelector('.form') as HTMLFormElement;

if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");
if (!$form) throw new Error("There's no form element");

$photoURLInput.addEventListener('input', (event: Event): void => {
  const eventTarget = event.target as HTMLInputElement;
  $img.setAttribute('src', eventTarget.value);
});

$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
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
