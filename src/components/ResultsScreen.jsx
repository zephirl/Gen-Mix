import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer, RefreshCw, Check } from 'lucide-react';
import Card from './Card';
import { cards } from '../data/cards';

function PrintDialog({ onRestart }) {
  const [isPrinted, setIsPrinted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPrinted(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white text-purple-900 rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <h3 className="text-2xl font-bold mb-6">
          {isPrinted ? 'Printing Complete!' : 'Thank you! Now printing...'}
        </h3>

        <div className="w-24 h-24 mx-auto mb-6 relative">
          {isPrinted ? (
            <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center animate-scale-check">
              <Check className="w-12 h-12 text-green-600" />
            </div>
          ) : (
            <>
              <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
              <div
                className="absolute inset-0 border-4 border-purple-600 rounded-full animate-spin"
                style={{
                  borderRightColor: 'transparent',
                  animationDuration: '2s',
                }}
              ></div>
            </>
          )}
        </div>

        <button
          onClick={() => {
            onRestart();
            window.location.reload(); // Force reload to reset all states
          }}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition-colors w-full"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Recommencer</span>
        </button>
      </div>
    </div>
  );
}

function ResultsScreen({ selectedPhrase, selectedCards, onBack }) {
  const [flippedCards, setFlippedCards] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [showPrintDialog, setShowPrintDialog] = useState(false);

  useEffect(() => {
    selectedCards.forEach((_, index) => {
      setTimeout(() => {
        setFlippedCards((prev) => [...prev, index]);
      }, index * 500);
    });

    setTimeout(() => {
      setExpandedCards(selectedCards.map((_, i) => i));
    }, (selectedCards.length - 1) * 500 + 700);

    return () => {
      setFlippedCards([]);
      setExpandedCards([]);
    };
  }, [selectedCards]);

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-white/80 hover:text-white mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Retour à la selection</span>
      </button>

      <div className="space-y-8">
        <div className="bg-black/30 p-6 rounded-lg backdrop-blur-sm relative">
          <div className="pr-32">
            <h2 className="text-2xl font-bold mb-2">
              Découvrez l'origine de ces élements de jeux!
            </h2>
            <p className="text-xl">{selectedPhrase}</p>
          </div>

          <button
            onClick={() => setShowPrintDialog(true)}
            className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-2 px-6 py-3 bg-white text-purple-900 rounded-full font-bold hover:bg-white/90 transition-colors"
          >
            <Printer className="w-5 h-5" />
            <span>Imprimer les résultats</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {selectedCards.map((cardIndex, position) => (
            <Card
              key={cardIndex}
              card={cards[cardIndex]}
              isSelected={true}
              isFlipped={flippedCards.includes(position)}
              isExpanded={expandedCards.includes(position)}
              onClick={() => {}}
              keyHint={String(cardIndex + 1).padStart(2, '0')}
            />
          ))}
        </div>
      </div>

      {showPrintDialog && <PrintDialog onRestart={onBack} />}
    </div>
  );
}

export default ResultsScreen;
