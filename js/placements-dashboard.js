/* ===========================
   Placements & Alumni Dashboard
   =========================== */

// ---- Data (from your brief) ----
const PLACEMENT_DATA = [
  { batch: "2016-20", placed: 94,   percent: 98.0,  highest: 65,  average: 10.19 },
  { batch: "2017-21", placed: 161,  percent: 99.4,  highest: 64,  average: 10.77 },
  { batch: "2018-22", placed: 187,  percent: 100.0, highest: 117, average: 14.38 },
  { batch: "2019-23", placed: 117,  percent: 100.0, highest: 102, average: 16.46 },
  { batch: "2020-24", placed: 105,  percent: 100.0, highest: 88,  average: 14.18 },
];

// Minimal sample alumni (extend freely)
const ALUMNI = [
  // batch, name, company, role, country, city, lat, lng
  ["2018-22","A. Karthik","Google","SWE","USA","Mountain View",37.4220,-122.0841],
  ["2019-23","P. Meera","Amazon","SDE","USA","Seattle",47.6062,-122.3321],
  ["2020-24","R. Dev","PayPal","Analyst","India","Chennai",13.0827,80.2707],
  ["2019-23","S. Nila","Adobe","ML Eng","India","Bengaluru",12.9716,77.5946],
  ["2017-21","V. Sanjay","eBay","SWE","Ireland","Dublin",53.3498,-6.2603],
  ["2016-20","M. Iqbal","Media.net","SWE","United Arab Emirates","Dubai",25.2048,55.2708],
  ["2018-22","K. Aadhira","Equinix","Cloud Eng","Singapore","Singapore",1.3521,103.8198],
  ["2020-24","T. Shruthi","Avalara","Data Eng","India","Hyderabad",17.3850,78.4867],
  ["2019-23","R. Kavin","MotorQ","Full-Stack","USA","San Francisco",37.7749,-122.4194],
];

// ---- Utilities ----
const $ = (sel) => document.querySelector(sel);
const root = document.documentElement;

// Fill KPIs (latest batch)
function fillKPIs() {
  const latest = PLACEMENT_DATA[PLACEMENT_DATA.length - 1];
  $("#kpiBatch").textContent   = latest.batch;
  $("#kpiPlaced").textContent  = latest.placed;
  $("#kpiPercent").textContent = `${latest.percent}%`;
  $("#kpiSalary").textContent  = `${latest.highest} / ${latest.average}`;
}

// Populate filter dropdowns
function populateFilters() {
  const yearSel = $("#filterYear");
  const compSel = $("#filterCompany");
  const countrySel = $("#filterCountry");

  // Years
  yearSel.innerHTML = `<option value="">All Years</option>` +
    PLACEMENT_DATA.map(d => `<option value="${d.batch}">${d.batch}</option>`).join("");

  // Companies, Countries (from ALUMNI)
  const companies = [...new Set(ALUMNI.map(a => a[2]))].sort();
  compSel.innerHTML = `<option value="">All Companies</option>` +
    companies.map(c => `<option value="${c}">${c}</option>`).join("");

  const countries = [...new Set(ALUMNI.map(a => a[4]))].sort();
  countrySel.innerHTML = `<option value="">All Countries</option>` +
    countries.map(c => `<option value="${c}">${c}</option>`).join("");
}

// ---- Charts ----
let chartPct, chartSalary;
function makeCharts() {
  // Fonts/colors from CSS variables
  const textColor = getComputedStyle(document.body).getPropertyValue('color').trim();

  const labels = PLACEMENT_DATA.map(d => d.batch);
  const pct = PLACEMENT_DATA.map(d => d.percent);
  const highest = PLACEMENT_DATA.map(d => d.highest);
  const avg = PLACEMENT_DATA.map(d => d.average);

  const ctxPct = document.getElementById('chartPlacementPct').getContext('2d');
  chartPct = new Chart(ctxPct, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '% Placed',
        data: pct,
        tension: 0.35,
        pointRadius: 4,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,0.08)' } },
        y: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,0.08)' }, suggestedMin: 90, suggestedMax: 102 }
      }
    }
  });

  const ctxSal = document.getElementById('chartSalaries').getContext('2d');
  chartSalary = new Chart(ctxSal, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Highest (LPA)', data: highest, borderWidth: 1 },
        { label: 'Average (LPA)', data: avg, borderWidth: 1 }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: textColor } } },
      scales: {
        x: { ticks: { color: textColor }, grid: { display: false } },
        y: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,0.08)' } }
      }
    }
  });
}

// If theme toggles, refresh chart label colors (simple approach)
function attachThemeObserver() {
  const observer = new MutationObserver(() => {
    [chartPct, chartSalary].forEach(chart => {
      if (!chart) return;
      const textColor = getComputedStyle(document.body).getPropertyValue('color').trim();
      chart.options.plugins.legend.labels.color = textColor;
      chart.options.scales.x.ticks.color = textColor;
      chart.options.scales.y.ticks.color = textColor;
      chart.update();
    });
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}

// ---- Leaflet Map ----
let map, markers = [];
function initMap() {
  map = L.map('alumniMap', { scrollWheelZoom: false }).setView([20.5937, 78.9629], 3); // Center on India
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  renderAlumniPins();
}

// Clear & re-add markers based on filters
function renderAlumniPins() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const year = $("#filterYear").value;
  const company = $("#filterCompany").value;
  const country = $("#filterCountry").value;

  const filtered = ALUMNI.filter(a => {
    const [aYear, , aCompany, , aCountry] = [a[0], a[2], a[4]];
    return (!year || aYear === year) &&
           (!company || aCompany === company) &&
           (!country || aCountry === country);
  });

  filtered.forEach(a => {
    const [aYear, aName, aCompany, aRole, aCountry, aCity, lat, lng] = a;
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(
      `<strong>${aName}</strong><br/>
       ${aRole} @ ${aCompany}<br/>
       ${aCity}, ${aCountry}<br/>
       <span class="small muted">Batch: ${aYear}</span>`
    );
    markers.push(marker);
  });

  // Fit bounds if pins exist
  if (markers.length) {
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  } else {
    map.setView([20.5937, 78.9629], 3);
  }
}

// ---- Events ----
document.addEventListener('DOMContentLoaded', () => {
  fillKPIs();
  populateFilters();
  makeCharts();
  attachThemeObserver();
  initMap();

  // Filter events
  ["filterYear","filterCompany","filterCountry"].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      renderAlumniPins();
    });
  });
});
