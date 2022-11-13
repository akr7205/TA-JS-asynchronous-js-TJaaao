let input = document.querySelector('.user-input');
let root = document.querySelector('.news-wrapper');
let newsinput = document.getElementById('useroption');

let userInput = 'SpaceNews';

newsinput.addEventListener('change', (e) => {
  userInput = e.target.value;
  console.log(userInput);
  root.innerHTML = '';

  gettingData();
});

function gettingData() {
  return fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error('404 Error content not found ', `${response.status}`);
      }
      return response.json();
    })
    .then((newsdata) => {
      console.log(newsdata);
      createUI(newsdata);
    })
    .catch((error) => {
      console.error(error);
    });
}

gettingData();

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
