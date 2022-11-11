// let promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve('done!'), 1000);
//   setTimeout(() => reject('error'), 1000);
// }).then((data) => console.log(data));

// 2;
// let promise2 = new Promise((resolve, reject) => {
//   reject('error');
// }).catch((err) => console.log(err));

3;
// let promise3 = new Promise((res, rej) => {
//   rej('Rejected Promise');
// })
//   .catch(console.log)
//   .finally(() => console.log('promise setteled'));

// 4.
// A
// D
// C
// B

5;

// function wait(time) {
//   return new Promise((res, rej) => {
//     setTimeout(() => res('Promise DOne'), time);
//   });
// }

// wait(1000).then(console.log);

6;
// let promise4 = new Promise((res, rej) => {
//   res(21);
// })
//   .then((val) => val + 10)
//   .then((val) => val + 100)
//   .then((val) => {
//     console.log(val);
//     if (val > 100) {
//       throw new Error('something wrong');
//     }
//   })
//   .catch(console.log);

7;

// let promise = new Promise((res, rej) => {
//   res(['A']);
// })
//   .then((val) => val.concat(`B`))
//   .then((val) => {
//     return val.reduce((acc, val, index) => {
//       acc[index] = val;
//       return acc;
//     }, {});
//   })
//   .then(console.log);

// 8;

// let first = new Promise((res, rej) => {
//   res(1);
// })
//   .then((val) => {
//     console.log(val);
//     return 2;
//   })
//   .then((val) => {
//     console.log(val);
//     return 3;
//   })
//   .then((val) => {
//     console.log(val);
//     return 4;
//   });

9;
let first = new Promise((res, rej) => {
  res(1);
});

first.then((val) => {
  console.log(val);
  return 2;
});
first.then((val) => {
  console.log(val);
  return 3;
});
first.then((val) => {
  console.log(val);
  return 4;
});

10;

let promise = new Promise((res, rej) => {
  res('john');
})
  .then((val) => {
    return new Promise((res, rej) => {
      res('Arya');
    });
  })
  .then((val) => {
    console.log(val);
    return new Promise((res, rej) => {
      setTimeout(() => res('Bran'), 2000);
    });
  })
  .then((val) => console.log(val));
