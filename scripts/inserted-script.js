// This is included and executed in the inspected page
var insert;
var activeElement;

function inserted() {
  insert = true;
  console.log('External script attached');
}

function updateSpan(event) {
  if (event.target.tagName != 'SPAN') {
    return;
  }
  activeElement = event.target;
  chrome.runtime.sendMessage({
    type: "SPAN",
    content: activeElement.innerHTML,
    style: activeElement.getAttribute('style'),
    class: activeElement.getAttribute('class')
  });
}

function modifySpan(message) {
  activeElement.innerHTML = message.content;
  activeElement.setAttribute('style', message.style);
  activeElement.setAttribute('class', message.class);
}

function arrowKeyListener(event){
  event.preventDefault();
  chrome.runtime.sendMessage({
    type: "KEY",
    keyCode: event.keyCode
  })
}
if (insert == null) {
  document.addEventListener('mouseup', updateSpan);
  document.onkeydown = arrowKeyListener;
  console.log('Mouse listener attached');
}

inserted();
