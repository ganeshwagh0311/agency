import React, { useState, useEffect } from 'react';
import './Preloader.css';

export const Preloader: React.FC = () => {
  const [isWiped, setIsWiped] = useState(false);

  useEffect(() => {
    // Increased delay for the slower animation.
    const timer = setTimeout(() => {
      setIsWiped(true);
      if (typeof window !== 'undefined') {
        (window as any).preloaderDone = true;
        window.dispatchEvent(new CustomEvent('preloaderWiped'));
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`stark-preloader ${isWiped ? 'is-wipe' : ''}`} role="status" aria-live="polite" aria-busy={!isWiped} aria-label="Loading">
      <div className="stark-preloader__wrap">
        <div className="stark-preloader__mark">
          <img src="/drishak-logo.png" alt="DRISHAK" className="stark-preloader__logo" />
        </div>
        <p className="stark-preloader__sub">THE FUTURE OF SOCIAL MEDIA</p>
      </div>
    </div>
  );
};
