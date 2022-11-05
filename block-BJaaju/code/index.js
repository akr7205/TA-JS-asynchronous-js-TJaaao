let input = document.querySelector('.input-field');
let root = document.querySelector('.image-container');

function createUI(data) {
  root.innerHTML = '';
  data.forEach((imgData) => {
    console.log(imgData);
    let img = document.createElement('img');
    img.src = imgData.urls.small;
    root.append(img);
  });
}
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let input = e.target.value;

    let xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos?page=1&query=${e.target.value}&client_id=rMHUhpKrqqDAqUigRDz9o4mKgVCw8q1cofnCd3zLldY`
    );
    xhr.send();
    xhr.onload = function () {
      let imageData = JSON.parse(xhr.response);
      createUI(imageData.results);
      console.log(imageData);
    };
    input.value = '';
  }
});

//access key
// rMHUhpKrqqDAqUigRDz9o4mKgVCw8q1cofnCd3zLldY
