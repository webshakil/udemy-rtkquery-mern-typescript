import headphone from '../assets/hero/headphone.png';
import Banner from '../components/HomeSection/Banner/Banner';
import Services from '../components/HomeSection/Services/Services';
import Products from '../components/HomeSection/Products/Products';
import Category2 from '../components/HomeSection/Category/Category2';
import Category1 from '../components/HomeSection/Category/Category1';
import Hero from '../components/HomeSection/Hero/Hero';
import smartwatch2 from '../assets/category/smartwatch2-removebg-preview.png'
import Blogs from '../components/HomeSection/Blog/Blog';
import Partners from '../components/HomeSection/Partners/Partners';
import Footer from '../components/HomeSection/Footer/Footer';


const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#f42c37",
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "14 Jan to 28 Jan",
  image: smartwatch2,
  title2: "Smart Solo",
  title3: "Winter Sale",
  title4:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque reiciendis",
  bgColor: "#2dcc6f",
};
const Home = () => {

  return (
    <>
    <div className="relative bg-cover bg-center h-screen flex flex-col md:flex-row pt-16">
        <Hero/>
    </div> 
    <Category1/>
    <Category2/>
    <Services/>
    <Banner data={BannerData} />
    <Products/>
    <Banner data={BannerData2} />
    <Blogs/>
    <Partners/>
    <Footer/>
    
  </>
  );
};

export default Home;











