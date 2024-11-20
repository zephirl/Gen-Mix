import React, { useState, useEffect } from 'react';
import { ArrowLeft, ScanLine } from 'lucide-react';
import Card from './Card';
import { cards } from '../data/cards';

function CardSelection({ selectedPhrase, onBack, onConfirm }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [barcodeBuffer, setBarcodeBuffer] = useState('');
  const [scanTimeout, setScanTimeout] = useState(null);
  const [lastScanned, setLastScanned] = useState('');

  useEffect(() => {
    const handleBarcodeInput = (event) => {
      event.preventDefault();

      if (scanTimeout) {
        clearTimeout(scanTimeout);
      }

      if (/^\d$/.test(event.key)) {
        setBarcodeBuffer((prev) => prev + event.key);

        const timeout = setTimeout(() => {
          setBarcodeBuffer('');
        }, 100);
        setScanTimeout(timeout);
      }

      if (event.key === 'Enter' && barcodeBuffer.length === 2) {
        const scannedId = barcodeBuffer;
        setLastScanned(scannedId);

        const cardIndex = parseInt(scannedId) - 1;

        if (
          cardIndex >= 0 &&
          cardIndex < cards.length &&
          !selectedCards.includes(cardIndex)
        ) {
          if (selectedCards.length < 3) {
            setSelectedCards((prev) => [...prev, cardIndex]);
          }
        }

        setBarcodeBuffer('');
      }
    };

    window.addEventListener('keydown', handleBarcodeInput);
    return () => {
      window.removeEventListener('keydown', handleBarcodeInput);
      if (scanTimeout) clearTimeout(scanTimeout);
    };
  }, [selectedCards, barcodeBuffer, scanTimeout]);

  const removeCard = (cardIndex) => {
    setSelectedCards((prev) => prev.filter((i) => i !== cardIndex));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-white/80 hover:text-white mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour à la Roulette</span>
      </button>

      <div className="space-y-8">
        <div className="bg-black/30 p-6 rounded-lg backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-2">
            Observez, choisissez, discutez, scannez! Votre thématique est :
          </h2>
          <p className="text-xl">{selectedPhrase}</p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[0, 1, 2].map((slot) => {
            const cardIndex = selectedCards[slot];
            const card = cardIndex !== undefined ? cards[cardIndex] : null;

            if (!card) {
              return (
                <div
                  key={slot}
                  className="aspect-[4/5] rounded-xl bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 p-4"
                >
                  <ScanLine className="w-12 h-12 text-white/30" />
                  <p className="text-white/30 font-medium text-center">
                    Scannez un jeu
                  </p>
                </div>
              );
            }

            return (
              <Card
                key={slot}
                card={card}
                isSelected={true}
                onRemove={() => removeCard(cardIndex)}
                onClick={() => {}}
                keyHint={String(cardIndex + 1).padStart(2, '0')}
              />
            );
          })}
        </div>

        <div className="flex justify-between items-center bg-black/30 p-4 rounded-lg backdrop-blur-sm">
          <div>
            <p className="text-sm opacity-70">
              Dernier scan : {lastScanned || 'None'}
            </p>
            <p className="text-sm opacity-70">
              Cartes séléctionnées : {selectedCards.length}/3
            </p>
          </div>
          <button
            onClick={() => onConfirm(selectedCards)}
            disabled={selectedCards.length !== 3}
            className="px-6 py-2 bg-white text-purple-900 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
          >
            Confirmer la selection
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardSelection;
