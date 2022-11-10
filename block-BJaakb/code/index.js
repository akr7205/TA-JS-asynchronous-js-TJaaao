function fetch(keywordImages) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(
      'GET',
      `https://api.unsplash.com/search/photos?page=1&query=${keywordImages}&client_id=rMHUhpKrqqDAqUigRDz9o4mKgVCw8q1cofnCd3zLldY`
    );
    xhr.send();

    xhr.onload = () => {
      return resolve(JSON.parse(xhr.response));
    };

    xhr.onerror = () => {
      return reject('something went wrong');
    };
  });
}

// let test = fetch('dog')
//   .then((data) => {
//     console.log(data);
//     return data.results;
//   })
//   .catch((error) => {
//     console.log(error);
//     alert('check your internet conncection');
//     return error;
//   });

//refactor image search app

let input = document.querySelector('.input-field');
let root = document.querySelector('.image-container');

function createUI(data) {
  root.innerHTML = '';
  data.forEach((imgData) => {
    // console.log(imgData);
    let img = document.createElement('img');
    img.src = imgData.urls.small;
    root.append(img);
  });
}
input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    let input = e.target.value;
    let data = fetch(input).then((data) => {
      console.log(data);
      createUI(data.results);
    });

    console.log(data);
    input.value = '';
  }
});

//access key
// rMHUhpKrqqDAqUigRDz9o4mKgVCw8q1cofnCd3zLldY
