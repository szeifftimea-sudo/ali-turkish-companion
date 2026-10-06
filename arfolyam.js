(() => {
  const API_URL = 'https://api.frankfurter.dev/v2/rates?base=TRY&quotes=HUF';
  const CACHE_KEY = 'ali-try-huf-rate-v1';
  const FALLBACK_RATE = 6.58;
  const tryInput = document.querySelector('[data-amount="TRY"]');
  const hufInput = document.querySelector('[data-amount="HUF"]');
  const rateBar = document.querySelector('.rate-bar');
  const rateLabel = document.querySelector('[data-rate-label]');
  const rateDate = document.querySelector('[data-rate-date]');
  const rateNote = document.querySelector('[data-rate-note]');
  const refreshButton = document.querySelector('[data-refresh]');
  const swapButton = document.querySelector('[data-swap]');
  let rate = FALLBACK_RATE;
  let activeCurrency = 'TRY';

  const numberFormat = new Intl.NumberFormat('hu-HU', { maximumFractionDigits:2 });
  const rateFormat = new Intl.NumberFormat('hu-HU', { minimumFractionDigits:2, maximumFractionDigits:4 });

  function parseAmount(value) {
    const normalized = String(value).replace(/\s/g, '').replace(',', '.').replace(/[^0-9.-]/g, '');
    const amount = Number.parseFloat(normalized);
    return Number.isFinite(amount) ? Math.max(0, amount) : 0;
  }

  function formatInput(value) {
    return numberFormat.format(Math.round((value + Number.EPSILON) * 100) / 100);
  }

  function calculate(source = activeCurrency) {
    if (source === 'TRY') {
      hufInput.value = formatInput(parseAmount(tryInput.value) * rate);
    } else {
      tryInput.value = formatInput(parseAmount(hufInput.value) / rate);
    }
  }

  function setRate(nextRate, date, state = 'ready', message = '') {
    rate = nextRate;
    rateBar.classList.remove('ready', 'error');
    rateBar.classList.add(state);
    rateLabel.textContent = `1 ₺ = ${rateFormat.format(rate)} Ft`;
    rateDate.textContent = date ? `${date} · referenciaárfolyam` : 'Tájékoztató árfolyam';
    rateNote.textContent = message || 'Az adat naponta frissül; a banki és pénzváltói árfolyam eltérhet.';
    calculate();
  }

  function readCache() {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (Number.isFinite(cached?.rate) && cached.rate > 0) return cached;
    } catch (_) {}
    return null;
  }

  async function loadRate(force = false) {
    refreshButton.disabled = true;
    rateBar.classList.remove('ready', 'error');
    rateLabel.textContent = 'Árfolyam frissítése…';
    rateDate.textContent = 'Egy pillanat';

    try {
      const response = await fetch(`${API_URL}${force ? `&t=${Date.now()}` : ''}`, { cache:force ? 'no-store' : 'default' });
      if (!response.ok) throw new Error('rate_request_failed');
      const data = await response.json();
      const quote = Array.isArray(data) ? data.find(item => item.base === 'TRY' && item.quote === 'HUF') : null;
      if (!quote || !Number.isFinite(Number(quote.rate))) throw new Error('rate_missing');
      const current = { rate:Number(quote.rate), date:quote.date || '', savedAt:Date.now() };
      localStorage.setItem(CACHE_KEY, JSON.stringify(current));
      setRate(current.rate, current.date);
    } catch (_) {
      const cached = readCache();
      if (cached) {
        setRate(cached.rate, cached.date, 'ready', 'Most az utoljára letöltött árfolyamot használjuk; frissítéshez internetkapcsolat kell.');
      } else {
        setRate(FALLBACK_RATE, '', 'error', 'Az élő árfolyam most nem érhető el; ideiglenes tájékoztató értékkel számolunk. Próbáld meg később frissíteni.');
      }
    } finally {
      refreshButton.disabled = false;
    }
  }

  [tryInput, hufInput].forEach(input => {
    input.addEventListener('focus', () => input.select());
    input.addEventListener('input', () => {
      activeCurrency = input.dataset.amount;
      calculate(activeCurrency);
    });
    input.addEventListener('blur', () => {
      input.value = formatInput(parseAmount(input.value));
      calculate(activeCurrency);
    });
  });

  document.querySelectorAll('[data-quick]').forEach(button => {
    button.addEventListener('click', () => {
      activeCurrency = 'TRY';
      tryInput.value = formatInput(Number(button.dataset.quick));
      calculate('TRY');
      tryInput.focus();
    });
  });

  swapButton.addEventListener('click', () => {
    activeCurrency = activeCurrency === 'TRY' ? 'HUF' : 'TRY';
    const input = activeCurrency === 'TRY' ? tryInput : hufInput;
    input.focus();
    input.select();
  });
  refreshButton.addEventListener('click', () => loadRate(true));

  calculate('TRY');
  loadRate();
})();
