# Spotify UI

This project is a Spotify UI clone built with React and Vite. It allows users to connect to their Spotify account, view their playlists, and control playback.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience for modern web projects.
- **Zustand**: A small, fast, and scalable state-management solution.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **React Icons**: A collection of popular icons for React.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- **Spotify Web API**: Used to interact with Spotify's data.

## API Used

- **Spotify Web API**: This API is used to fetch user data, playlists, and control playback. You can find more information about the API [here](https://developer.spotify.com/documentation/web-api/).

## Authentication Workflow

1. **Login**: Users are redirected to Spotify's authorization page to log in.
2. **Authorization**: After logging in, Spotify redirects back to the application with an access token.
3. **Access Token**: The access token is used to make authenticated requests to the Spotify Web API.

## Features

- **User Authentication**: Connect to Spotify and authenticate users.
- **View Playlists**: Display user's playlists.
- **Playback Control**: Play, pause, skip tracks, and control volume.
- **Current Track**: Display the currently playing track.

## Running the Project Locally

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository**:
   ```sh
   git clone https://github.com/sajal9922/spotify_ui.git
   ```
2. **Install dependencies**:
   ```sh
   npm install
   ```
3. **Set up environment variables**: Create a .env file in the root directory and add your Spotify API credentials:
   ```sh
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```
4. **Run the development server**:
   ```sh
   npm run dev
   ```
5. **Open the application**: Open your browser and navigate to http://localhost:5173.
