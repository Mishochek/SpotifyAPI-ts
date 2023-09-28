import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResult/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App(): JSX.Element {
    
      const [searchResults, setSearchResults] = useState<SpotifyApi.TrackObjectFull[]>([]);

      playlistName: 'New Playlist',

      playlistTracks: []
  
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({ playlistTracks: tracks })
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(curTrack => curTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name })
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    });
  }


  render() {
    return( 
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar onSearch = {this.search} />
          <div className="App-playlist">
        <SearchResults 
          searchResults = {this.state.searchResults}
          onAdd = {this.addTrack}/>
        <Playlist 
          playlistName = {this.state.playlistName} 
          playlistTracks = {this.state.playlistTracks} 
          onRemove = {this.removeTrack}
          onNameChange = {this.updatePlaylistName}
          onSave = {this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;