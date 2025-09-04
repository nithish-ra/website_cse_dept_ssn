const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function setError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg || '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  setError('err-name', '');
  setError('err-email', '');
  setError('err-subject', '');
  setError('err-message', '');
  statusEl.textContent = '';

  if (!name) { setError('err-name', 'Name is required.'); valid = false; }
  if (!email) { setError('err-email', 'Email is required.'); valid = false; }
  else if (!validateEmail(email)) { setError('err-email', 'Enter a valid email.'); valid = false; }
  if (!subject) { setError('err-subject', 'Subject is required.'); valid = false; }
  if (!message || message.length < 10) { setError('err-message', 'Message must be at least 10 characters.'); valid = false; }

  if (valid) {
    statusEl.textContent = 'Thanks! Your message has been “submitted” (demo only).';
    form.reset();
  }
});
