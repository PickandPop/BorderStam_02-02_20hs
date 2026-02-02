import React, { useState } from 'react';
import { TagConfig, TagShape, TagColor, TagPattern, TagSize, CartItem } from '../types.ts';
import { PRICE_MAP, generateTagImageUrl } from '../constants.ts';
import Preview from './components/Preview.tsx';
import Controls from './components/Controls.tsx';
import { ShoppingCart, X, Trash2, CheckCircle, Dog, Cat, PawPrint, Rabbit } from 'lucide-react';

const App: React.FC = () => {
  // State for the Current Configuration
  const [config, setConfig] = useState<TagConfig>({
    shape: TagShape.BONE,
    color: TagColor.PINK,
    pattern: TagPattern.DOTS,
    size: TagSize.M,
    text: '',
  });

  // State for Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = () => {
    if (!config.text.trim()) {
      alert("Por favor escribe el nombre de tu mascota.");
      return;
    }
    const newItem: CartItem = {
      ...config,
      id: Date.now(),
      price: PRICE_MAP[config.size],
    };
    setCart([...cart, newItem]);
    setIsCartOpen(true); // Auto open cart to show confirmation
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50">
      
      {/* --- BACKGROUND DECORATIONS (Aesthetic Pets) --- */}
      <div className="fixed inset-0 pointer-events-none -z-0 overflow-hidden opacity-40">
        {/* Top Left Cat */}
        <div className="absolute top-10 left-[-20px] md:left-10 text-orange-200 transform -rotate-12">
           <Cat size={180} strokeWidth={1.5} />
        </div>
        
        {/* Bottom Right Dog */}
        <div className="absolute bottom-[-20px] right-[-20px] md:bottom-10 md:right-10 text-secondary/10 transform rotate-12">
           <Dog size={220} strokeWidth={1.5} />
        </div>

        {/* Floating Paws */}
        <div className="absolute top-1/4 right-1/4 text-primary/5 animate-pulse">
           <PawPrint size={60} />
        </div>
        <div className="absolute bottom-1/3 left-10 text-secondary/5">
           <PawPrint size={40} transform="rotate(45)" />
        </div>
        <div className="absolute top-20 right-10 text-primary/10">
           <Rabbit size={80} transform="rotate(-15)" />
        </div>
      </div>

      {/* Header / Brand (Mobile) */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 md:static md:hidden">
         <div className="flex items-center space-x-2">
             {/* Logo Mobile */}
             <img src="imagen.png" alt="Border Stamp" className="h-12 w-auto object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
             <span className="font-bold text-xl text-secondary hidden" id="fallback-title-mobile">Border Stamp</span>
         </div>
         <button 
           className="relative p-2 bg-white rounded-full shadow-md text-secondary"
           onClick={() => setIsCartOpen(true)}
         >
           <ShoppingCart size={24} />
           {cart.length > 0 && (
             <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
               {cart.length}
             </span>
           )}
         </button>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-6xl bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl shadow-orange-900/10 overflow-hidden flex flex-col md:flex-row min-h-[750px] relative mt-20 md:mt-0 border border-white z-10">
        
        {/* Left Column: Visualizer */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-gray-50 to-white border-r border-gray-100 flex flex-col relative">
          
          {/* Desktop Header */}
          <div className="hidden md:flex p-8 items-center justify-between w-full absolute top-0 left-0 z-20">
             <div className="flex items-center space-x-3">
               {/* Logo Desktop */}
               <img 
                src="imagen.png" 
                alt="Border Stamp" 
                className="h-16 w-auto object-contain transition-transform hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('fallback-title');
                  if(fallback) fallback.classList.remove('hidden');
                }} 
               />
               <div id="fallback-title" className="hidden">
                 <h1 className="text-2xl font-bold text-secondary tracking-tight">Border Stamp</h1>
                 <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Configurador</p>
               </div>
             </div>
             
             {/* Desktop Cart Button */}
             <button 
               onClick={() => setIsCartOpen(true)}
               className="group flex items-center space-x-2 bg-white px-5 py-2.5 rounded-full shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-200 transition-all text-secondary font-medium"
             >
               <div className="relative group-hover:text-primary transition-colors">
                 <ShoppingCart size={20} />
                 {cart.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                     {cart.length}
                   </span>
                 )}
               </div>
               <span className="group-hover:text-primary transition-colors">Tu Carrito</span>
             </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center pt-20 md:pt-0 relative">
            <Preview config={config} />
          </div>
        </div>

        {/* Right Column: Form Controls */}
        <div className="w-full md:w-7/12 bg-white relative">
           {/* Decorative corner in form */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-bl-full pointer-events-none"></div>
          
          <Controls 
            config={config} 
            onChange={setConfig} 
            onAddToCart={addToCart} 
          />
        </div>

      </div>

      {/* CART MODAL (Slide-over) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Cart Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-orange-50/50">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <div className="bg-primary p-2 rounded-lg text-white">
                  <ShoppingCart size={20} /> 
                </div>
                Tu Pedido
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                  <div className="bg-gray-100 p-6 rounded-full">
                    <Dog size={48} className="text-gray-300" />
                  </div>
                  <p className="font-medium">¡Tu carrito está vacío!</p>
                  <p className="text-sm text-center max-w-[200px]">Diseña una chapita única para tu mejor amigo.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-primary font-bold hover:underline mt-2"
                  >
                    Volver a diseñar
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex bg-white border border-gray-100 rounded-2xl p-4 shadow-sm items-center gap-4 hover:shadow-md transition-shadow">
                    {/* Mini Preview */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-white rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-gray-200">
                       <img 
                         src={generateTagImageUrl(item)} 
                         className="w-full h-full object-contain p-1"
                         onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = `https://placehold.co/100x100?text=${item.shape}`;
                         }}
                         alt="mini preview"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-[8px] font-bold text-secondary bg-white/90 px-2 py-0.5 rounded-full shadow-sm">{item.text}</span>
                       </div>
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-secondary">{item.shape} {item.pattern}</h3>
                      <p className="text-sm text-gray-500">{item.color} - Tamaño {item.size}</p>
                      <p className="text-primary font-bold mt-1">${item.price}</p>
                    </div>

                    {/* Remove */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-600">Total</span>
                  <span className="text-3xl font-bold text-primary">${calculateTotal()}</span>
                </div>
                <button 
                  onClick={() => alert('¡Gracias por tu compra! (Demo)')}
                  className="w-full bg-gradient-to-r from-primary to-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex justify-center items-center gap-2"
                >
                  <CheckCircle size={20} />
                  <span>Finalizar Compra</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
