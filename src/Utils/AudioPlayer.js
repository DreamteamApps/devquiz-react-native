import Sound from 'react-native-sound';

const players = {};
export const AudioPlayer = () => {
  Sound.setCategory('Playback');

  const play = (audioFile, track = 'background') => {
    console.log('audioLog', audioFile);

    const player = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
      player.play();
      player.setVolume(0.5);
      if (track == 'background') {
        player.setNumberOfLoops(-1);
      }
    });
    players[track] = player;
  };

  const stop = (track = 'background') => {
    players[track].stop();
    players[track].release();
  };

  return {
    play,
    stop,
  };
};
export const AUDIOS = {
  LOBBY: 'lobby.mp3',
  READY: 'click.mp3',
  NEWUSER: 'new_user.mp3',
  COUNTDOWN: 'countdown.mp3',
  WINNER: 'winner.mp3',
  LOOSER: 'looser.mp3',
  ERROR: 'error.mp3',
  SUCCESS: 'success.wav',
};
