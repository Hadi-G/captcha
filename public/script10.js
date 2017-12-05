let captchaValues = [
  {question:'un plus trois', codes:[49, 16, 187, 51], answer:'quatre'},
  {question:'six divisé par 2', codes:[54, 191, 50], answer:'trois'},
  {question:'quatre multiplié par cinq', codes:[52, 16, 56, 53], answer:'vingt'}
];


let questionDiv = document.querySelector('#question');
let resultDiv = document.querySelector('#result');
let answerDiv = document.querySelector('#answer');
let txtResult = document.querySelector('#txtResult');

let nbAvailableQuestions = captchaValues.length;
let pickedQuestion = null;
let isHuman = false;
let pressedKeys = [];
let resultInLetters = [];

function choseQuestion(){
  const index = Math.floor(Math.random()*3);
  pickedQuestion = captchaValues[index];
  const text = `Veuillez saisir sur votre pavé numérique <strong>${pickedQuestion.question}</strong> (échap pour recommencer votre saisie)`;
  console.log(text);
  display(text, questionDiv);
}

function display(what, where){
  where.innerHTML = what;
}

window.addEventListener('keydown', handleKeyboardEvent);
txtResult.addEventListener('keydown', checkTextResult);

function handleKeyboardEvent(evt){
  console.log(evt);
  //if user pressed escape, allow him to restart trying entering the right code
  if(evt.keyCode === 27){
    pressedKeys = [];
    console.log('saisie annulee');
    return;
  }
  //authorize to press f5 to refresh and f12 to display/hide dev tools
  if(evt.keyCode === 116 || evt.keyCode === 123){
    return;
  }

  pressedKeys.push(evt.keyCode);
  if(pressedKeys.length === 4){
    console.log('4 saisies : humain');
    isHuman = true;
    computeResult();
  }
}

function computeResult(){
  const isGoodKeypresses = compareArrays(pressedKeys, pickedQuestion.codes);
  console.log('isGoodKeypresses' ,isGoodKeypresses);
  if(isHuman && !isGoodKeypresses){
    display('Vous êtes humain mais ne savez plus compter', resultDiv);
  } else if(isHuman && isGoodKeypresses){
    display('Merci, vous êtes bien humain. Veuillez indiquer votre résultat puis appuyer sur Entrée', resultDiv);
  }
}

function compareArrays(a, b){
  for(let i = 0; i<a.length; i++){
    if(a[i]!== b[i]){
      return false;
    }
  }
  return true;
}

function checkTextResult(evt){
  if(evt.keyCode >= 65 && evt.keyCode <= 90){
    resultInLetters.push(evt.key);
  } else if(evt.keyCode === 8){
    resultInLetters.splice(resultInLetters.length -1,1);
    console.log(resultInLetters);
  } else if(evt.keyCode === 13){
    if(resultInLetters.join('') === pickedQuestion.answer){
      display('validation réussie :)', resultDiv);
    } else {
      display('la validation a echoue', resultDiv);
    }
  }
}
