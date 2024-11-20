import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

function Card({
  card,
  isSelected,
  onRemove,
  onClick,
  keyHint,
  isFlipped = false,
  isExpanded = false,
  className = '',
}) {
  return (
    <div
      className={`relative transition-all duration-700 transform-gpu ${
        isExpanded ? 'h-[600px]' : 'aspect-[4/5]'
      } ${isFlipped ? 'rotate-y-180' : ''} ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
    >
      {/* Front of card */}
      <div
        className={`absolute inset-0 w-full h-full rounded-xl overflow-hidden ${
          isSelected
            ? 'bg-white text-purple-900'
            : 'bg-white/10 backdrop-blur-sm text-white'
        } backface-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-current/10">
            <h3 className="font-bold text-2xl text-center">{card.mainTitle}</h3>
          </div>

          <div className="flex-1 relative">
            <img
              src={card.mainImage}
              alt={card.mainTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Barcode hint */}
        <div className="absolute top-2 left-2 text-sm font-mono opacity-50">
          Barcode {keyHint}
        </div>

        {/* Remove button */}
        {isSelected && !isFlipped && (
          <button
            className="absolute top-2 right-2 p-1 hover:bg-purple-100 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Back of card */}
      <div className="absolute inset-0 w-full h-full bg-white text-purple-900 rounded-xl overflow-hidden rotate-y-180 backface-hidden">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-purple-900/10">
            <h3 className="font-bold text-2xl text-center">{card.altTitle}</h3>
          </div>

          <div className="relative h-64">
            <img
              src={card.altImage}
              alt={card.altTitle}
              className="w-full h-full object-cover"
            />
          </div>

          {isExpanded && (
            <div className="flex-1 p-6 overflow-y-auto bg-purple-50">
              <p className="text-lg leading-relaxed">{card.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
