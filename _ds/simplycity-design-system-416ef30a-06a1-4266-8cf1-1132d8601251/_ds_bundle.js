/* @ds-bundle: {"format":3,"namespace":"SimplyCityDesignSystem_416ef3","components":[{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/content/Accordion.jsx":"c42b9754ab4c","components/core/Avatar.jsx":"f585a7cedb30","components/core/Badge.jsx":"5b280e763fbf","components/core/Button.jsx":"c4687374377b","components/core/Card.jsx":"70fbe6acaa02","components/core/Eyebrow.jsx":"6560493044ed","components/core/Logo.jsx":"1b15bfe4cd54","components/core/Stat.jsx":"72300c9b408b","components/forms/Input.jsx":"20e8514d5863","ui_kits/website/CtaFooter.jsx":"4e2e87e944f8","ui_kits/website/Faq.jsx":"06a150f424e0","ui_kits/website/Hero.jsx":"ae67aaae2816","ui_kits/website/NavBar.jsx":"f55037193ffd","ui_kits/website/Pricing.jsx":"c55de34a3bb3","ui_kits/website/Results.jsx":"eaeb549e3777","ui_kits/website/Services.jsx":"18607d5755ba","ui_kits/website/app.jsx":"598bd6cc0898","ui_kits/website/shared.jsx":"c60d10dab989"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SimplyCityDesignSystem_416ef3 = window.SimplyCityDesignSystem_416ef3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Accordion — FAQ list. Uncontrolled, single-open. */

const CSS = `
.sc-acc{font-family:var(--font-sans);width:100%;}
.sc-acc-item{border-top:var(--bw) solid var(--border-subtle);}
.sc-acc-item:last-child{border-bottom:var(--bw) solid var(--border-subtle);}
.sc-acc-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;
  background:none;border:none;cursor:pointer;text-align:left;padding:24px 4px;
  font-family:var(--font-sans);font-weight:var(--fw-bold);font-size:var(--text-h4);color:var(--text-strong);}
.sc-acc-ico{flex:none;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--color-brand-tint);color:var(--color-brand);transition:transform var(--dur) var(--ease-out),background var(--dur) var(--ease-out);}
.sc-acc-ico svg{width:18px;height:18px;}
.sc-acc-item[data-open=true] .sc-acc-ico{transform:rotate(45deg);background:var(--color-brand);color:var(--white);}
.sc-acc-a{overflow:hidden;height:0;transition:height var(--dur-slow) var(--ease-out);}
.sc-acc-a-inner{padding:0 4px 26px;font-weight:var(--fw-medium);font-size:var(--text-body);
  line-height:var(--lh-relaxed);color:var(--text-body);max-width:60ch;}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'accordion');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Plus() {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }));
}
function Accordion({
  items = [],
  defaultOpen = 0,
  ...rest
}) {
  useStyles();
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "sc-acc"
  }, rest), items.map((it, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      className: "sc-acc-item",
      "data-open": isOpen ? 'true' : undefined,
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      className: "sc-acc-q",
      "aria-expanded": isOpen,
      onClick: () => setOpen(isOpen ? -1 : i)
    }, it.q, /*#__PURE__*/React.createElement("span", {
      className: "sc-acc-ico"
    }, /*#__PURE__*/React.createElement(Plus, null))), /*#__PURE__*/React.createElement("div", {
      className: "sc-acc-a",
      style: {
        height: isOpen ? 'var(--_h)' : 0
      },
      ref: el => {
        if (el) el.style.setProperty('--_h', el.firstChild.scrollHeight + 'px');
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "sc-acc-a-inner"
    }, it.a)));
  }));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Avatar — circular image or initials, for testimonials & team. */

const CSS = `
.sc-avatar{display:inline-flex;align-items:center;justify-content:center;flex:none;
  border-radius:50%;overflow:hidden;font-family:var(--font-sans);font-weight:var(--fw-bold);
  background:var(--color-brand-tint);color:var(--text-brand);}
