import React from 'react';
import './../Landing.css';

const Landing = () => (

    <div className="landing">
      <div className="jumbotron jumbotron-fluid jumbo-img">
        <div className="container">
          <h1 className="hello-title">Turn the music up!</h1>
        </div>
      </div>
      <div class="row selling-points">
        <div class="col point">
          <span className="fas-icons"><i className="fas fa-music fa-2x"></i></span>
          <h2 className="point-title">Choose your music</h2>
          <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
        </div>
        <div class="col point">
          <span className="fas-icons"><i class="fas fa-check-circle fa-2x"></i></span>
          <h2 className="point-title">Unlimited streaming, ad-free</h2>
          <p className="point-description">No arbitrary limits, No distractions.</p>
        </div>

        <div class="col point">
          <span className="fas-icons"><i class="fas fa-mobile-alt fa-2x"></i></span>
          <h2 className="point-title">Mobile enabled</h2>
          <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
        </div>
      </div>
    </div>
);

export default Landing;
