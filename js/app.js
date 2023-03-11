// Initialize the Image Classifier method with MobileNet

const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded)
const imageClassifier = ml5.imageClassifier('MobileNet', model2Loaded)
const image = document.getElementById('image')
const fileButton = document.querySelector("#file")
const htplayButton = document.getElementById("htplay")
const gameDiv = document.getElementById("game")
const intro = document.getElementById("intro")
const startButton = document.getElementById("start")
const puntenContainer = document.getElementById("puntenoutput");
const mainContainer = document.getElementById("result");
const uploadDiv = document.getElementById("upload")
let punten = 0
puntenContainer.textContent = punten
let classifier
let synth = window.speechSynthesis

htplayButton.addEventListener("click", howtoplay);
startButton.addEventListener("click", start);

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})
image.addEventListener('load', () => userImageUploaded())



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

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
    window.alert("The image is now visible in the DOM")
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
    const mainContainer = document.getElementById("result");
    mainContainer.innerHTML = "Doe beter boodschappen, dit is : " + results[0].label;
  }
  )
}

function getResults() {
    // Make a prediction with a selected image
    classifier.classify(document.getElementById('image'), (err, results) => {
      console.log(results);
      window.alert(results[0].label)
      
      if(results[0].confidence > 0.8 || results[1].confidence > 0.8)
      {mainContainer.innerHTML = "It is a : " + results[0].label;
       punten += 1 
       puntenContainer.textContent = punten
      speak("It is a : " + results[0].label);}
      else
      {
        punten -= 1
        
        if(punten < 0 ){
          mainContainer.innerHTML = "Je hebt verloren, start een nieuwe sessie door op de reload button te klikken"
          uploadDiv.style.display = "none"
        }
        else {
        puntenContainer.textContent = punten
        getFalseResults()
        }
        
        
        }
      
    });
}