.sc-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
.sc-avatar[data-size=sm]{width:36px;height:36px;font-size:13px;}
.sc-avatar[data-size=md]{width:48px;height:48px;font-size:16px;}
.sc-avatar[data-size=lg]{width:64px;height:64px;font-size:22px;}
.sc-avatar[data-ring=true]{box-shadow:0 0 0 3px var(--white),0 0 0 5px var(--color-brand);}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'avatar');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function Avatar({
  src,
  name = '',
  size = 'md',
  ring = false,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "sc-avatar",
    "data-size": size,
    "data-ring": ring ? 'true' : undefined,
    title: name || undefined
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Badge — small capsule tag for labels, counts and statuses. */

const CSS = `
.sc-badge{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-sans);
  font-weight:var(--fw-bold);font-size:var(--text-caption);line-height:1;
  padding:6px 12px;border-radius:var(--radius-pill);border:var(--bw) solid transparent;white-space:nowrap;}
.sc-badge>svg{width:14px;height:14px;}
.sc-badge[data-variant=tint]{background:var(--color-brand-tint);color:var(--text-brand);}
.sc-badge[data-variant=solid]{background:var(--color-brand);color:var(--text-on-brand);}
.sc-badge[data-variant=ink]{background:var(--ink-900);color:var(--white);}
.sc-badge[data-variant=outline]{background:transparent;color:var(--text-strong);border-color:var(--border-subtle);}
.sc-badge[data-variant=onBrand]{background:rgba(255,255,255,0.16);color:var(--white);}
.sc-badge[data-variant=success]{background:var(--success-soft);color:var(--success);}
.sc-badge[data-variant=error]{background:var(--error-soft);color:var(--error);}
.sc-badge[data-dot=true]::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor;}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'badge');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Badge({
  variant = 'tint',
  dot = false,
  children,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "sc-badge",
    "data-variant": variant,
    "data-dot": dot ? 'true' : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Button — the capsule action.
   Default shape is a pill (radius 999px) echoing the logo mark. */

const CSS = `
.sc-btn{--_bg:var(--color-brand);--_fg:var(--text-on-brand);--_bd:transparent;
  display:inline-flex;align-items:center;justify-content:center;gap:9px;
  font-family:var(--font-sans);font-weight:var(--fw-bold);white-space:nowrap;
  border-radius:var(--radius-pill);border:var(--bw-strong) solid var(--_bd);
  background:var(--_bg);color:var(--_fg);cursor:pointer;text-decoration:none;
  transition:background var(--dur) var(--ease-out),transform var(--dur-fast) var(--ease-out),
    border-color var(--dur) var(--ease-out),color var(--dur) var(--ease-out);
  -webkit-tap-highlight-color:transparent;}
.sc-btn:focus-visible{outline:none;box-shadow:0 0 0 4px var(--focus-ring);}
.sc-btn:active{transform:scale(var(--press-scale));}
.sc-btn[data-size=sm]{font-size:var(--text-body-sm);padding:9px 18px;}
.sc-btn[data-size=md]{font-size:var(--text-body);padding:14px 26px;}
.sc-btn[data-size=lg]{font-size:18px;padding:17px 34px;}
.sc-btn[data-block=true]{display:flex;width:100%;}
/* primary — blue fill (on light) */
.sc-btn[data-variant=primary]{--_bg:var(--color-brand);--_fg:var(--text-on-brand);}
.sc-btn[data-variant=primary]:hover{--_bg:var(--color-brand-hover);}
.sc-btn[data-variant=primary]:active{--_bg:var(--color-brand-press);}
/* onBrand — white fill, blue text (for use on blue backgrounds) */
.sc-btn[data-variant=onBrand]{--_bg:var(--white);--_fg:var(--color-brand);}
.sc-btn[data-variant=onBrand]:hover{--_bg:var(--blue-50);}
.sc-btn[data-variant=onBrand]:active{--_bg:var(--blue-100);}
/* ghost — outline on light */
.sc-btn[data-variant=ghost]{--_bg:transparent;--_fg:var(--text-strong);--_bd:var(--border-subtle);}
.sc-btn[data-variant=ghost]:hover{--_bd:var(--ink-900);}
/* ghostOnBrand — white outline on blue */
.sc-btn[data-variant=ghostOnBrand]{--_bg:transparent;--_fg:var(--white);--_bd:var(--border-on-brand);}
.sc-btn[data-variant=ghostOnBrand]:hover{--_bd:var(--white);--_bg:rgba(255,255,255,0.08);}
.sc-btn:disabled,.sc-btn[aria-disabled=true]{opacity:.45;pointer-events:none;}
.sc-btn>svg{width:1.15em;height:1.15em;flex:none;}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'button');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  children,
  ...rest
}) {
  useStyles();
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: "sc-btn",
    "data-variant": variant,
    "data-size": size,
    "data-block": block ? 'true' : undefined
  }, rest), iconLeft, children != null && /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Card — the surface primitive. Soft large radius, cool shadow. */

