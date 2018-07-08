
let startToWriteBTN;
let selectionInput;
let modelSelector;
let lstm;
let textInput;
let tempSlider;
let lengthSlider;
let modelLoader; 


function setup() {
  noCanvas();

  startToWriteBTN = document.getElementById('startToWriteBTN');
	
  // Grab the DOM elements
  textInput = select('#textValue');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');

  // Run generate anytime something changes
  //textInput.input(generate);
  lengthSlider.input(updateSliders);
  tempSlider.input(updateSliders);
}

function startWriter() {
	selectionInput = document.getElementById('inputGroupSelect01').value;
	modelSelector = selectionInput;
	//console.log(modelSelector);
	
	if (modelSelector == 1) {
		lstm = ml5.LSTMGenerator('models/bolano/', modelReady);
		document.getElementById('basedOn').innerHTML = 'bolano';
		//console.log(lstm);
	}else if (modelSelector == 2) {
		lstm = ml5.LSTMGenerator('models/charlotte_bronte/', modelReady);
		document.getElementById('basedOn').innerHTML = 'charlotte bronte';
		//console.log(lstm);
	}else if (modelSelector == 3) {
		lstm = ml5.LSTMGenerator('models/darwin/', modelReady);
		document.getElementById('basedOn').innerHTML = 'darwin';
		//console.log(lstm);
	}else if (modelSelector == 4) {
		lstm = ml5.LSTMGenerator('models/dubois/', modelReady);
		document.getElementById('basedOn').innerHTML = 'dubois';
		//console.log(lstm);
	}else if (modelSelector == 5) {
		lstm = ml5.LSTMGenerator('models/hemingway/', modelReady);
		document.getElementById('basedOn').innerHTML = 'hemingway';
		//console.log(lstm);
	}else if (modelSelector == 6) {
		lstm = ml5.LSTMGenerator('models/shakespeare/', modelReady);
		document.getElementById('basedOn').innerHTML = 'shakespeare';
		//console.log(lstm);
	}else if (modelSelector == 7) {
		lstm = ml5.LSTMGenerator('models/woolf/', modelReady);
		document.getElementById('basedOn').innerHTML = 'woolf';
		//console.log(lstm);
	}else if (modelSelector == 8) {
		lstm = ml5.LSTMGenerator('models/zora_neale_hurston/', modelReady);
		document.getElementById('basedOn').innerHTML = 'zora neale hurston';
		//console.log(lstm);
	}else if (modelSelector == 9) {
		lstm = ml5.LSTMGenerator('models/1984_By_George_Orwell/', modelReady);
		document.getElementById('basedOn').innerHTML = '1984 By George Orwell';
		//console.log(lstm);
	}else if (modelSelector == 10) {
		lstm = ml5.LSTMGenerator('models/GayLesbianGenre/', modelReady);
		document.getElementById('basedOn').innerHTML = '1984 By George Orwell';
		//console.log(lstm);
	}
}


function modelReady() {
  select('#status').html('Model Loaded');
}

function GenerateTextBTN() {
	generate();
}

function updateSliders() {
	select('#length').html(lengthSlider.value());
  	select('#temperature').html(tempSlider.value());
}



function generate() {
  // Update the status log
  select('#status').html('Generating...');

  // Update the length and temperature span elements
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something
  if (txt.length > 0) {
    // Here is the data for the LSTM generator
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, gotData);

    // Update the DOM elements with typed and generated text
    function gotData(result) {
	  let FixedToPeriod = result.generated;
	  FixedToPeriod = FixedToPeriod.substr(0, FixedToPeriod.lastIndexOf("."));
		
		if (FixedToPeriod == "") {
			lstm.generate(data, gotData);
			console.log("Make again");
		}else {
		  //alert(FixedToPeriod);
		  select('#status').html('Ready!');
		  select('#original').html(original);
		  select('#prediction').html(FixedToPeriod + ".");
		}
    }
  } else {
    // Clear everything
    select('#original').html('');
    select('#prediction').html('');
  }
}

function savTextAndResetSeed() {
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	let createdText = document.getElementById('createdText').value;
	
	let txt = createdText.concat(combinedText);
	let applyText = document.getElementById('createdText').innerHTML = txt + " ";
	
	//let createP = document.createElement('textarea');
	//createP.id = 'CreatedP' + createdDivNR;
	//createP.className = 'form-control';
	//let textInP = document.createTextNode(combinedText);
	//createP.appendChild(textInP);
	
	//let createDIV = document.createElement('div');
	//createDIV.id = 'createdDIV' + createdDivNR;
	//createDIV.appendChild(createP);
	
	//let divParrent = document.getElementById('createdContent');
	//divParrent.appendChild(createDIV);
}

function saveAndReset() {
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	let createdText = document.getElementById('createdText').value;
	
	let txt = createdText.concat(combinedText);
	let applyText = document.getElementById('createdText').innerHTML = " " + txt;
	
	//let createP = document.createElement('textarea');
	//createP.id = 'CreatedP' + createdDivNR;
	//createP.className = 'form-control';
	//let textInP = document.createTextNode(combinedText);
	//createP.appendChild(textInP);
	
	//let createDIV = document.createElement('div');
	//createDIV.id = 'createdDIV';
	//createDIV.appendChild(createP);
	
	//let divParrent = document.getElementById('createdContent');
	//divParrent.appendChild(createDIV);
	
	document.getElementById('textValue').value = '';
	getOriginal = document.getElementById('original').innerText = '';
	getPredicted = document.getElementById('prediction').innerText = '';
}
	
	
function saveStory()
{
	var textToWrite = document.getElementById('createdText').value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = 'Your story';

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	
	if(textToWrite.length == 0 || textToWrite == null) {
		alert('You must save some text first');
	}else if (window.webkitURL != null) {
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}














