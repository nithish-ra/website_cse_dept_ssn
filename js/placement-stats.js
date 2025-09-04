// Simple Canvas-based bar chart (vanilla JS) for placement stats
(function () {
  const canvas = document.getElementById('placementChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  // Sample data — replace with real stats
  const labels = ['2021', '2022', '2023', '2024', '2025'];
  const placed = [180, 195, 210, 230, 240];
  const offers = [220, 250, 270, 300, 320];

  const width = canvas.width;
  const height = canvas.height;
  const padding = 50;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Axes
  ctx.strokeStyle = '#2a355b';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  const maxVal = Math.max(...placed, ...offers);
  const barGroupWidth = chartWidth / labels.length;
  const barWidth = barGroupWidth / 3;

  // Y-axis ticks
  ctx.fillStyle = '#9aa3b2';
  ctx.font = '12px Inter, sans-serif';
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const val = Math.round((i * maxVal) / steps);
    const y = height - padding - (val / maxVal) * chartHeight;
    ctx.fillText(String(val), 8, y + 4);
    ctx.strokeStyle = 'rgba(42,53,91,0.4)';
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Draw bars
  labels.forEach((label, i) => {
    const xGroup = padding + i * barGroupWidth;

    // Placed
    const h1 = (placed[i] / maxVal) * chartHeight;
    ctx.fillStyle = '#5b8cff';
    ctx.fillRect(xGroup + barWidth * 0.5, height - padding - h1, barWidth, h1);

    // Offers
    const h2 = (offers[i] / maxVal) * chartHeight;
    ctx.fillStyle = '#4ad6a7';
    ctx.fillRect(xGroup + barWidth * 1.7, height - padding - h2, barWidth, h2);

    // X labels
    ctx.fillStyle = '#eef2ff';
    ctx.fillText(label, xGroup + barWidth * 0.85, height - padding + 18);
  });

  // Legend box
ctx.fillStyle = '#eef2ff';
ctx.fillRect(width - padding - 160, padding - 55, 150, 60);

// Legend title
ctx.fillStyle = '#0b1020';
ctx.fillText('Legend', width - padding - 120, padding - 40);

// Swatches
ctx.fillStyle = '#5b8cff';
ctx.fillRect(width - padding - 155, padding - 28, 10, 10);
ctx.fillStyle = '#0b1020';
ctx.fillText('Placed', width - padding - 140, padding - 20);

ctx.fillStyle = '#4ad6a7';
ctx.fillRect(width - padding - 155, padding - 12, 10, 10);
ctx.fillStyle = '#0b1020';
ctx.fillText('Offers', width - padding - 140, padding - 4);

})();
