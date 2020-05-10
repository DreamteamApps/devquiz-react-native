import Sound from 'react-native-sound';
import {getMusicEnabled} from '~/Storage/AppStorage';

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

const AudioPlayer = () => {
  Sound.setCategory('Playback');

  let playerBG;
  let playerUI;

  const play = async (audioFile, track = 'background') => {
    let isMusicEnabled = await getMusicEnabled();
    if (!isMusicEnabled) return;

    console.log('audioLog', audioFile);

    if (track == `background`) {
      playerBG = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) return;

        playerBG.setNumberOfLoops(-1);
        playerBG.setVolume(0.5);
        playerBG.play();
      });
    } else {
      playerUI = new Sound(audioFile, Sound.MAIN_BUNDLE, (error) => {
        if (error) return;

        playerUI.setVolume(0.5);
        playerUI.play(() => {
          playerUI.release();
        });
      });
    }
  };

  const stop = async (track = 'background') => {
    let isMusicEnabled = await getMusicEnabled();
    if (!isMusicEnabled) return;

    const player = track == 'background' ? playerBG : playerUI;
    player.stop();
    player.release();
  };

  const mute = async () => {
    if (playerBG) {
      playerBG.pause(); 
    }
  }

  const resume = () => {
    if(playerBG) {
      playerBG.play();
    }
  }

  return {
    play,
    stop,
    mute,
    resume
  };
};

export default AudioPlayer();