const CSS = `
.sc-card{background:var(--surface-card);border-radius:var(--radius-xl);border:var(--bw) solid transparent;
  color:var(--text-body);position:relative;}
.sc-card[data-pad=sm]{padding:var(--space-5);}
.sc-card[data-pad=md]{padding:var(--space-8);}
.sc-card[data-pad=lg]{padding:var(--space-10);}
.sc-card[data-variant=elevated]{box-shadow:var(--shadow-lg);}
.sc-card[data-variant=outline]{border-color:var(--border-subtle);}
.sc-card[data-variant=flat]{background:var(--surface-subtle);}
.sc-card[data-variant=brand]{background:var(--surface-brand);color:var(--white);}
.sc-card[data-variant=ink]{background:var(--surface-ink);color:var(--white);}
.sc-card[data-hover=true]{transition:transform var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out);cursor:pointer;}
.sc-card[data-hover=true]:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'card');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Card({
  variant = 'elevated',
  pad = 'md',
  hover = false,
  children,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "sc-card",
    "data-variant": variant,
    "data-pad": pad,
    "data-hover": hover ? 'true' : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Eyebrow — the wide-tracked uppercase label that sits above headlines. */

const CSS = `
.sc-eyebrow{display:inline-block;font-family:var(--font-sans);font-weight:var(--fw-extra);
  font-size:var(--text-eyebrow);letter-spacing:var(--ls-eyebrow);text-transform:uppercase;line-height:1;}
