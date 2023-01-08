import LandingPageHeader from '../components/LandingPageHeader';
import Hero from '../components/Hero'
import NewCollection from '../components/NewCollection';
import AboutUs from '../components/AboutUs';
import BestSeller from '../components/BestSeller';
import OurProduct from '../components/OurProduct';
import Discount from '../components/Discount';
import Footer from '../components/Footer';

function LandingPage(props) {

  return (
    <div style={{ backgroundColor: 'white', marginTop: '25px' }}>
      <LandingPageHeader />
      <Hero />
      <NewCollection />
      <AboutUs />
      <BestSeller />
      <OurProduct />
      <Discount />
      <Footer />
    </div>
  )
}

export default LandingPage;
