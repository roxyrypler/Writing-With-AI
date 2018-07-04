
let startToWriteBTN;
let selectionInput;
let modelSelector;
let lstm;
let textInput;
let tempSlider;
let lengthSlider;
let modelLoader; 
let createdDivNR = 0;
let divNRArr = [];
let gatheredText = [];

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
      select('#status').html('Ready!');
      select('#original').html(original);
      select('#prediction').html(result.generated);
    }
  } else {
    // Clear everything
    select('#original').html('');
    select('#prediction').html('');
  }
}

function savTextAndResetSeed() {
	createdDivNR ++;
	divNRArr.push('CreatedP' + createdDivNR);
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	
	let createP = document.createElement('textarea');
	createP.id = 'CreatedP';
	createP.className = 'form-control';
	let textInP = document.createTextNode(combinedText);
	createP.appendChild(textInP);
	
	let createDIV = document.createElement('div');
	createDIV.id = 'createdDIV' + createdDivNR;
	createDIV.appendChild(createP);
	
	let divParrent = document.getElementById('createdContent');
	divParrent.appendChild(createDIV);
}

function saveAndReset() {
	createdDivNR++;
	divNRArr.push('CreatedP' + createdDivNR);
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	
	let createP = document.createElement('textarea');
	createP.id = 'CreatedP';
	createP.className = 'form-control';
	let textInP = document.createTextNode(combinedText);
	createP.appendChild(textInP);
	
	let createDIV = document.createElement('div');
	createDIV.id = 'createdDIV' + createdDivNR;
	createDIV.appendChild(createP);
	
	let divParrent = document.getElementById('createdContent');
	divParrent.appendChild(createDIV);
	
	document.getElementById('textValue').value = '';
	getOriginal = document.getElementById('original').innerText = '';
	getPredicted = document.getElementById('prediction').innerText = '';
}

function saveYourStory() {
	
	//let getAllText = document.getElementById('CreatedP').innerHTML;
	
	for (let i = 0; i < divNRArr.length; i++) {
		let getAllText = document.getElementById('createdDIV' + createdDivNR).innerHTML;
		gatheredText.unshift(getAllText);
	}
	
	console.log(gatheredText);
	
	
}













