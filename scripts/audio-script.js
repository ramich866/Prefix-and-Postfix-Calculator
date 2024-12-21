// Audio
const ring_sfx = new Audio('./Sound-effects/Sonic Ring - Sound Effect (HD).mp3');
ring_sfx.volume = 0.1;

const can_open_sfx = new Audio('./Sound-effects/can-opening-fizzy-drink-soda-pop-high-quality-96655.mp3');
can_open_sfx.volume = 0.1;

// Buttons
const misc_buttons = document.querySelectorAll('.misc-buttons');
const equal_button = document.getElementById('equal');

// Event Listeners
misc_buttons.forEach(button => {
  button.addEventListener('click', () => {
    ring_sfx.play();
  });
});

equal_button.addEventListener('click', () => {
  can_open_sfx.play();
});






