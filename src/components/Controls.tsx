import React from 'react';
import { TagConfig, TagColor, TagPattern, TagShape, TagSize } from '../../types';
import { COLOR_MAP, COLOR_OPTIONS, PATTERN_OPTIONS, SHAPE_OPTIONS, SIZE_OPTIONS, PRICE_MAP } from '../../constants';
import { Bone, Heart, Circle, ShoppingCart, ArrowRight } from 'lucide-react';

interface ControlsProps {
  config: TagConfig;
  onChange: (newConfig: TagConfig) => void;
  onAddToCart: () => void;
}

const Controls: React.FC<ControlsProps> = ({ config, onChange, onAddToCart }) => {

  const currentPrice = PRICE_MAP[config.size];

  const handleChange = (key: keyof TagConfig, value: string) => {
    onChange({ ...config, [key]: value });
  };

  const getShapeIcon = (shape: TagShape) => {
    switch (shape) {
      case TagShape.BONE: return <Bone size={20} />;
      case TagShape.HEART: return <Heart size={20} />;
      case TagShape.CIRCLE: return <Circle size={20} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 space-y-8 flex-grow overflow-y-auto">
        
        {/* Name Input */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-bold text-secondary mb-2 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs">1</span>
            <span>Nombre de tu mascota</span>
          </label>
          <input
            type="text"
            maxLength={9}
            value={config.text}
            onChange={(e) => handleChange('text', e.target.value)}
            placeholder="Ej: LUNA"
            className="w-full p-4 border-2 border-gray-100 rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium text-secondary bg-gray-50 placeholder-gray-300"
          />
        </div>

        {/* Shape Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-bold text-secondary mb-3 uppercase tracking-wider">
             <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs">2</span>
             <span>Forma</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {SHAPE_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer relative group">
                <input
                  type="radio"
                  name="shape"
                  value={option.value}
                  checked={config.shape === option.value}
                  onChange={(e) => handleChange('shape', e.target.value)}
                  className="peer sr-only"
                />
                <div className="flex flex-col items-center justify-center py-4 px-2 border-2 border-gray-100 rounded-2xl bg-white peer-checked:border-primary peer-checked:bg-orange-50/50 transition-all hover:border-orange-200 hover:shadow-md hover:-translate-y-0.5">
                  <div className={`mb-2 transition-colors ${config.shape === option.value ? 'text-primary' : 'text-gray-300 group-hover:text-primary/60'}`}>
                     {getShapeIcon(option.value)}
                  </div>
                  <span className={`text-sm font-bold ${config.shape === option.value ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Base Color Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-bold text-secondary mb-3 uppercase tracking-wider">
             <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs">3</span>
             <span>Color Base</span>
          </label>
          <div className="flex space-x-4">
            {COLOR_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer group relative">
                <input
                  type="radio"
                  name="color"
                  value={option.value}
                  checked={config.color === option.value}
                  onChange={(e) => handleChange('color', e.target.value)}
                  className="peer sr-only"
                />
                <div 
                  className="w-14 h-14 rounded-full shadow-sm border-4 border-white ring-2 ring-transparent peer-checked:scale-110 peer-checked:shadow-lg peer-checked:ring-primary transition-all duration-200 flex items-center justify-center"
                  style={{ 
                    backgroundColor: COLOR_MAP[option.value],
                  }}
                >
                   {option.value === TagColor.WHITE && (
                     <div className="w-full h-full rounded-full border border-gray-200" />
                   )}
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Pattern Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-bold text-secondary mb-3 uppercase tracking-wider">
             <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs">4</span>
             <span>Diseño</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PATTERN_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="pattern"
                  value={option.value}
                  checked={config.pattern === option.value}
                  onChange={(e) => handleChange('pattern', e.target.value)}
                  className="peer sr-only"
                />
                <span className="inline-block px-6 py-2.5 rounded-full text-sm font-bold border-2 border-gray-100 text-gray-400 bg-white peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition-all hover:border-orange-200 hover:text-orange-500 hover:bg-orange-50 peer-checked:hover:bg-primary peer-checked:hover:text-white">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-bold text-secondary mb-3 uppercase tracking-wider">
             <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center text-xs">5</span>
             <span>Tamaño</span>
          </label>
          <div className="inline-flex bg-gray-100 p-1.5 rounded-2xl w-full">
            {SIZE_OPTIONS.map((option) => (
              <label key={option.value} className="cursor-pointer flex-1">
                <input
                  type="radio"
                  name="size"
                  value={option.value}
                  checked={config.size === option.value}
                  onChange={(e) => handleChange('size', e.target.value)}
                  className="peer sr-only"
                />
                <div className="flex flex-col items-center py-3 rounded-xl text-gray-400 peer-checked:bg-white peer-checked:text-secondary peer-checked:shadow-md transition-all">
                  <span className="text-sm font-bold">{option.label}</span>
                  <span className="text-[10px] font-bold text-primary bg-orange-50 px-2 rounded-full mt-1">${PRICE_MAP[option.value]}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Footer / Add to Cart Action */}
      <div className="p-6 bg-white border-t border-gray-100 mt-auto shadow-[0_-5px_20px_rgba(0,0,0,0.02)] relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-400 font-bold text-sm uppercase">Precio Total</span>
          <span className="text-4xl font-black text-secondary tracking-tight">${currentPrice}</span>
        </div>
        <button 
          onClick={onAddToCart}
          className="w-full bg-secondary hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-secondary/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group"
        >
          <ShoppingCart size={22} className="group-hover:animate-bounce" />
          <span className="text-lg">Agregar al Carrito</span>
          <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default Controls;
