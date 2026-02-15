// client/admin.js
const form = document.getElementById('system-form');
const message = document.getElementById('admin-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('system-name').value.trim();
  const symptomsInput = document.getElementById('symptoms').value.trim();
  const symptoms = symptomsInput.split(',').map(s => s.trim().toLowerCase());

  try {
    const res = await fetch('/api/systems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, symptoms })
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = `✅ ${data.message}`;
      form.reset();
    } else {
      message.textContent = `❌ ${data.error || 'Error adding system'}`;
    }
  } catch (err) {
    message.textContent = '❌ Network error';
    console.error(err);
  }
});
