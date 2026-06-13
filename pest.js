function startPestSystem() {
  setInterval(spawnPests, 60000);
}

function spawnPests() {
  const growing = [];

  state.farm.forEach((plot, i) => {
    if (plot && !plot.ready && !plot.pest) {
      growing.push(i);
    }
  });

  if (growing.length === 0) return;

  const pestCount = Math.min(2, growing.length);

  for (let i = 0; i < pestCount; i++) {
    const idx = growing[Math.floor(Math.random() * growing.length)];
    const plot = state.farm[idx];

    if (plot) {
      plot.pest = true;
      plot.name = "🐛 " + plot.name;
    }
  }

  renderAll();
}