.sc-eyebrow[data-tone=brand]{color:var(--text-brand);}
.sc-eyebrow[data-tone=ink]{color:var(--text-strong);}
.sc-eyebrow[data-tone=onBrand]{color:rgba(255,255,255,0.82);}
.sc-eyebrow[data-tone=muted]{color:var(--text-muted);}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'eyebrow');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Eyebrow({
  tone = 'brand',
  children,
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "sc-eyebrow",
    "data-tone": tone
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity logotype. "Simply" + "City" knocked out of a capsule — the brand mark.
   Monochrome by design (guideline: black or white only). `tone` sets the ink colour;
   `knockout` is the colour showing THROUGH the "City" capsule (i.e. the background it sits on). */

const CSS = `
.sc-logo{display:inline-flex;align-items:center;font-family:var(--font-sans);
  font-weight:var(--fw-extra);letter-spacing:-0.03em;line-height:1;user-select:none;white-space:nowrap;}
.sc-logo .sc-logo-word{color:var(--_ink);}
.sc-logo .sc-logo-cap{display:inline-flex;align-items:center;background:var(--_ink);
  color:var(--_ko);border-radius:var(--radius-pill);
  padding:0.12em 0.34em 0.2em;margin-left:0.14em;}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'logo');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Logo({
  tone = 'onBrand',
  knockout,
  size = 30,
  ...rest
}) {
  useStyles();
  const ink = tone === 'onBrand' ? 'var(--white)' : 'var(--black)';
  const ko = knockout || (tone === 'onBrand' ? 'var(--sky-blue)' : 'var(--white)');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "sc-logo",
    style: {
      fontSize: size,
      '--_ink': ink,
      '--_ko': ko
    },
    role: "img",
    "aria-label": "SimplyCity"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "sc-logo-word"
  }, "Simply"), /*#__PURE__*/React.createElement("span", {
    className: "sc-logo-cap"
  }, "City"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Stat — the big proof number with a label. Used in hero stat bands. */

const CSS = `
.sc-stat{display:flex;flex-direction:column;gap:4px;font-family:var(--font-sans);}
.sc-stat .sc-stat-n{font-weight:var(--fw-black);letter-spacing:var(--ls-tight);line-height:1;}
.sc-stat[data-size=md] .sc-stat-n{font-size:38px;}
.sc-stat[data-size=lg] .sc-stat-n{font-size:52px;}
.sc-stat .sc-stat-l{font-weight:var(--fw-semibold);font-size:var(--text-body-sm);}
.sc-stat[data-tone=onLight] .sc-stat-n{color:var(--text-strong);}
.sc-stat[data-tone=onLight] .sc-stat-l{color:var(--text-muted);}
.sc-stat[data-tone=brand] .sc-stat-n{color:var(--text-brand);}
.sc-stat[data-tone=brand] .sc-stat-l{color:var(--text-muted);}
.sc-stat[data-tone=onBrand] .sc-stat-n{color:var(--white);}
.sc-stat[data-tone=onBrand] .sc-stat-l{color:rgba(255,255,255,0.8);}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'stat');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Stat({
  value,
  label,
  tone = 'onLight',
  size = 'md',
  ...rest
}) {
  useStyles();
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "sc-stat",
    "data-tone": tone,
    "data-size": size
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "sc-stat-n"
  }, value), /*#__PURE__*/React.createElement("span", {
    className: "sc-stat-l"
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SimplyCity Input — text field for forms and email capture. */

const CSS = `
.sc-field{display:flex;flex-direction:column;gap:7px;font-family:var(--font-sans);width:100%;}
.sc-field .sc-label{font-weight:var(--fw-bold);font-size:var(--text-body-sm);color:var(--text-strong);}
.sc-field .sc-input-wrap{position:relative;display:flex;align-items:center;}
.sc-field .sc-input-ico{position:absolute;left:16px;display:flex;color:var(--text-faint);pointer-events:none;}
.sc-field .sc-input-ico>svg{width:18px;height:18px;}
.sc-field .sc-input{width:100%;font-family:var(--font-sans);font-weight:var(--fw-medium);
  font-size:var(--text-body);color:var(--text-strong);background:var(--white);
  border:var(--bw-strong) solid var(--border-subtle);border-radius:var(--radius-md);
  padding:14px 16px;transition:border-color var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out);
  outline:none;}
.sc-field[data-shape=pill] .sc-input{border-radius:var(--radius-pill);padding-left:22px;}
.sc-field[data-has-icon=true] .sc-input{padding-left:44px;}
.sc-field .sc-input::placeholder{color:var(--text-faint);font-weight:var(--fw-medium);}
.sc-field .sc-input:hover{border-color:var(--ink-300);}
.sc-field .sc-input:focus{border-color:var(--color-brand);box-shadow:0 0 0 4px var(--focus-ring);}
.sc-field[data-invalid=true] .sc-input{border-color:var(--error);}
.sc-field[data-invalid=true] .sc-input:focus{box-shadow:0 0 0 4px var(--error-soft);}
.sc-field .sc-hint{font-size:var(--text-caption);font-weight:var(--fw-medium);color:var(--text-muted);}
.sc-field[data-invalid=true] .sc-hint{color:var(--error);}
`;
let injected = false;
function useStyles() {
  if (injected || typeof document === 'undefined') return;
  injected = true;
  const el = document.createElement('style');
  el.setAttribute('data-sc', 'input');
  el.textContent = CSS;
  document.head.appendChild(el);
}
function Input({
  label,
  hint,
  invalid = false,
  shape = 'rounded',
  icon = null,
  id,
  ...rest
}) {
  useStyles();
  const fid = id || (label ? 'f-' + String(label).toLowerCase().replace(/\s+/g, '-') : undefined);
  return /*#__PURE__*/React.createElement("label", {
    className: "sc-field",
    htmlFor: fid,
    "data-shape": shape,
    "data-invalid": invalid ? 'true' : undefined,
    "data-has-icon": icon ? 'true' : undefined
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "sc-label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "sc-input-wrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "sc-input-ico"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "sc-input"
  }, rest))), hint && /*#__PURE__*/React.createElement("span", {
    className: "sc-hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CtaFooter.jsx
try { (() => {
/* Blue CTA band + dark footer. */
function CtaBand({
  onAudit
}) {
  React.useEffect(refreshIcons);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--sky-blue)',
      padding: '96px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: '0 auto',
      padding: '0 40px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '800 52px/1 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: '#fff',
      margin: 0
    }
  }, "See where you rank today."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 19px/1.5 var(--font-sans)',
      color: 'rgba(255,255,255,0.9)',
      margin: '18px auto 32px',
      maxWidth: 520
    }
  }, "Get a free local-search audit for your business. No pitch, no obligation \\u2014 just where you stand and how to climb."), /*#__PURE__*/React.createElement(Button, {
    variant: "onBrand",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right"
    }),
    onClick: onAudit
  }, "Claim your free audit")));
}
function SiteFooter() {
  React.useEffect(refreshIcons);
  const cols = [['Product', ['Services', 'Results', 'Pricing', 'Free audit']], ['Company', ['About', 'Careers', 'Blog', 'Contact']], ['Resources', ['Local SEO guide', 'Help center', 'Privacy', 'Terms']]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-900)',
      padding: '72px 0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
    tone: "onBrand",
    knockout: "#0E0E10",
    size: 28
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 15px/1.55 var(--font-sans)',
      color: 'rgba(255,255,255,0.6)',
      maxWidth: 280,
      margin: '18px 0 0'
    }
  }, "Bridging the gap between physical stores and the digital world.")), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 13,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.5)',
      marginBottom: 16
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: 15,
      color: 'rgba(255,255,255,0.8)'
    }
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid rgba(255,255,255,0.12)',
      marginTop: 48,
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'rgba(255,255,255,0.5)'
    }
  }, "\xA9 2026 SimplyCity. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 18,
      color: 'rgba(255,255,255,0.6)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "mail",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    n: "phone",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    n: "map-pin",
    size: 18
  })))));
}
window.CtaBand = CtaBand;
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CtaFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Faq.jsx
try { (() => {
/* FAQ — accordion (tint). */
function Faq() {
  const items = [{
    q: 'How fast will I start ranking?',
    a: 'Most local businesses see measurable movement in the map pack within 30\u201360 days, with the biggest gains landing around month three. Local SEO compounds \u2014 the longer we work, the stronger your position.'
  }, {
    q: 'Do you work with my industry?',
    a: 'If you serve customers in a physical area \u2014 a shop, clinic, trade, restaurant or service business \u2014 SimplyCity is built for you. Local search is our entire focus.'
  }, {
    q: 'What do I actually get each month?',
    a: 'A continuously tuned Google Business Profile, on-page and local SEO work, review generation, and one plain-English report showing exactly where you rank, who called, and what we did.'
  }, {
    q: 'Is there a contract or lock-in?',
    a: 'No lock-in. Plans are month-to-month \u2014 stay because it works, not because you signed something. Annual plans are optional and simply save you two months.'
  }, {
    q: 'What if I already have a website?',
    a: 'Perfect. We work with your existing site and Google profile. If something is holding you back technically, we\u2019ll flag it in your free audit.'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq",
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '360px 1fr',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '800 38px/1.05 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)',
      margin: '16px 0 0'
    }
  }, "Questions,", /*#__PURE__*/React.createElement("br", null), "answered.")), /*#__PURE__*/React.createElement(Accordion, {
    defaultOpen: 0,
    items: items
  })));
}
window.Faq = Faq;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Faq.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero — the blue-field opener (Direction B). */
function Hero({
  onAudit
}) {
  React.useEffect(refreshIcons);
  const cap = {
    background: '#fff',
    color: 'var(--sky-blue)',
    borderRadius: 999,
    padding: '0 .28em .06em',
    display: 'inline-block'
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "top",
    style: {
      background: 'var(--sky-blue)',
      position: 'relative',
      overflow: 'hidden',
      marginTop: -74,
      paddingTop: 74
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '80px 40px 96px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 600
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "onBrand"
  }, "Bridging Main Street & the web"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: '800 60px/1.0 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: '#fff',
      margin: '20px 0 0',
      maxWidth: 520
    }
  }, "Rank #1 where", /*#__PURE__*/React.createElement("br", null), "your city is ", /*#__PURE__*/React.createElement("span", {
    style: cap
  }, "searching"), "."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 20px/1.5 var(--font-sans)',
      color: 'rgba(255,255,255,0.9)',
      maxWidth: 540,
      margin: '26px 0 0'
    }
  }, "SimplyCity gets local businesses to the top of Google, Maps and everywhere nearby customers look."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "onBrand",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right"
    }),
    onClick: onAudit
  }, "Claim your free audit"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghostOnBrand",
    size: "lg",
    as: "a",
    href: "#results"
  }, "See our results")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 56,
      marginTop: 56
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "3.2\xD7",
    label: "more map calls",
    tone: "onBrand"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "#1",
    label: "avg. local rank",
    tone: "onBrand"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "640+",
    label: "local businesses",
    tone: "onBrand"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 40,
      top: 96,
      width: 380
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "elevated",
    pad: "md",
    style: {
      borderRadius: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontWeight: 800,
      fontSize: 15,
      color: 'var(--ink-900)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "map-pin",
    size: 18,
    style: {
      color: 'var(--sky-blue)'
    }
  }), " Coffee near downtown"), /*#__PURE__*/React.createElement(Badge, {
    variant: "tint"
  }, "LIVE")), [['Your Café', 5, true], ['Bean Street', 4, false], ['Roast Room', 3, false]].map(([name, stars, hot], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '13px 0',
      borderTop: i ? '1px solid var(--border-hairline)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hot ? 'var(--sky-blue)' : 'var(--blue-100)',
      color: hot ? '#fff' : 'var(--sky-blue)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "map-pin",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--ink-900)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      marginTop: 3,
      color: hot ? 'var(--sky-blue)' : 'var(--ink-300)'
    }
  }, Array.from({
    length: 5
  }).map((_, s) => /*#__PURE__*/React.createElement(Icon, {
    key: s,
    n: "star",
    size: 13,
    style: {
      opacity: s < stars ? 1 : 0.35
    }
  })))), hot && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 13,
      fontWeight: 800,
      color: 'var(--success)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "trending-up",
    size: 15
  }), "+6")))))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/NavBar.jsx
