import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { sliderDatas } from "./data/slider_data";


function App() {
  
  const [image, setImage] = useState(1);


  const toggleImage = (idx) => {
    // let newState;
    // if(image + idx <= 0) newState = sliderDatas.length
    // else if (image + idx > sliderDatas.length) newState = 1;
    // else newState = image + idx
  
    // setImage(newState)

    setImage(image => {
    if(image + idx <= 0) return sliderDatas.length
    else if (image + idx > sliderDatas.length) return 1;
    else return image + idx
    })
  }

  useEffect(() => {
    const intervalID = setInterval(() => toggleImage(1), 1000);
    
    return () => clearInterval(intervalID);
  }, []); 
  

  
  return (
    <div className="w-screen h-screen flex justify-center items-center gap-10 bg-[#3b3b3b]">
      <ChevronLeft
        onClick={() => {toggleImage(-1)}}
        id="chevron-left"
        className="text-white size-10 cursor-pointer"
      />
      <div className="w-120 h-64 bg-white text-center" id="image_container">
        <p>{image} / {sliderDatas.length}</p>
        <img className="h-auto max-w-full" src={"/image-" + image + ".jpg"} />
        <p>{sliderDatas.find(obj => obj.id === image).description}</p>
      </div>
      <ChevronRight
        onClick={() => {toggleImage(1)}}
        id="chevron-right"
        className="text-white size-10 cursor-pointer"
      />
    </div>
  );
}

export default App;
