import React, { useState } from 'react';
import { Tweet } from 'react-tweet';

function SocialSharing() {
  const [funFact, setFunFact] = useState('');
  const [trendingText, setTrendingText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [savedNews, setSavedNews] = useState([]);
  const [newsVisible, setNewsVisible] = useState(true);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Shared via Fitness App',
        text: 'Check out this tweet from our fitness app!',
        url: 'https://yourfitnessapp.com',
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Shared via Fitness App!');
    }
  };

  const getRandomFunFact = () => {
    const funFactsList = [
      "Did you know? Regular physical activity can improve your mood and reduce feelings of anxiety and depression.",
      "Stay consistent and remember, every step counts towards your fitness goals!",
      "Exercise releases endorphins, which are natural mood lifters. So get moving and boost your happiness!",
      "Fun fact: The human body has more than 600 muscles! Keep them active and strong with regular exercise.",
      "Exercise not only strengthens your muscles but also helps improve your memory and cognitive function.",
      "Working out with a friend can increase motivation and make exercising more enjoyable. Consider finding a workout buddy!",
      "Laughing for just 15 minutes can burn up to 40 calories! So don't forget to incorporate laughter into your fitness routine.",
      "Did you know? Swimming is one of the most effective full-body workouts, engaging multiple muscle groups simultaneously."
    ];
    const randomIndex = Math.floor(Math.random() * funFactsList.length);
    return funFactsList[randomIndex];
  };

  const handleFunFactClick = () => {
    const fact = getRandomFunFact();
    setFunFact(fact);
  };

  const handleTrendingClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileUrl(URL.createObjectURL(file));
      const text = window.prompt("Enter additional information:");
      setTrendingText(text);
    };
    fileInput.click();
  };

  const handleViewNewsClick = () => {
    if (selectedFile || trendingText) {
      const news = {
        file: selectedFile,
        fileUrl: fileUrl,
        additionalInfo: trendingText,
        likes: 0,
        liked: false  
      };
      setSavedNews([...savedNews, news]);
    }
    setSelectedFile(null);
    setFileUrl('');
    setTrendingText('');
  };

  const handleHideNewsClick = () => {
    setNewsVisible(false);
  };

  const handleShowNewsClick = () => {
    setNewsVisible(true);
  };

  const handleDeleteNews = (index) => {
    const updatedNews = [...savedNews];
    updatedNews.splice(index, 1);
    setSavedNews(updatedNews);
  };

  const handleLikeClick = (index) => {
    const updatedNews = [...savedNews];
    if (updatedNews[index].liked) {
      updatedNews[index].likes--;
    } else {
      updatedNews[index].likes++;
    }
    updatedNews[index].liked = !updatedNews[index].liked;  
    setSavedNews(updatedNews);
  };

  return (
    <div style={{ backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Share Your Fitness Journey!</h2>
      <p style={{ color: '#666', fontSize: '16px', marginBottom: '30px', textAlign: 'center' }}>Spread the inspiration and motivate others by sharing your fitness achievements with the world.</p>
      <div style={{ color: '#666', fontSize: '14px', textAlign: 'center', marginBottom: '10px' }}>Follow us on tweeter by clicking the template below. Feel free to reach out for any help</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Tweet id="1761992807504285856" share={handleShare} />
      </div>
      <p style={{ color: '#666', fontSize: '14px', marginTop: '20px', textAlign: 'center' }}>Don't forget to tag us @FitHub and use #FitnessJourney for a chance to be featured!</p>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }} onClick={handleFunFactClick}>Random Fun Fact</button>
        {funFact && <p style={{ color: '#666', fontSize: '14px' }}>{funFact}</p>}
      </div>
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }} onClick={handleTrendingClick}>What's Trending</button>
        <button style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }} onClick={handleViewNewsClick}>View News</button>
        {newsVisible && (
          <button style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }} onClick={handleHideNewsClick}>Hide News</button>
        )}
        {!newsVisible && (
          <button style={{ background: '#6c757d', color: '#fff', border: 'none', padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }} onClick={handleShowNewsClick}>Show News</button>
        )}
      </div>
      <div style={{ marginTop: '30px', display: newsVisible ? 'flex' : 'none', flexWrap: 'wrap', justifyContent: 'center' }}>
        {savedNews.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', textAlign: 'center' }}>
            {savedNews.map((news, index) => (
              <div key={index} style={{ margin: '10px' }}>
                {news.fileUrl && <img src={news.fileUrl} alt="Selected file" style={{ maxWidth: '100%', height: 'auto' }} />}
                <p>Info: {news.additionalInfo}</p>
                <button onClick={() => handleDeleteNews(index)}>Delete</button>
                <button onClick={() => handleLikeClick(index)}>
                  {news.liked ? 'Unlike' : 'Like'}
                </button>
                <p>Likes: {news.likes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialSharing;
