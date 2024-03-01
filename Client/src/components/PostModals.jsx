import React from 'react';

const PostModal = ({ workouts, createPost, closePostsModal }) => {
  return (
    <div className="modal" style={{ width: '30%', minWidth: '450px', minHeight: '300px', height: '50%' }}>
      <div className="modal-header w-100">
        <h3>Create Post+</h3>
      </div>
      <div className="modal-body" style={{ minHeight: '70%' }}>
        <div>
          <h5 className="mt-4">Upload an image:</h5>
          <input className="mb-2" type="file" id="ImageToPost" accept="image/*" aria-label="Choose an Image" />
        </div>
        <div className="form-group">
          <h5>Enter text:</h5>
          <textarea className="form-control mb-2" id="PostText" rows="3" placeholder="What's on your mind?"></textarea>
        </div>
        <div className="form-group">
          <h5>Link a workout:</h5>
          <select className="form-select mb-2" id="PostWorkout" aria-label="Select a workout">
            <option selected>None</option>
            {workouts.map(workout => (
              <option key={workout.uid} value={workout.uid}>{workout.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="modal-footer w-100">
        <button className="btn zoom-btn btn-outline-success" style={{ margin: '3px', zIndex: '1', backgroundColor: '#b0dfba' }} data-mdb-ripple-color="dark" onClick={createPost}>Post+</button>
        <button className="btn zoom-btn btn-outline-secondary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} onClick={closePostsModal}>Cancel</button>
      </div>
    </div>
  );
}

export default PostModal;
