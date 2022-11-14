let input = document.querySelector('.user-input');
let root = document.querySelector('.news-wrapper');
let newsinput = document.getElementById('useroption');
let donut = document.querySelector('.donut-container');
let userInput = 'SpaceNews';
let main = document.querySelector('main');
let errormsg = document.querySelector('.error-msg');

newsinput.addEventListener('change', (e) => {
  userInput = e.target.value;
  console.log(userInput);
  root.innerHTML = '';

  gettingData();
});
function handelErrormsg(msg) {
  main.style.display = 'none';
  errormsg.style.display = 'block';
  errormsg.innerHTML = msg;
}

function handelspinner(status = false) {
  if (status) {
    donut.innerHTML = `<div class="donut"></div>`;
  } else {
    donut.innerHTML = '';
  }
}
function gettingData() {
  handelspinner(true);
  return fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((response) => {
      //   console.log(response);
      if (!response.ok) {
        throw new Error('404 Error content not found ', `${response.status}`);
      }
      return response.json();
    })
    .then((newsdata) => {
      //   console.log(newsdata);
      handelspinner(false);
      createUI(newsdata);
    })
    .catch((error) => {
      handelErrormsg(error);
      console.error(error);
    })
    .finally(() => {
      handelspinner();
    });
}

if (navigator.onLine) {
  gettingData();
} else {
  handelErrormsg('check your internet connection');
}

function createUI(newsdata) {
  console.log(userInput);
  newsdata.forEach((news) => {
    if (userInput === news.newsSite) {
      let newscard = document.createElement('div');
      newscard.classList.add('news-card');

      let figure = document.createElement('figure');
      let img = document.createElement('img');
      img.src = news.imageUrl;
      figure.append(img);

      let postinfo = document.createElement('div');
      postinfo.classList.add('post-info');
      let postCategory = document.createElement('div');
      postCategory.classList.add('post-category');
      postCategory.innerHTML = userInput;
      let title = document.createElement('h2');
      title.classList.add('title');
      title.innerHTML = news.title;
      let link = document.createElement('a');
      link.classList.add('btn');
      link.href = news.url;
      link.innerHTML = 'Read More';

      postinfo.append(postCategory, title, link);

      newscard.append(figure, postinfo);

      root.append(newscard);
    }
  });
}
