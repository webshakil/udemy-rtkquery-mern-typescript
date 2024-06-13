import heroImg from '../../../assets/hero/headphone.png';

const Hero = () => {
  return (
   <>
      {/* Left side with text content */}
      <div className="order-2 md:order-1 md:w-1/2 h-full mt-0 md:mt-auto flex items-center justify-center">
        <div className="text-center text-white mx-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-black">Your Hero Title</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-black">Your Hero Subtitle</p>
          <p className="text-xl font-bold mb-2 text-black">Exciting Offer:</p>
          <p className="text-lg text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">
            Get Started
          </button>
        </div>
      </div>

      {/* Right side with the image */}
      <div className="order-1 md:order-2 w-full md:w-1/2 h-1/2 md:h-full mt-auto">
        <img
          className="object-cover object-center h-full w-full "
          src={heroImg}
          alt="Hero Background"
        />
      </div>
   </>
  )
}

export default Hero
