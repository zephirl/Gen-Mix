import React, { useState } from 'react';
import Roulette from './components/Roulette';
import CardSelection from './components/CardSelection';
import ResultsScreen from './components/ResultsScreen';
import { phrases } from './data/phrases';

function App() {
  const [currentView, setCurrentView] = useState('roulette');
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);

  const backgrounds = {
    roulette: `bg-[url('https://i.postimg.cc/7h3Cjpft/genmix-fond1.png')] bg-cover bg-center`,
    cards: `bg-[url('https://i.postimg.cc/90Q5j9M3/2.png')] bg-cover bg-center`,
    results: `bg-[url('https://i.postimg.cc/ZnskYqBW/3.png')] bg-cover bg-center`,
  };

  return (
    <div className={`min-h-screen ${backgrounds[currentView]} text-white`}>
      <div className="min-h-screen bg p-8">
        <div className="max-w-[1280px] mx-auto" style={{ height: '720px' }}>
          {currentView === 'roulette' ? (
            <Roulette
              phrases={phrases}
              onPhraseSelected={(phrase) => {
                setSelectedPhrase(phrase);
                setCurrentView('cards');
              }}
            />
          ) : currentView === 'cards' ? (
            <CardSelection
              selectedPhrase={selectedPhrase || ''}
              onBack={() => setCurrentView('roulette')}
              onConfirm={(cards) => {
                setSelectedCards(cards);
                setCurrentView('results');
              }}
            />
          ) : (
            <ResultsScreen
              selectedPhrase={selectedPhrase || ''}
              selectedCards={selectedCards}
              onBack={() => setCurrentView('cards')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
