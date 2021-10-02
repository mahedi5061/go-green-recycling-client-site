import React from 'react';
import './LatestNews.css';
import Light from "../../../images/light.jpg";
import Battery from "../../../images/battery.jpg";
import Laptop from "../../../images/laptop.jpg";
import Logo from "../../../images/logo.png";
import LatestNewsData from '../LatestNewsData/LatestNewsData';
import { Link } from 'react-router-dom';
const LatestNews = () => {
    const data = [
        {
          id: 1,
          title: "Chuck alcatra short ribs strip steak shoulder jowl",
          desc: "Capicola chicken pig shoulder. Hamburger swine sirloin, turducken pancetta meatball cow. Burgdoggen tenderloin tur, picanha pancetta corned beef bresaola.",
          img: Light,
        },
        {
          id: 2,
          title: "Tail doner short ribs meatball jowl pork loin biltong",
          desc: "Capicola chicken pig shoulder. Hamburger swine sirloin, turducken pancetta meatball cow. Burgdoggen tenderloin tur, picanha pancetta corned beef bresaola.",
          img: Battery,
        },
        {
          id: 3,
          title: "Short loin pork chop kielbasa chicken bacon meatloaf",
          desc: "Capicola chicken pig shoulder. Hamburger swine sirloin, turducken pancetta meatball cow. Burgdoggen tenderloin tur, picanha pancetta corned beef bresaola.",
          img: Laptop,
        },
      ];
    return (
        <>
          <section className="bg-gray-200 p-5">
        <img src={Logo} className="mx-auto mt-5 w-10" />
        <h1 className="text-center font-bold gogreen mt-3 font-monospace">
          Latest News
        </h1>
        <p className="text-center text-muted">Blog Posts</p>
        <div className="d-flex justify-content-center py-5">
          <div className="row w-75">
            {data.map((pd) => (
              <LatestNewsData pd={pd} id={pd.id} />
            ))}
          </div>
          
        </div>
        <div className="d-flex justify-content-center">
        <Link to="/"><button className="text-center service-design w-15">O U R<span className="ml-2"> B L O G S</span></button></Link>
        </div>
      </section>
        
        </>
    );
};

export default LatestNews;