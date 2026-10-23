document.addEventListener('DOMContentLoaded', () => {
  let count = 0;
  const counterEl = document.getElementById('counter');
  const btnInc = document.getElementById('btn-inc');
  const btnDec = document.getElementById('btn-dec');
  const btnReset = document.getElementById('btn-reset');

  function updateDisplay() {
    counterEl.textContent = count;
    counterEl.style.color = count > 0 ? '#28a745' : count < 0 ? '#dc3545' : '#667eea';
  }

  btnInc.addEventListener('click', () => { count++; updateDisplay(); });
  btnDec.addEventListener('click', () => { count--; updateDisplay(); });
  btnReset.addEventListener('click', () => { count = 0; updateDisplay(); });
});
