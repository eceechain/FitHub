import React from 'react';
import { Tweet } from 'react-tweet';

function SocialSharing() {
  const handleShare = () => {
    // Implement your custom sharing logic here
    // For example, you can use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: 'Shared via Fitness App',
        text: 'Check out this tweet from our fitness app!',
        url: 'https://yourfitnessapp.com',
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that do not support Web Share API
      // For example, you can open a modal or display a toast message
      alert('Shared via Fitness App!'); // Just an example, you can customize this logic
    }
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Share Your Fitness Journey!</h2>
      <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px', textAlign: 'center' }}>Spread the inspiration and motivate others by sharing your fitness achievements with the world.</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tweet id="1761992807504285856" share={handleShare} />
      </div>
      <p style={{ color: '#666', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>Don't forget to tag us @YourFitnessApp and use #FitnessJourney for a chance to be featured!</p>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <p style={{ color: '#666', fontSize: '14px' }}>Did you know? Regular physical activity can improve your mood and reduce feelings of anxiety and depression.</p>
        <p style={{ color: '#666', fontSize: '14px' }}>Stay consistent and remember, every step counts towards your fitness goals!</p>
      </div>
    </div>
  );
}

export default SocialSharing;
