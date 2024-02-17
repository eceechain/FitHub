import React from 'react';
import './Blog.css';

function Blog() {
  return (
    <div className="blog-container">
      <h1>Explore Our Fitness Blog</h1>
      <div className="blog-post">
        <img src="http://tinyurl.com/2h8ew3du" alt="Featured Image 1" className="featured-image" />
        <div className="blog-content">
          <h2>Unlocking the Secrets of High-Intensity Interval Training (HIIT)</h2>
          <p>
            High-Intensity Interval Training (HIIT) has been making waves in the fitness community for its efficiency
            and effectiveness. In this article, we delve into the science behind HIIT and explore its benefits,
            different protocols, and how you can incorporate it into your fitness routine.
          </p>
          <a href="/blog/hiit">Read more</a>
        </div>
      </div>
      <div className="blog-post">
        <img src="http://tinyurl.com/4x3ezxux" alt="Featured Image 2" className="featured-image" />
        <div className="blog-content">
          <h2>Healthy Eating Habits: A Guide to Balanced Nutrition</h2>
          <p>
            Nutrition plays a crucial role in achieving your fitness goals. Learn about the principles of balanced
            nutrition, how to make healthier food choices, and tips for meal planning to support your active lifestyle.
          </p>
          <a href="/blog/nutrition">Read more</a>
        </div>
      </div>
      <div className="blog-post">
        <img src="http://tinyurl.com/3bnsc9e2" alt="Featured Image 3" className="featured-image" />
        <div className="blog-content">
          <h2>Mindfulness and Exercise: Cultivating Mental Wellness</h2>
          <p>
            Exercise not only benefits your physical health but also your mental well-being. Discover the connection
            between mindfulness and exercise, techniques for staying present during workouts, and how to use exercise
            as a tool for stress relief and relaxation.
          </p>
          <a href="/blog/mindfulness">Read more</a>
        </div>
      </div>
      {/* Add more blog posts here */}
    </div>
  );
}

export default Blog;
