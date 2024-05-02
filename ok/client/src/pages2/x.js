import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // Make sure to include your CSS file

const Slideshow = () => {
  const [slideIndex, setSlideIndex] = useState([1, 1]);
  const slideId = ["mySlides1", "mySlides2"];

  useEffect(() => {
    showSlides(1, 0);
    showSlides(1, 1);
  }, []);

  const plusSlides = (n, no) => {
    showSlides(slideIndex[no] + n, no);
  };

  const showSlides = (n, no) => {
    let i;
    const x = document.getElementsByClassName(slideId[no]);
    if (n > x.length) setSlideIndex([1, 1]);
    if (n < 1) setSlideIndex([x.length, x.length]);

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

    x[slideIndex[no] - 1].style.display = "block";
  };

  return (
    <div>
      

      
      <div className="slideshow-container">
        <div className="mySlides1">
          <img  src={imgSrc1} alt={product?.product_name} style={{ width: '100%' }}  />
        </div>

        <div className="mySlides1">
          <img  src={imgSrc2} alt={product?.product_name} style={{ width: '100%' }}  />
        </div>

        <div className="mySlides1">
          <img  src={imgSrc3} alt={product?.product_name} style={{ width: '100%' }}  />
        </div>

        <a className="prev" onClick={() => plusSlides(-1, 0)}>&#10094;</a>
        <a className="next" onClick={() => plusSlides(1, 0)}>&#10095;</a>
      </div>


    </div>
  );
};

export default Slideshow;
