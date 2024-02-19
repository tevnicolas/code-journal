/* global data */

const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');

if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");

$photoURLInput.addEventListener('input', (event: Event): void => {
  const eventTarget = event.target as HTMLInputElement;
  $img.setAttribute('src', eventTarget.value);
});

console.log(data);
