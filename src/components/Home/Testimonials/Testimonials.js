import React from 'react';
import Logo from '../../../images/logo.png';
import './Testimonials.css';
 
import Testimonial from '../Testimonial/Testimonial';
const Testimonials = () => {
  const [testimonials,setTestimonials]=React.useState([]);
  React.useEffect(() => {
      fetch('http://localhost:7000/reviews')
      .then(res=>res.json())
      .then(data =>setTestimonials(data))
  },[])
    return (
        <section className="bg-gray-50 p-5">
          <img src={Logo} className="mx-auto mt-5 w-10" />
        <h1 className="text-center font-bold gogreen mt-3 font-monospace">
        ๐นโ๐ชโ๐ธโ๐นโ๐ฎโ๐ฒโ๐ดโ๐ณโ๐ฎโ๐ฆโ๐ฑโ๐ธโ
        </h1>
        <p className="text-center text-muted client">๐ผโ๐ญโ๐ฆโ๐นโ ๐จโ๐ฑโ๐ฎโ๐ชโ๐ณโ๐นโ ๐ธโ๐ฆโ๐พโ๐ธโ</p>  
        <div className="d-flex justify-content-center py-5">
          <div className="row w-75">
            {testimonials.map((info,index) => (
              <Testimonial info={info} id={info.id} index={index}/>
            ))}
          </div>
          
        </div>
        </section>
    );
};

export default Testimonials;