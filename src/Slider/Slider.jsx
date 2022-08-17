import React, { useEffect, useState } from "react";
import slides from "./dataSlider";
import style from "./Slider.module.css";

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide < slides.length - 1 ? currentSlide + 1 : 0
      );
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  function switchIndex(index){
    setCurrentSlide(index)
  }
  return (
    <>
      <div className='slider-container'>
        <div className={style.carousel}>
          <div className={style["carousel-inner"]}>
            {slides.map((slide, index) => {
              return (
                <div
                  className={style["carousel-item"]}
                  style={{ transform: `translateX(${-currentSlide * 100}%)` }}
                  key={index}
                >
                  <img src={slide} alt="slider" style={{width:"100%", display:"block"}}/>
                </div>
              );
            })}
          </div>
          <div className={style["carousel-indicators"]}>
            {slides.map((_, index) => {
              return (
                <button key={index}
                  className={`${style["carousel-indicator-item"]} ${
                    currentSlide === index ? style.active : ""
                  }`}
                  onClick={()=>{switchIndex(index)}}
                ></button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
