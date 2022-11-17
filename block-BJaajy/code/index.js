1;
let times = [1, 2, 3, 4];
let timesPromises = times.map((second) => {
  return new Promise((res) => {
    setTimeout(() => res(Math.random()), second * 1000);
  });
});

Promise.all(timesPromises).then(console.log);
2;
let names = ['iliakan', 'remy', 'jeresig'];

let userData = Promise.all(
  names.map((name) =>
    fetch(`https://api.github.com/users/${name}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((users) => {
        console.log(`${users.name} followers are ${users.followers}`);
      })
  )
);

3;
let promiseOne = fetch(`https://random.dog/woof.json`).then((res) =>
  res.json()
);

let promiseTwo = fetch(`https://aws.random.cat/meow`).then((res) => res.json());

Promise.race([promiseOne, promiseTwo]).then(console.log);

4;

const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three]).then(console.log);
