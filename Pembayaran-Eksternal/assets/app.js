(function () {
  function showToast(message) {
    var toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 1800);
  }

  function go(href) {
    if (href) {
      window.location.href = href;
    }
  }

  function getPage() {
    var path = window.location.pathname.split('/');
    return path[path.length - 1] || 'index.html';
  }

  function initRowSelection() {
    var table = document.querySelector('.table');
    if (!table) return;
    var rows = table.querySelectorAll('tbody tr');
    rows.forEach(function (row) {
      row.addEventListener('click', function () {
        rows.forEach(function (r) { r.classList.remove('row-selected'); });
        row.classList.add('row-selected');
      });
    });
  }

  function getSelectedRowText() {
    var row = document.querySelector('.row-selected');
    if (!row) return null;
    return row.textContent ? row.textContent.trim().slice(0, 80) : 'item';
  }

  function handleButtons() {
    var page = getPage();
    document.body.addEventListener('click', function (event) {
      var target = event.target;
      if (!target) return;
      if (target.tagName !== 'BUTTON') return;

      var label = (target.textContent || '').trim();
      if (!label) return;

      if (page === 'index.html') {
        if (label === 'Baru') return go('form.html');
        if (label === 'Edit') {
          if (!getSelectedRowText()) return showToast('Pilih baris terlebih dahulu.');
          return go('form.html');
        }
        if (label === 'Hapus') {
          var rowText = getSelectedRowText();
          if (!rowText) return showToast('Pilih baris terlebih dahulu.');
          if (window.confirm('Hapus item terpilih?')) {
            var row = document.querySelector('.row-selected');
            if (row) row.remove();
            return showToast('Item dihapus (simulasi).');
          }
          return;
        }
        if (label === 'Export') return showToast('Export dijalankan (simulasi).');
        if (label === 'Detail') return go('detail.html');
      }

      if (page === 'form.html') {
        if (label === 'Simpan Draft') return showToast('Draft tersimpan (simulasi).');
        if (label === 'Submit Flow') return showToast('Flow approval dikirim (simulasi).');
        if (label === 'Upload Dokumen') return go('documents.html');
        if (label === 'Simpan') return showToast('Data tersimpan (simulasi).');
        if (label === 'Batal') return go('index.html');
      }

      if (page === 'detail.html') {
        if (label === 'Tambah Item') return showToast('Item baru ditambahkan (simulasi).');
        if (label === 'Impor Dari Kontrak') return showToast('Item diimpor dari kontrak (simulasi).');
        if (label === 'Edit') return showToast('Edit item (simulasi).');
      }

      if (page === 'documents.html') {
        if (label === 'Upload Dokumen') return showToast('Upload dokumen dibuka (simulasi).');
        if (label === 'Download Semua') return showToast('Download zip dokumen (simulasi).');
      }

      if (page === 'verify-list.html') {
        if (label === 'Mulai Verifikasi') return go('verify-form.html');
        if (label === 'Export') return showToast('Export verifikasi (simulasi).');
        if (label === 'Verifikasi') return go('verify-form.html');
        if (label === 'Lihat') return go('verify-form.html');
      }

      if (page === 'verify-form.html') {
        if (label === 'Lihat Permohonan') return go('form.html');
        if (label === 'Lihat Kontrak') return showToast('Kontrak dibuka (simulasi).');
        if (label === 'Submit Flow') return showToast('Flow verifikasi dikirim (simulasi).');
        if (label === 'Simpan') return showToast('Verifikasi tersimpan (simulasi).');
        if (label === 'Batal') return go('verify-list.html');
      }

      if (page === 'approval.html') {
        if (label === 'Mulai Approval') return showToast('Approval dimulai (simulasi).');
        if (label === 'Lihat Histori') return showToast('Histori approval (simulasi).');
      }

      if (page === 'monitoring.html') {
        if (label === 'Filter') return showToast('Filter dibuka (simulasi).');
        if (label === 'Export') return showToast('Export monitoring (simulasi).');
      }

      if (page === 'print-preview.html') {
        if (label === 'Cetak') return window.print();
        if (label === 'Download PDF') return showToast('Download PDF (simulasi).');
      }
    });
  }

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
    initRowSelection();
    handleButtons();
    initTabs();
    initCurrencyToggle();
  });
})();
