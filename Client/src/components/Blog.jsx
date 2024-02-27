import React from 'react';
import '../styles/Blog.css'

function Blog() {
  return (
    <div className="blog-container">
      <h2>Welcome to the FitHub Blog!</h2>
      <p>Discover inspiring success stories, insightful articles, and helpful tips to enhance your fitness journey.</p>

      {/* Success Stories */}
      <section className="blog-section">
        <h3>Success Stories</h3>
        <div className="blog-post">
          <img src="http://tinyurl.com/m8cf6dww" alt="Success Story 1" />
          <div className="post-content">
            <h4>From Couch Potato to Marathon Finisher: How John Transformed His Life</h4>
            <p>Read how John went from leading a sedentary lifestyle to completing his first marathon with the help of FitHub.</p>
            <a href="https://www.stmarys.ac.uk/student-stories/sir-mo-farah.aspx" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="http://tinyurl.com/3bdkmpsf" alt="Success Story 2" />
          <div className="post-content">
            <h4>Overcoming Obstacles: Sarah's Journey to Weight Loss and Self-Confidence</h4>
            <p>Learn how Sarah conquered her weight loss goals and gained self-confidence through consistent workouts and healthy habits.</p>
            <a href="https://www.livofy.com/health/category/weight-loss-blogs/" className="read-more">Read More</a>
          </div>
        </div>
      </section>

      {/* Fitness Articles */}
      <section className="blog-section">
        <h3>Fitness Articles</h3>
        <div className="blog-post">
          <img src="http://tinyurl.com/jrpvbhjs" alt="Fitness Article 1" />
          <div className="post-content">
            <h4>5 Essential Exercises for Building Muscle Mass</h4>
            <p>Discover the top five exercises recommended by fitness experts for maximizing muscle growth and strength.</p>
            <a href="https://www.trifectanutrition.com/blog/how-to-gain-muscle-mass-the-ultimate-guide" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="http://tinyurl.com/495av3ah" alt="Fitness Article 2" />
          <div className="post-content">
            <h4>The Importance of Nutrition in Achieving Your Fitness Goals</h4>
            <p>Learn how proper nutrition plays a crucial role in fueling your workouts, enhancing recovery, and achieving optimal fitness results.</p>
            <a href="https://strengthsanctuary.com.au/the-importance-of-nutrition-for-achieving-your-fitness-goals/" className="read-more">Read More</a>
          </div>
        </div>
      </section>

      {/* Fitness Tips */}
      <section className="blog-section">
        <h3>Fitness Tips</h3>
        <div className="blog-post">
          <img src="http://tinyurl.com/mr2wstun" alt="Fitness Tip 1" />
          <div className="post-content">
            <h4>Stay Hydrated: The Key to Peak Performance</h4>
            <p>Discover the importance of hydration in maintaining energy levels, optimizing performance, and promoting overall health during workouts.</p>
            <a href="/tips/stay-hydrated" className="read-more">Read More</a>
          </div>
        </div>
        <div className="blog-post">
          <img src="http://tinyurl.com/4eezfk5e" alt="Fitness Tip 2" />
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

<<<<<<< HEAD
export default Blog;
=======
export default Blog;
>>>>>>> 1b176b92d18bdca31ac2c65743d52f5e83ebfdec
