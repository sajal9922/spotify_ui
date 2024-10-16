import { useEffect, useState } from 'react';
import { BsClockFill } from 'react-icons/bs';

import axios from 'axios';
import useAccessTokenStore from '../../store/accessTokenStore';
import './Body.css';
import playlistStore from '../../store/playlistStore';
const Body = ({ headerBackground }) => {
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const selectedPlaylistId = playlistStore((state) => state.selectedPlaylistId);
  const setSelectedPlaylist = playlistStore(
    (state) => state.setSelectedPlaylist
  );
  const selectedPlaylist = playlistStore((state) => state.selectedPlaylist);
  const [loading, setLoading] = useState(true);
  const setPlayerState = playlistStore((state) => state.setPlayerState);
  const setCurrentlyPlaying = playlistStore(
    (state) => state.setCurrentlyPlaying
  );
  const currentlyPlaying = playlistStore((state) => state.currentlyPlaying);
  useEffect(() => {
    const getPlaylist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const selectedPlaylist = {
          playlistId: response.data.id,
          playlistName: response.data.name,
          playlistDescription: response.data.description.startsWith('<a')
            ? ''
            : response.data.description,
          playlistImage: response.data.images[0].url,
          tracks: response.data.tracks.items.map((item) => ({
            trackId: item.track.id,
            trackName: item.track.name,
            trackArtists: (() => {
              const artists = item.track.artists
                .slice(0, 5)
                .map((artist) => artist.name);
              const moreThanFive = item.track.artists.length > 5;
              return moreThanFive
                ? `${artists.join(', ')}...`
                : artists.join(', ');
            })(),
            trackDuration: item.track.duration_ms,
            image: item.track.album.images[2].url,
            album: item.track.album.name,
            contextUri: item.track.album.uri,
            trackNumber: item.track.track_number,
          })),
        };
        setSelectedPlaylist(selectedPlaylist);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      getPlaylist();
    }
  }, [accessToken, selectedPlaylistId, setSelectedPlaylist]);

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const playTrack = async (
    trackId,
    trackName,
    album,
    trackDuration,
    trackArtists,
    image,
    contextUri,
    trackNumber
  ) => {
    try {
      const response = await axios.put(
        'https://api.spotify.com/v1/me/player/play',
        {
          context_uri: contextUri,
          offset: { position: trackNumber - 1 },
          position_ms: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 204) {
        const track = {
          name: trackName,
          artists: trackArtists,
          image: image,
          duration: trackDuration,
        };
        setCurrentlyPlaying(track);
        setPlayerState(true);
      } else {
        setPlayerState(false);
      }
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="body-container">
      {selectedPlaylist && (
        <>
          <div className="selected-playlist">
            <div className="image">
              <img
                src={selectedPlaylist.playlistImage}
                alt={selectedPlaylist.playlistName}
              />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>

              <h2 className="title">{selectedPlaylist.playlistName}</h2>
              <p className="description">
                {selectedPlaylist.playlistDescription}
              </p>
            </div>
          </div>
          <div className="playlist-tracks">
            <div
              className={`header-row ${headerBackground ? 'scrolling-up' : ''}`}
            >
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <BsClockFill />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    trackId,
                    trackName,
                    album,
                    trackDuration,
                    trackArtists,
                    image,
                    contextUri,
                    trackNumber,
                  },
                  index
                ) => {
                  return (
                    <div
                      key={trackId}
                      className="track-row"
                      onClick={() =>
                        playTrack(
                          trackId,
                          trackName,
                          album,
                          trackDuration,
                          trackArtists,
                          image,
                          contextUri,
                          trackNumber
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>

                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{trackName}</span>
                          <span className="track-artist">{trackArtists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(trackDuration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Body;
