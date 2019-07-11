import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';
import './../Album.css';


class Album extends Component {
  constructor(props) {
    super(props);

  const album = albumData.find( album => {
    return album.slug === this.props.match.params.slug
  });

  this.state = {
    album: album,
    currentSong: album.songs[0],
    currentTime: 0,
    duration: album.songs[0].duration,
    volume: 0.2,
    isPlaying: false,
    isHovered: false
  };

  this.audioElement = document.createElement('audio');
  this.audioElement.src = album.songs[0].audioSrc;
  this.audioElement.volume = this.state.volume;
}

play() {
  this.audioElement.play();
  this.setState({ isPlaying: true });
}

pause() {
  this.audioElement.pause();
  this.setState({ isPlaying: false });
}

setSong(song) {
  this.audioElement.src = song.audioSrc;
  this.setState({ currentSong: song });
}

handleSongClick(song) {
  const isSameSong = this.state.currentSong === song;
  if (this.state.isPlaying && isSameSong) {
    this.pause();
  } else {
    if (!isSameSong) { this.setSong(song); }
    this.play();
  }
}

hoverOn(song) {
  this.setState ({isHovered: song});
}

hoverOff() {
  this.setState ({isHovered: null});
}

displayIcon (song, i) {
  const isSameSong = this.state.currentSong === song;
    if ((this.state.isHovered === song && !isSameSong) || (!this.state.isPlaying && isSameSong)) {
      return <span className='ion-md-play'></span>
    } else if (this.state.isPlaying && isSameSong) {
      return <span className='ion-md-pause'></span>
    } else {
      return i+ 1;
    }
  }

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.min(this.state.album.songs.length - 1 , currentIndex + 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
   }

  componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

   handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

   handleVolumeChange(e) {
     const newVolume = e.target.value;
     this.audioElement.volume = newVolume;
     this.setState({ volume: newVolume });
   }

   handleVolumeUpClick(e) {
     if(this.state.volume < 1 ) {
       const newVolume = this.state.volume + 0.1;
       this.audioElement.volume = Math.min(newVolume, 1);
       this.setState({ volume: newVolume });
     } else this.setState({ volume: 1 });
   }

   handleVolumeDownClick(e) {
     if(this.state.volume > 0) {
       const newVolume = this.state.volume - 0.1;
       this.audioElement.volume = Math.max(0, newVolume);
       this.setState({ volume: newVolume });
     } else this.setState({ volume: 0 });
   }

   formatTime(timeInSec){
     return timeInSec ? `${Math.floor(timeInSec / 60)}:${Number((timeInSec % 60) / 100).toFixed(2).substr(2, 3)}` : "-:--";
   }
   


  render() {
    return (
      <main>
        <section className="album">
          <section id="album-info">
            <div className="card">
              <img id="album-cover-art" src={this.state.album.albumCover} className="rounded card-img-top" alt={this.state.album.title} />
              <div className="card-body">
                <div className="card-img-overlay"><h1 id="album-title">{this.state.album.title}</h1></div>
                <h2 className="artist">{this.state.album.artist}</h2>
                <div id="release-info">{this.state.album.releaseInfo}</div>
              </div>
            </div>
          </section>

        <div className="song-list-container">
          <table id="song-number-column">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
            {
              this.state.album.songs.map( (song, index) =>
                <tr className="song" key={index}
                  onClick={() => this.handleSongClick(song)}
                  onMouseEnter={() => this.hoverOn(song)}
                  onMouseLeave={() => this.hoverOff()}>
                  <td className="song-actions">
                    <button>
                      {this.displayIcon(song, index)}
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{this.formatTime(song.duration)}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
        </section>
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.audioElement.currentTime}
            duration={this.audioElement.duration}
            volume={this.audioElement.volume}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
            handleVolumeUpClick={(e) => this.handleVolumeUpClick(e)}
            handleVolumeDownClick={(e) => this.handleVolumeDownClick(e)}
            formatTime={ (e) => this.formatTime(e)}
            />
      </main>
    );
  }
}
export default Album;
