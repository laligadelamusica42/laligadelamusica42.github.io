import React, { useState } from 'react';

const LoadingScreen = ({ loadingState }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className={`loading-screen ${isLoading ? 'show' : 'hidden'}`}>
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
};

export default LoadingScreen;
