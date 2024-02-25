import React from 'react';

function Blog() {
  return (
    <div className="blog-container">
      <h2>Welcome to the FitHub Blog!</h2>
      <p>Discover inspiring success stories, insightful articles, and helpful tips to enhance your fitness journey.</p>

      {/* Success Stories */}
      <section className="blog-section">
        <h3>Success Stories</h3>
        <div className="blog-post">
          <img src="success-story1.jpg" alt="Success Story 1" />
          <div className="post-content">
            <h4>From Couch Potato to Marathon Finisher: How John Transformed His Life</h4>
            <p>Read how John went from leading a sedentary lifestyle to completing his first marathon with the help of FitHub.</p>
            <a href="/success-stories/john" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="success-story2.jpg" alt="Success Story 2" />
          <div className="post-content">
            <h4>Overcoming Obstacles: Sarah's Journey to Weight Loss and Self-Confidence</h4>
            <p>Learn how Sarah conquered her weight loss goals and gained self-confidence through consistent workouts and healthy habits.</p>
            <a href="/success-stories/sarah" className="read-more">Read More</a>
          </div>
        </div>
      </section>

      {/* Fitness Articles */}
      <section className="blog-section">
        <h3>Fitness Articles</h3>
        <div className="blog-post">
          <img src="fitness-article1.jpg" alt="Fitness Article 1" />
          <div className="post-content">
            <h4>5 Essential Exercises for Building Muscle Mass</h4>
            <p>Discover the top five exercises recommended by fitness experts for maximizing muscle growth and strength.</p>
            <a href="/articles/building-muscle" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="fitness-article2.jpg" alt="Fitness Article 2" />
          <div className="post-content">
            <h4>The Importance of Nutrition in Achieving Your Fitness Goals</h4>
            <p>Learn how proper nutrition plays a crucial role in fueling your workouts, enhancing recovery, and achieving optimal fitness results.</p>
            <a href="/articles/nutrition-importance" className="read-more">Read More</a>
          </div>
        </div>
      </section>

      {/* Fitness Tips */}
      <section className="blog-section">
        <h3>Fitness Tips</h3>
        <div className="blog-post">
          <img src="fitness-tip1.jpg" alt="Fitness Tip 1" />
          <div className="post-content">
            <h4>Stay Hydrated: The Key to Peak Performance</h4>
            <p>Discover the importance of hydration in maintaining energy levels, optimizing performance, and promoting overall health during workouts.</p>
            <a href="/tips/stay-hydrated" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="fitness-tip2.jpg" alt="Fitness Tip 2" />
          <div className="post-content">
            <h4>Set Realistic Goals: A Guide to Sustainable Progress</h4>
            <p>Learn how to set SMART (Specific, Measurable, Achievable, Relevant, Time-bound) fitness goals to ensure long-term success and motivation.</p>
            <a href="/tips/realistic-goals" className="read-more">Read More</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
