// Load all leads
function loadLeads() {
  fetch('http://localhost:5000/api/leads')
    .then(res => res.json())
    .then(leads => {
      const tbody = document.querySelector('#leadsTable tbody');
      tbody.innerHTML = '';
      leads.forEach(lead => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${lead.id}</td>
          <td>${lead.name}</td>
          <td>${lead.email}</td>
          <td>${lead.source}</td>
          <td>${lead.status}</td>
          <td>${lead.notes}</td>
          <td>
            <button onclick="updateLead(${lead.id})">Update</button>
            <button onclick="deleteLead(${lead.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.error(err));
}

// Add new lead
document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const newLead = {
    name: form.name.value,
    email: form.email.value,
    source: form.source.value,
    status: form.status.value,
    notes: form.notes.value
  };
  fetch('http://localhost:5000/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLead)
  })
  .then(res => res.json())
  .then(res => {
    alert(res.message);
    form.reset();
    loadLeads();
  });
});

// Update lead
function updateLead(id) {
  const status = prompt('Enter new status:');
  const notes = prompt('Enter new notes:');
  fetch(`http://localhost:5000/api/leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, notes })
  })
  .then(res => res.json())
  .then(res => { alert(res.message); loadLeads(); });
}

// Delete lead
function deleteLead(id) {
  if (!confirm('Are you sure?')) return;
  fetch(`http://localhost:5000/api/leads/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(res => { alert(res.message); loadLeads(); });
}

// Load leads on page load
loadLeads();