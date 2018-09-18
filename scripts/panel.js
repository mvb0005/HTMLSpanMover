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
  if (message.type == "SPAN"){
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
  if (message.type == 'INPUT'){
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
  if (message.type == "KEY"){
    arrowKeyPress(message);
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
  console.log(activeElement);
  var newStyleStr = 'top:' + document.getElementById('top').value + 'px;';
  newStyleStr += 'left:' + document.getElementById('left').value + 'px;';
  newStyleStr += 'width:' + document.getElementById('width').value + 'px;';
  if (activeElement.type == 'INPUT'){
    newStyleStr += 'height:' + document.getElementById('height').value + 'px;';
  }
  if (activeElement.type == 'SPAN'){
    newStyleStr += 'line-height:' + document.getElementById('line-height').value + 'px;';
  }
  
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

function fill(){
  sendObjectToInspectedPage({
    action: 'script',
    content: 'scripts/populate.js'
  });
}

document.querySelector('#reset').addEventListener('click', reset);
document.querySelector('#fill').addEventListener('click', fill);
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

function arrowKeyPress(e){
  if (e.keyCode == '38') {
    // up arrow
    document.getElementById("top").value =
    parseInt(document.getElementById("top").value) - 1;
    modifyActiveElement();
  }
  else if (e.keyCode == '40') {
      // down arrow
    document.getElementById("top").value =
    parseInt(document.getElementById("top").value) + 1;
    modifyActiveElement();
  }
  else if (e.keyCode == '37') {
     // left arrow
    document.getElementById("left").value =
    parseInt(document.getElementById("left").value) - 1;
    modifyActiveElement();
  }
  else if (e.keyCode == '39') {
     // right arrow
    document.getElementById("left").value =
    parseInt(document.getElementById("left").value) + 1;
    modifyActiveElement();
  }
}
document.onkeydown = arrowKeyPress