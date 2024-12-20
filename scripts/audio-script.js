const number_buttons = document.querySelectorAll('.misc-buttons');
const ring_sound_effect = new Audio('../Sound-effects/Sonic Ring - Sound Effect (HD).mp3');
ring_sound_effect.volume = 0.1;

number_buttons.forEach(button => {
  button.addEventListener('click', () => {
    ring_sound_effect.play();
  });
});




