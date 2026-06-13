function renderStorage() {
  const box = document.getElementById("storage");
  box.innerHTML = "";

  Object.keys(state.storage).forEach(item => {
    const div = document.createElement("div");
    div.innerText = `${item}: ${state.storage[item]}`;
    box.appendChild(div);
  });
}
