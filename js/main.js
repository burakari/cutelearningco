// Getiri hesaplayıcı — Kaynak: piyasadetay.com Gram Altın Arşivi (12.08.2026 itibarıyla)
var goldYearStart = {
  2016: 99.84,
  2017: 131.08,
  2018: 159.87,
  2019: 217.94,
  2020: 290.35,
  2021: 454.10,
  2022: 787.82,
  2023: 1096.07,
  2024: 1961.23,
  2025: 2984.38,
  2026: 6010.50
};
var goldCurrentPrice = 6775.15; // 12.08.2026 arşiv fiyatı

(function initCalculator() {
  var yearSelect = document.getElementById('calc-year');
  var amountInput = document.getElementById('calc-amount');
  var btn = document.getElementById('calc-btn');
  var outGrams = document.getElementById('calc-out-grams');
  var outValue = document.getElementById('calc-out-value');
  var outProfit = document.getElementById('calc-out-profit');

  if (!yearSelect || !btn) return;

  Object.keys(goldYearStart).sort().forEach(function (year) {
    var opt = document.createElement('option');
    opt.value = year;
    opt.textContent = year + ' başı';
    yearSelect.appendChild(opt);
  });
  yearSelect.value = '2016';

  function formatTL(n) {
    return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
  }

  function calculate() {
    var year = yearSelect.value;
    var amount = parseFloat(amountInput.value);
    if (!amount || amount <= 0 || !goldYearStart[year]) return;

    var priceThen = goldYearStart[year];
    var grams = amount / priceThen;
    var valueNow = grams * goldCurrentPrice;
    var profit = valueNow - amount;
    var profitPct = (profit / amount) * 100;

    outGrams.textContent = grams.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' gram';
    outValue.textContent = formatTL(valueNow);
    outProfit.textContent = (profit >= 0 ? '+' : '') + formatTL(profit) + ' (' + (profitPct >= 0 ? '+' : '') + profitPct.toFixed(1) + '%)';
    outProfit.classList.toggle('negative', profit < 0);
  }

  btn.addEventListener('click', calculate);

  var presets = document.querySelectorAll('.calc-preset');
  presets.forEach(function (p) {
    p.addEventListener('click', function () {
      amountInput.value = p.getAttribute('data-amount');
      presets.forEach(function (o) { o.classList.remove('active'); });
      p.classList.add('active');
      calculate();
    });
  });

  calculate();
})();

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(function (item) {
  var btn = item.querySelector('.faq-q');
  var ans = item.querySelector('.faq-a');

  btn.addEventListener('click', function () {
    var isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(function (other) {
      if (other !== item) {
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      ans.style.maxHeight = null;
    } else {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      ans.style.maxHeight = ans.scrollHeight + 'px';
    }
  });
});

// Scroll-reveal
var revealTargets = document.querySelectorAll(
  '.criteria-card, .scope-card, .stock-chip, .report-card, .calc-card, .section-eyebrow, .section-title, .section-lede'
);
revealTargets.forEach(function (el) { el.setAttribute('data-reveal', ''); });

if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealTargets.forEach(function (el) { io.observe(el); });
} else {
  revealTargets.forEach(function (el) { el.classList.add('in'); });
}
