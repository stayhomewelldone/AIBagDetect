// Initialize the Image Classifier method with MobileNet
let loader = document.querySelector("#loader")
let body = document.querySelector("body")
const image = document.getElementById('image')
const fileButton = document.getElementById("file")
const htplayButton = document.getElementById("htplay")
const gameDiv = document.getElementById("game")
const intro = document.getElementById("intro")
const startButton = document.getElementById("start")
const puntenContainer = document.getElementById("puntenoutput")
const mainContainer = document.getElementById("result")
const uploadDiv = document.getElementById("upload")
const voiceButton = document.getElementById("voice")


let punten = 0
puntenContainer.textContent = punten
let classifier
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
let synth = window.speechSynthesis
const imageClassifier = ml5.imageClassifier('MobileNet', model2Loaded)
htplayButton.addEventListener("click", ()=>{
  howtoplay();
});
startButton.addEventListener("click", start);
voiceButton.addEventListener("click", ()=>{
  speak("Make a picture of a Dirk or Albert Heijn shopping bag");
  
})
fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})



function reload(){

  gameDiv.style.display = "none"
  intro.style.display = "block"
  punten = 0
  puntenContainer.textContent = punten
  image.src=""
  mainContainer.innerHTML = ""
  

}
function start(){

intro.style.display = "none"
gameDiv.style.display = "block"
uploadDiv.style.display = "block"
}

function howtoplay(){

  window.alert("Make a picture of a AH or Dirk shopping bag")
}
function model2Loaded(){
  console.log("Imageclassifier also Loaded!")
  loader.style.display = "none";
  body.style.visibility = "visible";
}

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
  featureExtractor.load('./models/model.json', customModelReady)
  classifier = featureExtractor.classification(image, {numLabels: 3})
  
}

function customModelReady(){

  console.log('Custom model is ready!')
}
image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    getResults()
}

function speak(text) {
  if (synth.speaking) {
      console.log('still speaking...')
      return
  }
  if (text !== '') {
      let utterThis = new SpeechSynthesisUtterance(text)
      synth.speak(utterThis)
  }
}

function getFalseResults(){
  imageClassifier.classify(document.getElementById('image'), (err, results) => {
    mainContainer.innerHTML = "False! Do better shopping, this is : " + results[0].label;
  }
  )
}

function getResults() {
    // Make a prediction with a selected image
    classifier.classify(document.getElementById('image'), (err, results) => {
      console.log(results);
      
      
      if(results[0].confidence > 0.8 || results[1].confidence > 0.8)
      {mainContainer.innerHTML = "It is a : " + results[0].label;
       punten += 1 
       puntenContainer.textContent = punten
      speak("Great job! It is a : " + results[0].label);}
      else
      {
        punten -= 1
        
        if(punten < 0 ){
          mainContainer.innerHTML = "You have lost, start a new session by clicking on the reload button"
          uploadDiv.style.display = "none"
        }
        else {
        puntenContainer.textContent = punten
        getFalseResults()
        }
        
        
        }
      2
    });
}