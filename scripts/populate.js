inputFields = Array.from(document.querySelectorAll("input[type=text]"));
counter = 0;
alert("RAN");
inputFields.forEach(element => {
    if (element.value == ""){
        element.value = counter;
        counter++;
    }
});
