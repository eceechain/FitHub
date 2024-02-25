import React from 'react';

function Blog() {
  return (
    <div className="blog-container">
      <h2>Welcome to the FitHub Blog!</h2>
      <p>FitHub is based in Nairobi, Kenya, and located at Ngong Lane Plaza. It was founded and created by Abdullahi Abass, Jared Amima, Ali Nur, Leroy Kariuki, Isaac Mutiga, and Craig Otieno, who are graduates from Moringa School, a leading tech bootcamp.</p>
      <h3>Latest Posts</h3>
      <div className="blog-post">
        <h4>Post Title 1</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est velit. Suspendisse potenti. Nam vehicula faucibus diam, in fringilla ligula porta et.</p>
        <img src="post1.jpg" alt="Post 1" />
      </div>
      <div className="blog-post">
        <h4>Post Title 2</h4>
        <p>Integer et convallis eros, non ultricies ligula. Nulla facilisi. Suspendisse eget est orci. Fusce vestibulum ultrices sapien, non fringilla libero.</p>
        <img src="post2.jpg" alt="Post 2" />
      </div>
      <div className="blog-post">
        <h4>Post Title 3</h4>
        <p>Vestibulum nec aliquet ligula, id rutrum urna. Nulla facilisi. Morbi rhoncus urna id risus vehicula, ut lacinia ligula posuere.</p>
        <img src="post3.jpg" alt="Post 3" />
      </div>
    </div>
  );
}

export default Blog;
