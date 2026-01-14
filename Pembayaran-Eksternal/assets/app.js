(function () {
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (tabGroup) {
      var buttons = tabGroup.querySelectorAll('button[data-tab-target]');
      var panels = tabGroup.parentElement.querySelectorAll('.tab-panel');

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('active'); });
          panels.forEach(function (p) { p.classList.remove('active'); });

          btn.classList.add('active');
          var target = btn.getAttribute('data-tab-target');
          var panel = tabGroup.parentElement.querySelector('[data-tab-panel="' + target + '"]');
          if (panel) panel.classList.add('active');
        });
      });
    });
  }

  function initCurrencyToggle() {
    var select = document.getElementById('jenisPembayaran');
    var currencyBlock = document.querySelector('[data-js="currencyFields"]');
    if (!select || !currencyBlock) return;

    function update() {
      var val = select.value || '';
      var show = val === 'Pihak Ketiga' || val === 'Investasi';
      currencyBlock.style.display = show ? 'grid' : 'none';
    }

    select.addEventListener('change', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initCurrencyToggle();
  });
})();