try { (() => {
/* Sticky nav — transparent white-ink over the blue hero, solid white once scrolled. */
function NavBar({
  onAudit
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  React.useEffect(refreshIcons);
  const links = ['Services', 'Results', 'Pricing', 'FAQ'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(180%) blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-hairline)' : '1px solid transparent',
      transition: 'background .25s var(--ease-out), border-color .25s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '18px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: scrolled ? 'onLight' : 'onBrand',
    knockout: scrolled ? '#fff' : 'var(--sky-blue)',
    size: 26
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 34
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    style: {
      textDecoration: 'none',
      fontWeight: 700,
      fontSize: 15,
      color: scrolled ? 'var(--text-strong)' : 'rgba(255,255,255,0.92)'
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: scrolled ? 'primary' : 'onBrand',
    size: "sm",
    onClick: onAudit
  }, "Get a free audit")));
}
window.NavBar = NavBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pricing.jsx
try { (() => {
/* Pricing — three tiers with a monthly/annual toggle. */
function Pricing({
  onAudit
}) {
  React.useEffect(refreshIcons);
  const [annual, setAnnual] = React.useState(false);
  const tiers = [{
    name: 'Starter',
    mo: 299,
    blurb: 'One location getting the basics right.',
    feats: ['Google Business Profile tune-up', 'On-page local SEO', 'Monthly rank report', 'Email support'],
    featured: false
  }, {
    name: 'Growth',
    mo: 599,
    blurb: 'The full local engine for a busy business.',
    feats: ['Everything in Starter', 'Review generation engine', 'Local link building', 'Competitor tracking', 'Dedicated strategist'],
    featured: true
  }, {
    name: 'Multi',
    mo: 999,
    blurb: 'Multiple locations, one dashboard.',
    feats: ['Everything in Growth', 'Up to 5 locations', 'Location-level reporting', 'Quarterly strategy calls'],
    featured: false
  }];
  const price = t => annual ? Math.round(t.mo * 10 / 12) : t.mo;
  const Toggle = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      background: 'var(--ink-50)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 999,
      padding: 4
    }
  }, [['Monthly', false], ['Annual \u00b7 2 months free', true]].map(([l, v]) => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => setAnnual(v),
    style: {
      border: 'none',
      cursor: 'pointer',
      borderRadius: 999,
      padding: '9px 18px',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 14,
      transition: 'all .2s var(--ease-out)',
      background: annual === v ? 'var(--sky-blue)' : 'transparent',
      color: annual === v ? '#fff' : 'var(--text-muted)'
    }
  }, l)));
  return /*#__PURE__*/React.createElement(Section, {
    id: "pricing",
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Pricing"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '800 40px/1.05 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)',
      margin: '16px 0 22px'
    }
  }, "Simple plans. No lock-in."), /*#__PURE__*/React.createElement(Toggle, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 22,
      alignItems: 'start'
    }
  }, tiers.map(t => {
    const featured = t.featured;
    return /*#__PURE__*/React.createElement("div", {
      key: t.name,
      style: {
        background: featured ? 'var(--sky-blue)' : '#fff',
        color: featured ? '#fff' : 'var(--ink-900)',
        borderRadius: 28,
        padding: 34,
        border: featured ? 'none' : '1px solid var(--border-subtle)',
        boxShadow: featured ? 'var(--shadow-brand)' : 'none',
        transform: featured ? 'translateY(-12px)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 18
      }
    }, t.name), featured && /*#__PURE__*/React.createElement(Badge, {
      variant: "onBrand"
    }, "Most popular")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '900 48px/1 var(--font-sans)',
        letterSpacing: '-.03em'
      }
    }, "$", price(t)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        fontSize: 15,
        opacity: featured ? 0.85 : 0.55
      }
    }, "/mo")), /*#__PURE__*/React.createElement("p", {
      style: {
        font: '500 15px/1.5 var(--font-sans)',
        margin: '12px 0 22px',
        color: featured ? 'rgba(255,255,255,0.9)' : 'var(--text-body)'
      }
    }, t.blurb), /*#__PURE__*/React.createElement(Button, {
      variant: featured ? 'onBrand' : 'primary',
      block: true,
      onClick: onAudit
    }, "Start with ", t.name), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        padding: 0,
        margin: '24px 0 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }
    }, t.feats.map(f => /*#__PURE__*/React.createElement("li", {
      key: f,
      style: {
        display: 'flex',
        gap: 10,
        alignItems: 'flex-start',
        fontWeight: 500,
        fontSize: 14.5
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      n: "check",
      size: 18,
      style: {
        color: featured ? '#fff' : 'var(--sky-blue)',
        flex: 'none',
        marginTop: 1
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: featured ? 'rgba(255,255,255,0.95)' : 'var(--ink-700)'
      }
    }, f)))));
  })));
}
window.Pricing = Pricing;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Results.jsx
try { (() => {
/* Results — case study + testimonials (tint). */
function Results() {
  React.useEffect(refreshIcons);
  const bars = [['Jan', 18], ['Feb', 12], ['Mar', 7], ['Apr', 4], ['May', 2], ['Jun', 1]]; // rank position (lower = better)
  const maxRank = 18;
  const quotes = [['We went from page 3 to the top of the map in two months. The phone hasn\u2019t stopped.', 'Dana Ruiz', 'Owner, Corner Bakery'], ['Finally an agency that explains what they\u2019re doing. The monthly report is so clear.', 'Marco Lee', 'Metro Plumbing'], ['Our new-patient calls from Google roughly tripled. Worth every penny.', 'Dr. Priya N.', 'BrightSmile Dental']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "results",
    tone: "tint"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Real results"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '800 40px/1.05 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)',
      margin: '16px 0 18px'
    }
  }, "From nowhere to ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--sky-blue)'
    }
  }, "#1"), " in the map pack."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 18px/1.55 var(--font-sans)',
      color: 'var(--text-body)',
      maxWidth: 460
    }
  }, "Corner Bakery came to us ranking 18th for \"bakery near me\". Six months later they own the top spot \u2014 and the foot traffic that comes with it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "18 \u2192 1",
    label: "local rank",
    tone: "brand",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "+214%",
    label: "Google calls",
    size: "lg"
  }))), /*#__PURE__*/React.createElement(Card, {
    variant: "elevated",
    pad: "lg",
    style: {
      borderRadius: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 16,
      color: 'var(--ink-900)'
    }
  }, "\"bakery near me\""), /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    dot: true
  }, "Climbing")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-muted)',
      margin: '0 0 20px'
    }
  }, "Local rank position, last 6 months"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12,
      height: 150
    }
  }, bars.map(([m, r]) => {
    const h = 12 + (1 - r / maxRank) * 130;
    const best = r === 1;
    return /*#__PURE__*/React.createElement("div", {
      key: m,
      style: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: best ? 'var(--sky-blue)' : 'var(--ink-400)'
      }
    }, "#", r), /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: h,
        borderRadius: 8,
        background: best ? 'var(--sky-blue)' : 'var(--blue-200)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--text-muted)'
      }
    }, m));
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 20,
      marginTop: 64
    }
  }, quotes.map(([q, name, role]) => /*#__PURE__*/React.createElement(Card, {
    key: name,
    variant: "elevated",
    pad: "md",
    style: {
      borderRadius: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 2,
      color: 'var(--sky-blue)',
      marginBottom: 14
    }
  }, Array.from({
    length: 5
  }).map((_, i) => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    n: "star",
    size: 16
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '600 16px/1.5 var(--font-sans)',
      color: 'var(--ink-800)',
      margin: '0 0 20px'
    }
  }, "\u201C", q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: name
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--ink-900)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, role)))))));
}
window.Results = Results;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Results.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Services.jsx
try { (() => {
/* Trust strip + Services grid (on white). */
function TrustBar() {
  const names = ['Corner Bakery', 'BrightSmile Dental', 'Metro Plumbing', 'The Green Fork', 'City Cycle Co.'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '30px 40px',
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-muted)',
      letterSpacing: '.02em'
    }
  }, "Trusted by 640+ local businesses"), names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontWeight: 800,
      fontSize: 16,
      color: 'var(--ink-300)',
      letterSpacing: '-.01em'
    }
  }, n))));
}
function Services() {
  React.useEffect(refreshIcons);
  const feats = [['map-pin', 'Google Business Profile', 'We tune every field, category and photo so you own the local map pack.'], ['search', 'Local rankings', 'On-page and off-page local SEO that lifts you above the shop down the street.'], ['star', 'Review engine', 'Automated, tasteful review requests that turn happy customers into 5-star proof.'], ['bar-chart-3', 'Plain-English reports', 'One clear monthly report: where you rank, who called, and what we did.']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "services",
    tone: "light"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we do"), /*#__PURE__*/React.createElement("h2", {
    style: {
      font: '800 40px/1.05 var(--font-sans)',
      letterSpacing: '-0.03em',
      color: 'var(--ink-900)',
      margin: '16px 0 14px'
    }
  }, "Everything a local business needs to get found."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 18px/1.55 var(--font-sans)',
      color: 'var(--text-body)'
    }
  }, "No jargon, no lock-in. Just the handful of things that actually move you up the local results \u2014 done properly, every month.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, feats.map(([ic, title, desc]) => /*#__PURE__*/React.createElement(Card, {
    key: title,
    variant: "outline",
    pad: "md",
    hover: true,
    style: {
      borderRadius: 22
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 16,
      background: 'var(--color-brand-tint)',
      color: 'var(--sky-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: ic,
    size: 24
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '700 20px/1.2 var(--font-sans)',
      color: 'var(--ink-900)',
      margin: '0 0 8px'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 15px/1.55 var(--font-sans)',
      color: 'var(--text-body)',
      margin: 0
    }
  }, desc)))));
}
window.TrustBar = TrustBar;
window.Services = Services;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* Audit modal + full-page composition. */
function AuditModal({
  open,
  onClose
}) {
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      setDone(false);
      refreshIcons();
    }
  }, [open]);
  React.useEffect(refreshIcons);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(14,14,16,0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 460,
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "elevated",
    pad: "lg",
    style: {
      borderRadius: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    tone: "onLight",
    knockout: "#fff",
    size: 24
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 'none',
      background: 'var(--ink-50)',
      width: 34,
      height: 34,
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--ink-600)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "x",
    size: 18
  }))), done ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '18px 0 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      background: 'var(--success-soft)',
      color: 'var(--success)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    n: "check",
    size: 30
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '800 26px/1.1 var(--font-sans)',
      color: 'var(--ink-900)',
      margin: '0 0 8px',
      letterSpacing: '-.02em'
    }
  }, "Audit on its way!"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 16px/1.5 var(--font-sans)',
      color: 'var(--text-body)',
      margin: '0 0 22px'
    }
  }, "Check your inbox in the next few minutes for your free local-search audit."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    onClick: onClose
  }, "Done")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: '800 26px/1.1 var(--font-sans)',
      color: 'var(--ink-900)',
      margin: '14px 0 6px',
      letterSpacing: '-.02em'
    }
  }, "Get your free audit"), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '500 15px/1.5 var(--font-sans)',
      color: 'var(--text-body)',
      margin: '0 0 22px'
    }
  }, "See exactly where you rank locally \\u2014 and how to climb."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setDone(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Business name",
    placeholder: "e.g. Corner Bakery",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "store",
      size: 18
    }),
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    type: "email",
    placeholder: "you@business.com",
    icon: /*#__PURE__*/React.createElement(Icon, {
      n: "mail",
      size: 18
    }),
    required: true
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      n: "arrow-right",
      size: 18
    })
  }, "Send my audit"))))));
}
function SiteApp() {
  const [audit, setAudit] = React.useState(false);
  const openAudit = () => setAudit(true);
  React.useEffect(refreshIcons);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    onAudit: openAudit
  }), /*#__PURE__*/React.createElement(Hero, {
    onAudit: openAudit
  }), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Results, null), /*#__PURE__*/React.createElement(Pricing, {
    onAudit: openAudit
  }), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(CtaBand, {
    onAudit: openAudit
  }), /*#__PURE__*/React.createElement(SiteFooter, null), /*#__PURE__*/React.createElement(AuditModal, {
    open: audit,
    onClose: () => setAudit(false)
  }));
}
window.AuditModal = AuditModal;
window.SiteApp = SiteApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shared.jsx
try { (() => {
/* SimplyCity website — shared helpers. Loaded before section files. */
const DS = window.SimplyCityDesignSystem_416ef3;
const {
  Button,
  Badge,
  Eyebrow,
  Logo,
  Card,
  Stat,
  Avatar,
  Input,
  Accordion
} = DS;

// Lucide icon as a React element
function Icon({
  n,
  size = 20,
  style
}) {
  return React.createElement('i', {
    'data-lucide': n,
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      ...style
    }
  });
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

// Section wrapper with consistent gutters + max width
function Section({
  id,
  tone = 'light',
  pad = true,
  children,
  style
}) {
  const bg = tone === 'blue' ? 'var(--sky-blue)' : tone === 'tint' ? 'var(--surface-subtle)' : tone === 'ink' ? 'var(--ink-900)' : 'var(--white)';
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      background: bg,
      padding: pad ? '112px 0' : 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '0 40px'
    }
  }, children));
}
Object.assign(window, {
  DS,
  Button,
  Badge,
  Eyebrow,
  Logo,
  Card,
  Stat,
  Avatar,
  Input,
  Accordion,
  Icon,
  refreshIcons,
  Section
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Input = __ds_scope.Input;

})();
