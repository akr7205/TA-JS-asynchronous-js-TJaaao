let promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done!'), 1000);
  setTimeout(() => reject('error'), 1000);
}).then((data) => console.log(data));

2;
let promise2 = new Promise((resolve, reject) => {
  reject('error');
}).catch((err) => console.log(err));

3;
