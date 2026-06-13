function startPestSystem() {
  setInterval(() => {
    spawnPests();
  }, 60000); // 1분
}

function spawnPests() {
  const plantedPlots = [];

  // 심어진 작물만 모으기
  state.farm.forEach((plot, i) => {
    if (plot && !plot.ready) {
      plantedPlots.push(i);
    }
  });

  if (plantedPlots.length === 0) return;

  // 최대 2마리 해충
  const pestCount = Math.min(2, plantedPlots.length);

  for (let i = 0; i < pestCount; i++) {
    const randomIndex =
      plantedPlots[Math.floor(Math.random() * plantedPlots.length)];

    const plot = state.farm[randomIndex];

    if (plot && !plot.ready) {
      plot.pest = true; // 해충 표시
      plot.name = "🐛 " + plot.name;
    }
  }

  renderAll();
}
