import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <div className="player-bar container-fluid">
        <div className="row">
          <div id="control-buttons" className="col-sm-4">
            <button id="previous" onClick={this.props.handlePrevClick}>
              <span className="ion-md-skip-backward"></span>
            </button>
            <button id="play-pause" onClick={this.props.handleSongClick} >
              <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
            </button>
            <button id="next" onClick={this.props.handleNextClick}>
              <span className="ion-md-skip-forward"></span>
            </button>
          </div>
          <div id="time-control" className="col-sm-4">  
            <input
              type="range"
              className="seek-bar"
              value={(this.props.currentTime / this.props.duration || 0)}
              max="1"
              min="0"
              step="0.01"
              onChange={this.props.handleTimeChange}
            />
            <div className="current-time">
              {this.props.formatTime(this.props.currentTime)} / {this.props.formatTime(this.props.duration)}</div>
            </div>
          <div id="volume-control" className="col-sm-4">
            <span className="ion-md-volume-low" onClick={this.props.handleVolumeDownClick} />
              <input
                type="range"
                className="seek-bar"
                value={this.props.volume}
                max="1"
                min="0"
                step="0.1"
                onChange={this.props.handleVolumeChange}
              />
            <span className="ion-md-volume-high" onClick={this.props.handleVolumeUpClick} />
          </div>
        </div>
      </div>
    );
  }
}

 export default PlayerBar;
