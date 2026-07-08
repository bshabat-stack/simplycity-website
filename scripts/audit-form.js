(function () {
  // The DC runtime re-injects helmet assets, so this file can execute twice — bind once.
  if (window.__scAuditFormBound) return;
  window.__scAuditFormBound = true;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function getForm() { return document.getElementById('audit-lead-form'); }

  function getSource() {
    var source = new URLSearchParams(window.location.search).get('source');
    return source ? source.slice(0, 100) : 'direct';
  }

  // Populate the hidden source field once the DC runtime has rendered the form.
  var sourcePoll = setInterval(function () {
    var form = getForm();
    if (!form) return;
    clearInterval(sourcePoll);
    form.elements.source.value = getSource();
  }, 150);
  setTimeout(function () { clearInterval(sourcePoll); }, 10000);

  function setFieldError(form, name, invalid) {
    var field = form.querySelector('.audit-field[data-field="' + name + '"]');
    var input = form.elements[name];
    if (!field || !input) return;
    field.classList.toggle('is-invalid', invalid);
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function validate(form) {
    var firstInvalid = null;

    function check(name, isValid) {
      setFieldError(form, name, !isValid);
      if (!isValid && !firstInvalid) firstInvalid = form.elements[name];
    }

    check('name', form.elements.name.value.trim() !== '');
    check('business', form.elements.business.value.trim() !== '');
    check('email', EMAIL_RE.test(form.elements.email.value.trim()));

    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function setLoading(form, loading) {
    var button = form.querySelector('.audit-submit');
    if (!button) return;
    button.disabled = loading;
    if (loading) {
      button.dataset.label = button.innerHTML;
      button.textContent = 'Sending…';
    } else if (button.dataset.label) {
      button.innerHTML = button.dataset.label;
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function showFormError(form, visible) {
    var box = form.querySelector('#audit-form-error');
    if (box) box.classList.toggle('is-hidden', !visible);
  }

  function showSuccess(form) {
    var success = document.getElementById('audit-success');
    form.classList.add('is-hidden');
    if (success) {
      success.classList.remove('is-hidden');
      if (window.lucide) window.lucide.createIcons();
      success.focus();
    }
  }

  function submit(form) {
    showFormError(form, false);
    if (!validate(form)) return;

    setLoading(form, true);
    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.elements.name.value.trim(),
        business: form.elements.business.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim(),
        source: form.elements.source.value || getSource(),
        website: form.elements.website.value
      })
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || !data.ok) throw new Error('submit failed');
        });
      })
      .then(function () { showSuccess(form); })
      .catch(function () {
        setLoading(form, false);
        showFormError(form, true);
      });
  }

  // Delegated listeners so the bindings survive the DC runtime re-rendering the page.
  document.addEventListener('submit', function (e) {
    var form = getForm();
    if (!form || e.target !== form) return;
    e.preventDefault();
    submit(form);
  });

  // Clear a field's error as soon as the visitor edits it.
  document.addEventListener('input', function (e) {
    var form = getForm();
    if (!form || !form.contains(e.target) || !e.target.name) return;
    setFieldError(form, e.target.name, false);
  });
})();
