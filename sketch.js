
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
  textInput.input(generate);
  lengthSlider.input(generate);
  tempSlider.input(generate);
}

function startWriter() {
	selectionInput = document.getElementById('inputGroupSelect01').value;
	modelSelector = selectionInput;
	//console.log(modelSelector);
	
	if (modelSelector == 1) {
		lstm = ml5.LSTMGenerator('models/bolano/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 2) {
		lstm = ml5.LSTMGenerator('models/charlotte_bronte/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 3) {
		lstm = ml5.LSTMGenerator('models/darwin/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 4) {
		lstm = ml5.LSTMGenerator('models/dubois/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 5) {
		lstm = ml5.LSTMGenerator('models/hemingway/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 6) {
		lstm = ml5.LSTMGenerator('models/shakespeare/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 7) {
		lstm = ml5.LSTMGenerator('models/woolf/', modelReady);
		//console.log(lstm);
	}else if (modelSelector == 8) {
		lstm = ml5.LSTMGenerator('models/zora_neale_hurston/', modelReady);
		//console.log(lstm);
	}
}

function modelReady() {
  select('#status').html('Model Loaded');
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
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	
	let createP = document.createElement('p');
	createP.id = 'CreatedP';
	let textInP = document.createTextNode(combinedText);
	createP.appendChild(textInP);
	
	let createDIV = document.createElement('div');
	createDIV.id = 'createdDIV';
	createDIV.appendChild(createP);
	
	let divParrent = document.getElementById('createdContent');
	divParrent.appendChild(createDIV);
}

function saveAndReset() {
	
	let getOriginal = document.getElementById('original').innerText;
	let getPredicted = document.getElementById('prediction').innerText;
	let combinedText = getOriginal + getPredicted;
	
	let createP = document.createElement('p');
	createP.id = 'CreatedP';
	let textInP = document.createTextNode(combinedText);
	createP.appendChild(textInP);
	
	let createDIV = document.createElement('div');
	createDIV.id = 'createdDIV';
	createDIV.appendChild(createP);
	
	let divParrent = document.getElementById('createdContent');
	divParrent.appendChild(createDIV);
	
	document.getElementById('textValue').value = '';
	getOriginal = document.getElementById('original').innerText = '';
	getPredicted = document.getElementById('prediction').innerText = '';
}













