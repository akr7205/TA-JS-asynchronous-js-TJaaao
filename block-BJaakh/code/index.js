let input = document.querySelector(`input[type="text"]`);
let rootList = document.querySelector('.todo-list');
let btn = document.querySelector('.btn');
let all = document.querySelector('.all');
let active = document.querySelector('.active');
let completed = document.querySelector('.completed');
let clear = document.getElementById('clear');
// console.log(input);
let url = `https://basic-todo-api.vercel.app/api/todo`;

function createTodoUI(data) {
  //     <li>
  //     <input class="styled-checkbox" id="1" type="checkbox">
  //     <label for="1">Checkbox</label>
  //     <span>-</span>
  //   </li>
  rootList.innerHTML = '';
  data.todos.forEach((todo, index) => {
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.classList.add('styled-checkbox');
    input.id = todo._id;
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.addEventListener('change', () =>
      handelChange(todo._id, todo.isCompleted)
    );
    let label = document.createElement('label');
    label.for = index;
    label.innerText = todo.title;
    label.addEventListener('dblclick', (event) =>
      handeledit(event, todo._id, todo.title)
    );

    let span = document.createElement('span');
    span.innerText = '-';
    span.setAttribute('data-id', todo._id);
    span.addEventListener('click', () => handelDelete(todo._id));
    li.append(input, label, span);
    rootList.append(li);
  });
}

input.addEventListener('keyup', (event) => {
  // console.dir(event);
  // console.log(event.target);
  // console.log(event.keyCode);
  if (event.keyCode === 13 && event.target.value) {
    let value = event.target.value;
    addToDo(value, false);
    getData();
    event.target.value = '';
  }
});

function getData() {
  fetch(url)
    .then((res) => {
      //   console.log(res);
      return res.json();
    })
    .then((data) => {
      console.log(data);
      createTodoUI(data);
    });
}
getData();
//add data to api
function addToDo(todo, isDone) {
  let data = {
    todo: {
      title: todo,
      isCompleted: isDone,
    },
  };

  fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(() => {
    getData();
  });
}

function handelDelete(id) {
  console.log(event.target.dataset.id);
  fetch('https://basic-todo-api.vercel.app/api/todo/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(() => {
    getData();
  });
}
function handelChange(id, status) {
  console.log(event.target);
  let data = {
    todo: {
      isCompleted: !status,
    },
  };

  fetch(url + `/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(() => {
    getData();
  });
}

function handeledit(event, id, title) {
  let input = document.createElement('input');
  input.value = title;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
  console.log(input, p, parent);

  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };

      fetch(url + `/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }).then(() => {
        getData();
      });
    }
  });
}

clear.addEventListener('click', (event) => {
  // console.log(event.target);
  allTodo = allTodo.filter((todo) => !todo.isDone);
  createTodoUI();
  updateButton(clear);
  localStorage.setItem('allTodo', JSON.stringify(allTodo));
});
active.addEventListener('click', (event) => {
  // console.log(event.target);
  let notCompleted = allTodo.filter((todo) => !todo.isDone);
  createTodoUI(notCompleted);
  updateButton(active);
});
completed.addEventListener('click', (event) => {
  let Completed = allTodo.filter((todo) => todo.isDone);
  createTodoUI(Completed);
  updateButton(completed);
});
all.addEventListener('click', (event) => {
  createTodoUI();
  updateButton(all);
});

function updateButton(btn) {
  all.classList.remove('selected');
  completed.classList.remove('selected');
  clear.classList.remove('selected');
  active.classList.remove('selected');

  btn.classList.add('selected');
}
// createTodoUI();
