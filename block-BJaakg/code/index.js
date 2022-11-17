let root = document.querySelector('.got-container');
let booksURL = `https://www.anapioficeandfire.com/api/books`;
let donut = document.querySelector('.donut');
donut.style.display = 'none';

function handelspinner(status = false) {
  if (status) {
    donut.style.display = 'inline-block';
  } else {
    donut.style.display = 'none';
  }
}

function displaybooks(data) {
  let cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');

  data.forEach((book) => {
    // console.log(book);
    let card = document.createElement('div');
    card.classList.add('card');
    let h2 = document.createElement('h2');
    h2.classList.add('name');
    h2.innerHTML = book.name;
    let p = document.createElement('p');
    p.innerHTML = book.authors.join(' ');
    let btn = document.createElement('a');
    btn.classList.add('btn');
    btn.innerHTML = `show characters ${book.characters.length}`;

    let characterContainer = document.createElement('div');
    characterContainer.classList.add('characterContainer');
    let heading = document.createElement('h3');
    heading.innerText = 'Characters';
    heading.classList.add('characters-heading');
    characterContainer.append(heading);

    card.append(h2, p, btn, characterContainer);
    cardContainer.append(card);
    root.append(cardContainer);

    btn.addEventListener('click', () => {
      card.style.flex = `0 1 90%`;
      characterContainer.style.display = 'inline-block';
      let span = document.createElement('span');
      span.innerHTML = 'close';
      characterContainer.append(span);

      book.characters.forEach((character) => {
        handelspinner(true);
        fetch(character)
          .then((res) => {
            console.log(res, 'response');
            return res.json();
          })
          .then((charData) => {
            //   console.log(charData);
            handelspinner(false);
            let ul = document.createElement('ul');
            let name = document.createElement('li');
            let gender = document.createElement('li');
            let tvseries = document.createElement('li');
            let aliases = document.createElement('li');

            name.innerText = charData.name;
            gender.innerText = charData.gender;
            tvseries.innerHTML = `${charData.tvSeries.join(' ')}`;
            aliases.innerHTML = `${charData.aliases.join(' ')}`;
            ul.append(name, gender, tvseries, aliases);
            characterContainer.append(ul);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      });

      span.addEventListener('click', (e) => {
        console.log(e.target);
        characterContainer.style.display = 'none';
        card.style.flex = '0 1 30%';
      });
    });
  });
}

function fetchBooks() {
  handelspinner(true);
  fetch(booksURL)
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        throw new Error('404 Error content not found ', `${response.status}`);
      }
      return res.json();
    })
    .then((booksData) => {
      console.log(booksData);
      handelspinner(false);
      displaybooks(booksData);
    })
    .catch((error) => {
      return error;
    })
    .finally(() => {
      handelspinner(false);
    });
}
fetchBooks();
