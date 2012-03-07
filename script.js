var text = $('span#text');
var shift = false;
var caps_lock = false;

function start_shift() {
	shift = true;
	$('button.shift').addClass('active');
}

function stop_shift() {
	shift = false;
	$('button.shift').removeClass('active');
}

function start_caps_lock() {
	caps_lock = true;
	$('button.caps-lock').addClass('active');
}

function stop_caps_lock() {
	caps_lock = false;
	$('button.caps-lock').removeClass('active');
}

function cursorAnimation()
{
  $("span#cursor").animate(
  {
    opacity: 0
  }, "fast", "swing").animate(
  {
    opacity: 1
  }, "fast", "swing");
}

setInterval ( "cursorAnimation()", 750 );

$('#keys').on('click', 'button', function() {
	$this = $(this);

	// Standard key
	if ($this.data('key-value') != undefined) {
		add_character = $this.data('key-value');

		// No capitalization
		if (!shift && !caps_lock) {
			add_character = add_character;
		}

		// Capitalize and use secondary value
		if (shift && !caps_lock) {
			if ($this.data('secondary-value')) {
				add_character = $this.data('secondary-value');
			} else {
				add_character = add_character.toUpperCase();
			}
		}

		// Capitalize but don't use secondary value
		if (!shift && caps_lock) {
			if ($this.data('secondary-value')) {
				add_character = add_character;
			} else {
				add_character = add_character.toUpperCase();
			}
		}

		// Lowercase but use secondary value
		if (shift && caps_lock) {
			if ($this.data('secondary-value')) {
				add_character = $this.data('secondary-value');
			} else {
				add_character = add_character;
			}
		}

		if (shift) stop_shift();
		text.text(text.text() + add_character);

	// Shift key
	} else if ($this.hasClass('shift')) {
		if (shift) {
			stop_shift()
		} else {
			start_shift()
		}

	// Caps lock
	} else if ($this.hasClass('caps-lock')) {
		if (caps_lock) {
			stop_caps_lock();
		} else {
			start_caps_lock();
		}

	// delete
	} else if ($this.hasClass('delete')) {
		text.text(text.text().substring(0, text.text().length-1));
	}
});