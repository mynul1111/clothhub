import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const BottomNavbar = () => {

  const location = useLocation();
  const { setShowSearch } = useContext(ShopContext);

  const handleScrollIfSamePath = (targetPath) => {
    if (location.pathname === targetPath) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // WhatsApp draggable state
  const [position, setPosition] = useState({
    x: window.innerWidth - 80,
    y: window.innerHeight - 140
  });

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const iconSize = 60;

  // Start drag
  const startDrag = (clientX, clientY) => {
    setDragging(true);
    setOffset({
      x: clientX - position.x,
      y: clientY - position.y
    });
  };

  const handleMouseDown = (e) => {
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  };

  // Move
  const moveDrag = (clientX, clientY) => {

    if (!dragging) return;

    let newX = clientX - offset.x;
    let newY = clientY - offset.y;

    const maxX = window.innerWidth - iconSize;
    const maxY = window.innerHeight - iconSize;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    setPosition({
      x: newX,
      y: newY
    });
  };

  const handleMouseMove = (e) => moveDrag(e.clientX, e.clientY);

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    moveDrag(touch.clientX, touch.clientY);
  };

  const stopDrag = () => setDragging(false);

  return (
    <>

      {/* Bottom Navbar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 z-50 shadow-inner sm:hidden">

        <div className="flex justify-between px-4 py-2 text-sm text-gray-600">

          <Link
            to="/"
            className="flex flex-col items-center"
            onClick={() => handleScrollIfSamePath('/')}
          >
            <span style={{ fontSize: '22px' }}>🏠</span>
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/collection"
            className="flex flex-col items-center"
            onClick={() => {
              setShowSearch(true)
              handleScrollIfSamePath('/collection')
            }}
          >
            <span style={{ fontSize: '22px' }}>🔍</span>
            <span className="text-xs mt-1">Search</span>
          </Link>

          <Link
            to="/cart"
            className="flex flex-col items-center"
            onClick={() => handleScrollIfSamePath('/cart')}
          >
            <span style={{ fontSize: '22px' }}>🛒</span>
            <span className="text-xs mt-1">Cart</span>
          </Link>

          <Link
            to="/orders"
            className="flex flex-col items-center"
            onClick={() => handleScrollIfSamePath('/orders')}
          >
            <span style={{ fontSize: '22px' }}>📦</span>
            <span className="text-xs mt-1">My Orders</span>
          </Link>

        </div>

      </div>

      {/* WhatsApp Draggable Icon */}
      <a
        href="https://wa.me/8801325796178"
        target="_blank"
        rel="noopener noreferrer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={stopDrag}
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: iconSize,
          height: iconSize,
          borderRadius: '50%',
          backgroundColor: '#25D366',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '28px',
          color: 'white',
          zIndex: 9999,
          cursor: 'grab',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        📱
      </a>

    </>
  );
};

export default BottomNavbar;
