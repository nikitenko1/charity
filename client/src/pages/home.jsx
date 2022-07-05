import React from 'react';
import Footer from './../components/global/Footer';
import Navbar from './../components/global/Navbar';
import Banner from './../components/home/Banner';
import Overview from './../components/home/Overview';
import LatestEvents from './../components/home/LatestEvents';
import HeadInfo from '../utils/HeadInfo';

const Home = () => {
  return (
    <>
      <HeadInfo title="Home" />
      <Navbar />
      <Banner />
      <Overview />
      <LatestEvents />
      <Footer />
    </>
  );
};

export default Home;
