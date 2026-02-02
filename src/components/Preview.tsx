import React, { useState, useEffect } from 'react';
import { TagConfig } from '../../types';
import { SCALE_MAP, generateTagImageUrl } from '../../constants';

interface PreviewProps {
  config: TagConfig;
}

const Preview: React.FC<PreviewProps> = ({ config }) => {
  const [error, setError] = useState(false);

  // La URL de la imagen SIEMPRE se deriva del config
  const imgSrc = generateTagImageUrl(config);

  // Si cambia la config, reseteamos el error
  useEffect(() => {
    setError(false);
  }, [imgSrc]);

  const getPlaceholderUrl = (): string => {
    const text = `${config.shape}\n${config.color}`;
    return `https://placehold.co/400x400/E2E8F0/2C3E50?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 min-h-[400px] relative z-0">

      {/* Fondo decorativo */}
      <div className="absolute inset-0 flex items-center justify-center -z-10">
        <div className="w-80 h-80 bg-gradient-to-tr from-blue-100 to-orange-100 rounded-full opacity-70 blur-3xl animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-white rounded-full opacity-40 blur-2xl"></div>
      </div>

      {/* Contenedor visual */}
      <div
        className="relative transition-transform duration-300 ease-spring"
        style={{ transform: `scale(${SCALE_MAP[config.size]})` }}
      >
        {/* Sombra */}
        <div className="absolute inset-0 rounded-full shadow-2xl opacity-20 transform translate-y-6 scale-90 blur-md bg-secondary -z-10"></div>

        {/* Imagen */}
        <img
          src={error ? getPlaceholderUrl() : imgSrc}
          alt={`${config.shape} ${config.color}`}
          className="max-w-[300px] w-full h-auto object-contain drop-shadow-xl transition-all duration-300 relative z-10"
          onError={() => setError(true)}
        />

        {/* Texto */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <span
            className="font-rounded font-bold text-secondary text-2xl tracking-wide break-words text-center px-8"
            style={{
              textShadow: '2px 2px 0px rgba(255,255,255,0.9)',
              maxWidth: '80%',
            }}
          >
            {config.text || 'NOMBRE'}
          </span>
        </div>
      </div>

      {error && (
        <p className="absolute bottom-4 text-xs text-red-400 text-center max-w-xs bg-white/80 px-2 py-1 rounded border border-red-100 shadow-sm">
          No se encontró: <span className="font-mono font-bold">{imgSrc}</span>
        </p>
      )}
    </div>
  );
};

export default Preview;
