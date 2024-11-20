import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { RotateCw } from 'lucide-react';

function Roulette({ phrases, onPhraseSelected }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const data = phrases.map((phrase) => ({
    option: phrase,
    style: {
      backgroundColor: '#4c1d95',
      textColor: 'white',
    },
  }));

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * phrases.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="text-4xl font-bold text-center mb-8">Gen-Mix</h1>

      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={['#312e81', '#4c1d95', '#831843']}
          textColors={['white']}
          fontSize={16}
          outerBorderColor="#ffffff"
          outerBorderWidth={2}
          innerRadius={20}
          radiusLineColor="#ffffff"
          radiusLineWidth={1}
          perpendicularText={false}
          onStopSpinning={() => {
            setMustSpin(false);
            onPhraseSelected(phrases[prizeNumber]);
          }}
        />
      </div>

      <button
        onClick={handleSpinClick}
        disabled={mustSpin}
        className="flex items-center space-x-2 px-6 py-3 bg-white text-purple-900 rounded-full font-bold transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RotateCw className={`w-5 h-5 ${mustSpin ? 'animate-spin' : ''}`} />
        <span>{mustSpin ? 'Ça tourne...' : 'Tournez la roue!'}</span>
      </button>
    </div>
  );
}

export default Roulette;
