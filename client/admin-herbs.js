const herbForm = document.getElementById('herb-form');
const herbsContainer = document.getElementById('herbs-container');

// Load existing herbs from DB
function loadHerbs() {
  fetch('/api/herbs')
    .then(res => res.json())
    .then(herbs => {
      herbsContainer.innerHTML = ''; // Clear previous list

      if (herbs.length === 0) {
        herbsContainer.innerHTML = '<p>No herbs added yet.</p>';
        return;
      }

      herbs.forEach(herb => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${herb.name}</strong><br>
          Symptoms: ${herb.symptoms.join(', ')}<br>
          Usage: <em>${herb.usage}</em>
        `;
        herbsContainer.appendChild(li);
      });
    })
    .catch(err => {
      console.error('Error loading herbs:', err);
      herbsContainer.innerHTML = '<p style="color: red;">Error loading herbs</p>';
    });
}

// Submit new herb
herbForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('herb-name').value.trim();
  const symptoms = document.getElementById('herb-symptoms').value.split(',').map(s => s.trim().toLowerCase());
  const usage = document.getElementById('herb-usage').value.trim();

  if (!name || symptoms.length === 0 || !usage) {
    alert('Please fill in all fields.');
    return;
  }

  const newHerb = { name, symptoms, usage };

  fetch('/api/herbs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newHerb)
  })
    .then(res => res.json())
    .then(data => {
      console.log('Herb created:', data);
      herbForm.reset();
      loadHerbs(); // Refresh list
    })
    .catch(err => {
      console.error('Error creating herb:', err);
      alert('Error creating herb.');
    });
});

// Load herbs when admin panel loads
loadHerbs();
