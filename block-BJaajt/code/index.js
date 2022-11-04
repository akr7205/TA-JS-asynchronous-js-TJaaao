let input = document.querySelector('.input-field');
let username = document.querySelector('.username');
let userprofile = document.querySelector('.userprofile');
let followers = document.querySelectorAll('.followers-container img');
let following = document.querySelectorAll('.following-container img');
let randomBtn = document.querySelector('.random-btn');
function createUi(data) {
  userprofile.src = data.avatar_url;
  username.innerHTML = data.name;
}
function createFollowers(data) {
  for (let i = 0; i <= 4; i++) {
    followers[i].src = data[i].avatar_url;
  }
}

function createFollowing(data) {
  for (let i = 0; i <= 4; i++) {
    following[i].src = data[i].avatar_url;
  }
}

input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${event.target.value}`);
    xhr.send();

    xhr.onload = () => {
      let userData = JSON.parse(xhr.response);
      createUi(userData);
      console.log(userData);
    };
    xhr.onloadstart = function () {
      console.log('content loaded');
    };

    let followerData = new XMLHttpRequest();
    followerData.open(
      'GET',
      `https://api.github.com/users/${event.target.value}/followers`
    );
    followerData.send();

    followerData.onload = () => {
      let userData = JSON.parse(followerData.response);
      createFollowers(userData);
      //   console.log(userData, 'foloowerData');
    };

    let followingData = new XMLHttpRequest();
    followingData.open(
      'GET',
      `https://api.github.com/users/${event.target.value}/following`
    );
    followingData.send();

    followingData.onload = () => {
      let userData = JSON.parse(followingData.response);
      createFollowing(userData);
      console.log(userData, 'foloowingData');
    };
  }
});

// unplash access key
// rMHUhpKrqqDAqUigRDz9o4mKgVCw8q1cofnCd3zLldY
//secret key
//rJWfLo_ZpcG725R4vpTJKDMFaLK37Xh_MQsf0sI4-

//cat api key
// live_RGVpaXkG9eshRZEZllbivB5AEkfFB0cxwpmy2rQ7RM3mAh8XwxhYph652N6Xj4bT

let catImg = document.querySelector('.cat-image');
function createCat(data) {
  catImg.src = data[0].url;
}

randomBtn.addEventListener('click', function () {
  let cat = new XMLHttpRequest();
  cat.open(
    'GET',
    'https://api.thecatapi.com/v1/images/search?api_key=live_RGVpaXkG9eshRZEZllbivB5AEkfFB0cxwpmy2rQ7RM3mAh8XwxhYph652N6Xj4bT'
  );
  cat.send();
  cat.onload = () => {
    let data = JSON.parse(cat.response);
    createCat(data);
    console.log(data, 'catData');
  };
});
