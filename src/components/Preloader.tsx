import React, { useState, useEffect } from 'react';
import './Preloader.css';

export const Preloader: React.FC = () => {
  const [isWiped, setIsWiped] = useState(false);

  useEffect(() => {
    // The animation takes about 1.7s total (1.15s delay + 0.55s subtitle).
    // Let's add the wipe class after 2.5 seconds to reveal the site smoothly.
    const timer = setTimeout(() => {
      setIsWiped(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`stark-preloader ${isWiped ? 'is-wipe' : ''}`} role="status" aria-live="polite" aria-busy={!isWiped} aria-label="Loading">
      <div className="stark-preloader__wrap">
        <div className="stark-preloader__mark">
          <img src="/drishak-logo.png" alt="DRISHAK" className="stark-preloader__logo" />
        </div>
      </div>
    </div>
  );
};
