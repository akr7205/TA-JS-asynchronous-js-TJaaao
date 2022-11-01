// 1.
function timeout() {
  setTimeout(function exec() {
    console.log('one');
  }, 0);
  setTimeout(function exec() {
    console.log('two');
  }, 3000);
  setTimeout(function exec() {
    console.log('three');
  }, 2000);
}

timeout();

// 8.
function asyncForEach(arr, cb) {
  setTimeout(function exec() {
    arr.forEach((num) => cb(num));
  }, 2000);
}

console.log('one');
asyncForEach([1, 2, 3], (num) => console.log(num));
console.log('three');

// 9.

console.log('First Call');
setTimeout(function () {
  [1, 2, 3, 4, 5].forEach((num) => console.log(num));
}, 2000);
console.log('Last Call');
