// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

var activeElement;

function reset() {
  update(activeElement);
  modifyActiveElement();
}

function update(message) {
  console.log(message);
  activeElement = message;
  document.querySelector('#selected').value = message.content;
  document.querySelector('#class').value = message.class;
  sizeStringArr = activeElement.style.split(';');
  for (var dim in sizeStringArr.slice(0, -1)) {
    kvpair = sizeStringArr[dim].split(':');
    console.log(kvpair);
    document.getElementById(kvpair[0]).value = kvpair[1].slice(0, -2);
  }
}

function addOneToValue(event) {
  inputElementID = event.target.id.slice(0, -1);
  document.getElementById(inputElementID).value =
    parseInt(document.getElementById(inputElementID).value) + 1;
  modifyActiveElement();
}

function subOneToValue(event) {
  inputElementID = event.target.id.slice(0, -1);
  document.getElementById(inputElementID).value =
    parseInt(document.getElementById(inputElementID).value) - 1;
  modifyActiveElement();
}

function modifyActiveElement() {
  var newStyleStr = 'top:' + document.getElementById('top').value + 'px;';
  newStyleStr += 'left:' + document.getElementById('left').value + 'px;';
  newStyleStr += 'width:' + document.getElementById('width').value + 'px;';
  newStyleStr +=
    'line-height:' + document.getElementById('line-height').value + 'px;';

  var newActiveElement = {
    content: document.getElementById('selected').value,
    class: document.getElementById('class').value,
    style: newStyleStr
  };
  sendObjectToInspectedPage({
    action: 'code',
    content: 'modifySpan(' + JSON.stringify(newActiveElement) + ');'
  });
}

document.querySelector('#refresh').addEventListener(
  'click',
  function() {
    sendObjectToInspectedPage({
      action: 'script',
      content: 'scripts/inserted-script.js'
    });
  },
  false
);

document.querySelector('#reset').addEventListener('click', reset);

inputs = Array.from(document.getElementsByClassName('dimVal'));
inputs.forEach(element => {
  element.addEventListener('change', modifyActiveElement);
});

plus1s = Array.from(document.getElementsByClassName('plus1'));
plus1s.forEach(element => {
  element.addEventListener('click', addOneToValue);
});

minus1s = Array.from(document.getElementsByClassName('minus1'));
minus1s.forEach(element => {
  element.addEventListener('click', subOneToValue);
});
