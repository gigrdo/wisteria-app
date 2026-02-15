const systemSelect = document.getElementById('system-select');
const symptomSection = document.getElementById('symptom-section');
const checkboxContainer = document.getElementById('checkbox-container');
const submitContainer = document.getElementById('submit-container');
const resultsContainer = document.getElementById('results-container');
const submitButton = document.getElementById('submit-button');



systemSelect.addEventListener('change', () => {
  const selected = systemSelect.value;
  submitContainer.style.display = 'none';
  checkboxContainer.innerHTML = '';
  resultsContainer.innerHTML = '';
  symptomSection.style.display = 'none';
  
if (!selected || selected === 'placeholder') return;

  if (!selected) return;

  // Fetch the system by name
  fetch(`/api/systems/${selected}`)
    .then(res => res.json())
    .then(system => {
      if (system && system.symptoms && system.symptoms.length > 0) {
        symptomSection.style.display = 'block';

        system.symptoms.forEach(symptom => {
          const label = document.createElement('label');
          label.innerHTML = `
            <input type="checkbox" value="${symptom.toLowerCase()}">
            ${symptom}
          `;
          checkboxContainer.appendChild(label);
        });

        const symptomCheckboxes = document.querySelectorAll('input[type="checkbox"]');

        symptomCheckboxes.forEach(cb => {
          cb.addEventListener('change', () => {
            const atLeastOneChecked = Array.from(symptomCheckboxes).some(cb => cb.checked);
            submitContainer.style.display = atLeastOneChecked ? 'block' : 'none';
            resultsContainer.innerHTML = '';
          });
        });
      }
    })
    .catch(err => console.error('Error fetching system symptoms:', err));
});


//fetch herbs

submitButton.addEventListener('click', () => {
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
  const selectedSymptoms = Array.from(checkedBoxes).map(cb => cb.value);

  resultsContainer.innerHTML = '';
  const loadingMessage = document.getElementById('loading-message');
  loadingMessage.style.display = 'block'; // shows loading message

  fetch('/api/herbs')
    .then(res => res.json())
    .then(herbs => {
      // console.log('herb.symptoms in first item:', herbs[0].symptoms); //testing 
      console.log('🔎 herbs response:', herbs); //testing 
      console.log('✅ Array.isArray(herbs):', Array.isArray(herbs)); //testing 

      const matchingHerbs = herbs.filter(herb =>
        herb.symptoms.some(symptom => 
          selectedSymptoms.includes(symptom.trim().toLowerCase())
          )
      );

      loadingMessage.style.display = 'none'; // hides loading message

      if (matchingHerbs.length === 0) {
        resultsContainer.innerHTML = '<p>No herbs found for those symptoms 🌱</p>';
      } else {
        resultsContainer.innerHTML = '<h3>Your herbals:</h3>';
        matchingHerbs.forEach(herb => {
          const div = document.createElement('div');
          div.className = 'herb-card';
          div.innerHTML = `
            <strong>${herb.name}</strong><br>
            <em>${herb.usage}</em>
          `;
          resultsContainer.appendChild(div);
        });
      }
    })


    .catch(err => {
      loadingMessage.style.display = 'none'; // hide if there is error 
      resultsContainer.innerHTML = '<p style="color:red;">Something went wrong. Please try again.</p>';
      console.error('Error loading herbs:', err);
    });
});

//fetch systems 

fetch('/api/systems')
  .then(res => res.json())
  .then(systems => {
    systems.forEach(system => {
      const option = document.createElement('option');
      option.value = system._id;
      option.textContent = system.name;
      systemSelect.appendChild(option);
    });
  })
  .catch(err => console.error('Error loading systems:', err));
