import { r as registerInstance, h, H as Host } from './index-51a778fc.js';

const imageSliderCss = ":host{display:block}#slider-frame{width:80%;height:75vh;margin:auto;vertical-align:middle;overflow:hidden;position:relative}#slider{position:inherit;display:flex;width:100%;height:100%}.slideshow-image{width:100%;height:auto;display:inline-block;vertical-align:middle;object-fit:cover}.sliderButton{pointer-events:auto;position:absolute;cursor:pointer;margin:0 auto;z-index:1000;width:100px;top:50%;mix-blend-mode:lighten}#nextImageButton{right:1%;transform:translate(0, -50%) rotate(-90deg)}#previousImageButton{left:1%;transform:translate(0, -50%) rotate(90deg)}#stopSliderButton{left:50%;top:100%;transform:translate(-50%, -75%);opacity:0.5;width:75px;height:75px}";

//images that are appended 
let imageElements = [];
let previousImageButton;
let stopSliderButton;
let nextImageButton;
let componentElement;
let sliderFrame;
let slider;
const sliderCooldown = 7500;
let sliderFrequency = 5000;
let paused = false;
let currentImageNumber = 2;
let autoplay = false;
let sliderSize;
let sliderCooldowFunction;
let sliderTimingFunction;
let sliderHeight;
let sliderWidth;
//responsiveness
let resized = false;
let transitionActive = false;
window.addEventListener('resize', () => {
  resized = true;
  adjustSliderSize();
});
const ImageSlider = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    //process input information and store sources in array
    const imageReferences = this.sources.split(";");
    for (let link of imageReferences) {
      const currentImage = new Image();
      currentImage.src = link;
      currentImage.classList.add("slideshow-image");
      imageElements.push(currentImage);
    }
    //store user input height and width
    sliderHeight = this.height;
    sliderWidth = this.width;
    //check if autoplay property has been set to "true"
    if (this.autoplay === "true") {
      autoplay = true;
    }
    //adapt slider frequency
    if (this.time) {
      if (this.time.includes("s")) {
        sliderFrequency = parseInt(this.time) * 1000;
      }
      else {
        sliderFrequency = parseInt(this.time);
      }
    }
  }
  render() {
    return (h(Host, null, h("div", { id: "slider-frame" }, h("img", { src: "./assets/pause.png", class: "sliderButton", id: "stopSliderButton" }), h("img", { src: "./assets/arrow.png", class: "sliderButton", id: "previousImageButton" }), h("img", { src: "./assets/arrow.png", class: "sliderButton", id: "nextImageButton" }), h("div", { id: "slider" })), h("slot", null)));
  }
  componentDidLoad() {
    initializeSlider();
  }
};
function initializeSlider() {
  defineObjectReferences();
  addEventListeners();
  addImages();
  changeSliderProperties();
  if (autoplay) {
    sliderTimingFunction = setInterval(() => { changeSlide("+"); }, sliderFrequency);
  }
}
function defineObjectReferences() {
  componentElement = document.querySelector("image-slider").shadowRoot;
  slider = componentElement.querySelector("#slider");
  sliderFrame = componentElement.querySelector("#slider-frame");
  nextImageButton = componentElement.querySelector("#nextImageButton");
  stopSliderButton = componentElement.querySelector("#stopSliderButton");
  previousImageButton = componentElement.querySelector("#previousImageButton");
}
function addEventListeners() {
  nextImageButton.addEventListener("click", (event) => { buttonClick(event.target, "+"); });
  previousImageButton.addEventListener("click", (event) => { buttonClick(event.target, "-"); });
  stopSliderButton.addEventListener("click", startStopSlider);
  slider.addEventListener("transitionend", () => {
    checkEndReached();
    transitionActive = false;
    adjustSliderSize();
  });
}
function addImages() {
  //add last image to start and first image to end to enable smooth transition
  slider.appendChild(imageElements[imageElements.length - 1]);
  //append images to slider
  for (let image of imageElements) {
    //.cloneNode(true) is necessary, beacuse duplicate first and last images will not get appended otherwise.
    slider.appendChild(image.cloneNode(true));
  }
  slider.appendChild(imageElements[0]).cloneNode(true);
  //move slider to hide last image appended to start for smooth transition
  adjustSliderSize();
}
function changeSliderProperties() {
  //match user input width to slider
  if (sliderWidth) {
    resized = true;
    sliderFrame.style.minWidth = sliderWidth;
  }
  //match user input height to slider
  if (sliderHeight) {
    if (sliderHeight.includes("%")) {
      resized = true;
      //calculate height from screen size  
      sliderFrame.style.height = sliderHeight.replace("%", "vh");
    }
    else if (sliderHeight.includes("px") || sliderHeight.includes("vh")) {
      resized = true;
      sliderFrame.style.height = sliderHeight;
    }
  }
  //height is updated in "adjustSliderSize()";
  adjustSliderSize();
}
function adjustSliderSize() {
  if (!transitionActive && resized) {
    //quick transition to smoothly fix position
    slider.style.transition = "transform 0.2s";
    sliderSize = sliderFrame.clientWidth;
    slider.style.transform = "translateX(" + (-sliderSize * (currentImageNumber - 1)) + "px)";
    console.log("resized");
    resized = false;
    //force images to adapt to slider size
    const images = componentElement.querySelectorAll(".slideshow-image");
    for (let image of images) {
      image.style.minWidth = sliderFrame.offsetWidth + "px";
    }
  }
}
function changeSlide(index) {
  if (!transitionActive) {
    transitionActive = true;
    slider.style.transition = "transform 2s ease-in-out";
    let factor;
    switch (index) {
      case "+":
        factor = (-currentImageNumber);
        currentImageNumber++;
        break;
      case "-":
        factor = (-currentImageNumber) + 2;
        currentImageNumber--;
        break;
    }
    slider.style.transform = "translateX(" + sliderSize * factor + "px)";
    paused = false;
  }
}
function checkEndReached() {
  if (currentImageNumber > imageElements.length + 1) {
    slider.style.transition = "none";
    slider.style.transform = "translateX(" + (-sliderSize) + "px)";
    currentImageNumber = 2;
  }
  else if (currentImageNumber === 1) {
    slider.style.transition = "none";
    slider.style.transform = "translateX(" + (-sliderSize * imageElements.length) + "px)";
    currentImageNumber = imageElements.length + 1;
  }
}
function startStopSlider() {
  if (!paused) {
    stopSliderButton.src = "./assets/pauseToPlay.gif";
    clearInterval(sliderTimingFunction);
    paused = true;
  }
  else if (paused) {
    stopSliderButton.src = "./assets/pause.png";
    changeSlide("+");
    sliderTimingFunction = setInterval(() => { changeSlide("+"); }, sliderFrequency);
    paused = false;
  }
}
function pauseSlider() {
  clearInterval(sliderTimingFunction);
  //clear slider cooldown function in case another instance is already active
  clearTimeout(sliderCooldowFunction);
  sliderCooldowFunction = setTimeout(() => {
    if (!paused)
      startStopSlider();
  }, sliderCooldown);
}
function buttonClick(button, direction) {
  if (!transitionActive) {
    button.src = "./assets/arrow.gif";
    setTimeout(() => button.src = "./assets/arrow.png", 1000);
    changeSlide(direction);
    pauseSlider();
  }
}
ImageSlider.style = imageSliderCss;

export { ImageSlider as image_slider };
