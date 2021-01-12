
document.body.onload = main;

function main() {
  const container = document.querySelector("#container");
  const inputContainer = document.createElement('div');
  const list = document.createElement('div');
  const input = document.createElement('input');
  const btn = document.createElement('button');

  input.setAttribute('type', 'text');
  input.setAttribute('size', 30);

  btn.innerHTML = "Add Item";
  
  container.appendChild(inputContainer);
  container.appendChild(list);

  inputContainer.classList.add('input-container');
  list.classList.add('todo-list');
  
  inputContainer.appendChild(input);
  inputContainer.appendChild(btn);

  btn.addEventListener('click', addItem);
}

function addItem(e) {
  let input = document.querySelector('input');
  let list = document.querySelector('.todo-list');
  if (input.value !== '') {
    let item = createItem(input.value);
    list.appendChild(item);
    input.value = '';
    input.focus();
  } else {
    console.error(`You must type something!`);
  }
}

function createItem(data) {
  const item = document.createElement('div');
  item.classList.add('todo-item');
  const itemText = document.createTextNode(data);
  item.appendChild(itemText);
  insertIcons(item);
  return item;
}

function insertIcons(item) {
  let { chk, del } = getIcons();
  let span = document.createElement('span');
  span.appendChild(chk);
  span.appendChild(del);
  item.appendChild(span);
  chk.addEventListener('click', handleStrike);
  del.addEventListener('click', handleRemove);
}

function handleRemove(e) {
  e.target.parentElement.parentElement.remove();
}

function handleStrike(e) {
  e.target.removeEventListener('click', handleStrike);
  e.target.addEventListener('click', handleUnstrike);
  let parent = e.target.parentElement.parentElement;
  let nodes = parent.childNodes;
  let textNode;
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeType === 3) {
      textNode = nodes[i];
    }
  }
  let strike = document.createElement('del');
  parent.replaceChild(strike, textNode);
  strike.appendChild(textNode);
}

function handleUnstrike(e) {
  e.target.removeEventListener('click', handleUnstrike);
  e.target.addEventListener('click', handleStrike);
  let parent = e.target.parentElement.parentElement;
  let strike = parent.querySelector('del');
  let textNode = document.createTextNode(strike.textContent);
  parent.replaceChild(textNode, strike);
}

function getIcons() {
  let chk = document.createElement('i');
  let del = document.createElement('i');
  chk.classList.add('ri-check-line', 'icon');
  del.classList.add('ri-delete-bin-line', 'icon');
  return { chk, del };
}