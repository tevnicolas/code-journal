'use strict';
/* global data */
const $photoURLInput = document.querySelector('#url');
const $img = document.querySelector('.img');
if (!$photoURLInput) throw new Error("There's no photo url input element");
if (!$img) throw new Error("There's no img element");
$photoURLInput.addEventListener('input', (event) => {
  const eventTarget = event.target;
  $img.setAttribute('src', eventTarget.value);
});
