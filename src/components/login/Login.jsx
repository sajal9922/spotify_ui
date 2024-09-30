import './login.css';

const Login = () => {
  const handleClick = () => {
    const generateRandomString = (length) => {
      let text = '';
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirectUri = 'http://localhost:5173/';
    const scopes = [
      'user-read-private',
      'user-read-email',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-currently-playing',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played',
      'playlist-read-private',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'playlist-modify-public',
    ];
    const state = generateRandomString(16);
    const apiUrl = 'https://accounts.spotify.com/authorize';

    const params = new URLSearchParams({
      response_type: 'token',
      client_id: clientId,
      scope: scopes.join(' '),
      redirect_uri: redirectUri,
      state: state,
      show_dialog: 'true',
    });

    const spotifyAuthUrl = `${apiUrl}?${params.toString()}`;
    window.location.href = spotifyAuthUrl;

    // console.log('Spotify Auth URL:', spotifyAuthUrl);
  };

  return (
    <div className="container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="spotify logo"
      />
      <button onClick={handleClick}>Connect to spotify</button>
    </div>
  );
};

export default Login;
