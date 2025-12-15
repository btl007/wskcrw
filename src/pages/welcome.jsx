import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clipboard, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../img/wsk_logo_white.png';
import og_welcome from '../img/wsk_og_welcome.png';
import naverMap from '../img/navermap.png';
import tMap from '../img/tmap.png';

const Welcome = () => {
  const [locationCopied, setLocationCopied] = useState(false);
  const [parkingCopied, setParkingCopied] = useState(false);
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'location') {
        setLocationCopied(true);
        setTimeout(() => setLocationCopied(false), 2000);
      } else if (type === 'parking') {
        setParkingCopied(true);
        setTimeout(() => setParkingCopied(false), 2000);
      }
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center text-center p-10 sm:p-6">
      <Helmet>
        <title>WSK CRW 방문을 환영합니다!</title>
        <meta name="description" content="WSK CRW에 오신 것을 환영합니다. 방문 및 주차 정보를 확인하세요." />
        <meta property="og:title" content="WSK CRW 방문을 환영합니다!" />
        <meta property="og:description" content="WSK CRW에 오신 것을 환영합니다. 방문 및 주차 정보를 확인하세요." />
        <meta property="og:image" content={og_welcome} />
        <meta property="og:url" content="https://www.wskcrw.com/welcome" />
      </Helmet>
      <AnimatePresence>
        {(locationCopied || parkingCopied) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom/50 z-50 p-3 bg-blue-500/50 backdrop-blur border border-white/20 text-white rounded-lg shadow-lg flex items-center"
          >
            <Check className="mr-2" />
            <span>{locationCopied ? '주소가' : '안내가'} 클립보드에 복사되었습니다!</span>
          </motion.div>
        )}
      </AnimatePresence>
      {/* flowing Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 via-sky-300 to-yellow-200
          bg-[length:200%_200%] bg-flowing z-10" />

      {/* glassmorphism Overlay */}
      <div className="absolute top-0 left-0 w-full h-full backdrop-blur-xl bg-white/10 z-20" />
      <div className="max-w-2xl w-full relative z-30">
        {/* Hero Section */}
        <div className="relative p-10 mb-8 sm:mb-12 text-center bg-white/20 backdrop-blur border border-white/30 rounded-3xl shadow-lg">
          <div className="relative z-10">
            <div className="flex justify-center mt-6 mb-6">
              <img src={logo} className="w-60 sm:w-100 drop-shadow" />
            </div>
            <div className="mt-10 cursor-default">
            <span className="text-6xl sm:text-8xl md:text-10xl font-bold font-clash drop-shadow">
                😆
            </span>
            </div>
            <h1 className="text-2xl sm:text-2xl md:text-3xl mt-10 sm:mt-15 font-bold font-clash drop-shadow">
              방문을 환영합니다.
            </h1>
            <p className="text-lg sm:text-xl text-white mt-2 drop-shadow font-semibold font-clash">
              아래에서 오시는 길을 확인하세요.
            </p>
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Location Section */}
          <div className="bg-white/20 backdrop-blur border border-white/30 rounded-3xl p-4 sm:p-5 flex flex-col items-start shadow-md">
            <div className="flex items-center mb-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-xl font-semibold font-clash mt-1">방문 주소</h2>
            </div>
            <div className="w-full flex items-center">
              <div 
                className="flex-grow p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors duration-200"
                onClick={() => handleCopy('서울시 마포구 홍익로5안길 28, 210호 (패스트파이브 홍대 아트살롱)', 'location')}
              >
                <p className="text-white text-left font-robert text-base sm:text-lg tracking-tighter">
                  서울시 마포구 홍익로5안길 28, 210호
                </p>
                <p className="text-white text-left font-robert text-base">
                  (패스트파이브 홍대 아트살롱)
                </p>
              </div>
              
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <button 
                  className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-colors duration-200"
                  onClick={() => handleCopy('서울시 마포구 홍익로5안길 28, 210호 (패스트파이브 홍대 아트살롱)', 'location')}
                >
                  {locationCopied ? <Check className="text-blue-500/50" /> : <Clipboard className="text-white" />}
              </button>
              <a 
                  href="https://naver.me/xU4wiqPh" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 rounded-xl bg-white/30 hover:bg-white/50 transition-colors duration-200"
                >
                  <img src={naverMap} className="w-8 h-8" alt="Naver Map"/>
              </a>

              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="p-2 text-white bg-white/30 cursor-default rounded-xl hover:bg-white/50 transition-colors duration-300 font-semibold"
              >
                건물 입구 사진 보기 &rarr;
              </a>

            </div>
            


          </div>

          {/* Parking Section */}
          <div className="bg-white/20 backdrop-blur border border-white/30 rounded-3xl p-4 sm:p-5 flex flex-col items-start shadow-md">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-semibold font-clash mt-1">주차 안내</h2>
            </div>
            <div className="w-full flex items-center justify-between">
              <div 
                className="flex-grow p-2 rounded-lg hover:bg-white/20 cursor-pointer transition-colors duration-200"
                onClick={() => handleCopy('서울시 마포구 홍익로5안길 25', 'parking')}
              >
                <p className="text-white text-left font-robert text-base sm:text-lg tracking-tight">
                  건물 뒷편 지하 주차장을 이용해주세요.
                </p>
                <p>
                  &nbsp;
                </p>
              </div>
              
            </div>
              

              <div className="mt-2 flex items-center space-x-2">
              <button 
                  className="p-2 rounded-xl bg-white/30 hover:bg-white/50 transition-colors duration-200"
                  onClick={() => handleCopy('서울시 마포구 홍익로5안길 25', 'location')}
                >
                  {parkingCopied ? <Check className="text-blue-500/50" /> : <Clipboard className="text-white" />}
              </button>
              <a 
                  href="https://tmap.life/4f5e3d6b" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 rounded-xl bg-white/30 hover:bg-white/50 transition-colors duration-200"
                >
                  <img src={tMap} className="w-8 h-8" alt="T Map"/>
              </a>

              <a 
                href="#" 
                onClick={(e) => e.preventDefault()}
                className="p-2 text-white bg-white/30 cursor-default rounded-xl hover:bg-white/50 transition-colors duration-300 font-semibold"
              >
                주차장 입구 사진 보기 &rarr;
              </a>
            </div>




             
          </div>
        </div>
        
        <footer className="text-center text-white mt-12">
            <p>&copy; {new Date().getFullYear()} WSK CRW. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
};

export default Welcome;
