import { useState, useEffect } from 'react';
import InteractiveTimeline from './InteractiveTimeline';
import MobileTimeline from './MobileTimeline';


function Timeline() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile ? <MobileTimeline /> : <InteractiveTimeline />;
}

export default Timeline;