// Mock faculty data — replace with your real data as needed
const FACULTY = [
  { 
    name: 'Dr. T.T. Mirnalinee', 
    designation: 'Professor & Head of Department', 
    expertise: ['Computer Vision', 'SDN', 'Deep Learning'] 
  },
  { 
    name: 'R. Sagaya Milton', 
    designation: 'Professor', 
    expertise: ['Machine Learning', 'Natural Language Processing', 'Reinforcement Learning'] 
  },
  { 
    name: 'Dr. P. Mirunalini', 
    designation: 'Associate Professor', 
    expertise: ['Medical Image Processing and Analysis', 'Image Reconstruction', 'Machine Learning', 'Deep Learning', 'Pattern Recognition'] 
  },
  {
    name: 'Dr. V. S. Felix Enigo',
    designation: 'Associate Professor',
    expertise: ["Computer Networks", "Medical Image Processing","IoT", "Artificial Intelligence"]
  },
  { 
    name: 'Mr. Sakali Raghavendra Kumar', 
    designation: 'Assistant Professor', 
    expertise: ['Bio-inspired Electronics', 'Reconfigurable Computing', 'Fault-Tolerant Data Path Elements', 'System Design'] 
  },
  { 
    name: 'Dr. Poreddy Ajay Kumar Reddy', 
    designation: 'Assistant Professor', 
    expertise: ['Multimedia Quality Assessment', 'Machine Learning'] 
  },
  { 
    name: 'Mrs. Vijaya Lakshmi', 
    designation: 'Assistant Professor', 
    expertise: ['Meta-Heuristic Algorithms', 'Intelligent Transportation System', 'Cryptography', 'Machine Learning'] 
  }
];


const listEl = document.getElementById('faculty-list');
const searchEl = document.getElementById('search');
const expertiseEl = document.getElementById('expertise');

function renderList(data) {
  listEl.innerHTML = '';
  if (!data.length) {
    const empty = document.createElement('p');
    empty.textContent = 'No faculty match your filters.';
    empty.className = 'muted';
    listEl.appendChild(empty);
    return;
  }
  data.forEach((f) => {
    const card = document.createElement('article');
    card.className = 'card faculty-card';
    card.innerHTML = `
      <img src="images/faculty-avatar.svg" alt="Profile photo placeholder" />
      <div>
        <h3 class="title">${f.name}</h3>
        <p class="muted">${f.designation}</p>
        <div>${f.expertise.map(e => `<span class="badge">${e}</span>`).join(' ')}</div>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function normalize(s) { return s.toLowerCase(); }

function applyFilters() {
  const q = normalize(searchEl.value || '');
  const ex = expertiseEl.value;
  const filtered = FACULTY.filter(f => {
    const inText = [f.name, f.designation, ...(f.expertise || [])]
      .some(v => normalize(String(v)).includes(q));
    const exOk = !ex || (f.expertise || []).includes(ex);
    return inText && exOk;
  });
  renderList(filtered);
}

searchEl.addEventListener('input', applyFilters);
expertiseEl.addEventListener('change', applyFilters);

// Initial render
renderList(FACULTY);
