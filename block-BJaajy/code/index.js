// 1;
// Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 4000)), // 1
//   new Promise((resolve) => setTimeout(() => resolve(2), 3000)), // 2
//   new Promise((resolve) => setTimeout(() => resolve(3), 2000)), // 3
//   new Promise((resolve) => setTimeout(() => resolve(4), 1000)), // 4
// ]).then(console.log);

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
