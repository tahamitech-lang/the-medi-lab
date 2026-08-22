/* ═══════════════════════════════════════════════════
   loader-nav.js (Ultra Premium — FIXED)
   — Injects site-wide enhancements into every page
   — Premium 1-second loading screen (NO image, NO label)
   — Fixed: Back button, stuck loading, professional transitions
═══════════════════════════════════════════════════ */

(function () {

  /* ── 1. Google Fonts: Inter ── */
  if (!document.querySelector('link[href*="Inter"]')) {
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(fontLink);
  }

  /* ── 2. Font Awesome ── */
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
    document.head.appendChild(faLink);
  }

  /* ── 3. AOS CSS ── */
  if (!document.querySelector('link[href*="aos"]')) {
    var aosLink = document.createElement('link');
    aosLink.rel = 'stylesheet';
    aosLink.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
    document.head.appendChild(aosLink);
  }

  /* ── 4. Ultra Premium global styles ── */
  var style = document.createElement('style');
  style.textContent = `
    /* Font */
    body { font-family: 'Inter','Segoe UI',Tahoma,Geneva,Verdana,sans-serif !important; }

    /* Remove underlines & blue from links globally */
    a { text-decoration: none !important; color: inherit; cursor: pointer; }
    a:hover, a:visited, a:active { text-decoration: none !important; }

    /* ── ULTRA PREMIUM LOADING SCREEN ── */
    #_loader {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: radial-gradient(ellipse at center, #0f1f0e 0%, #060d05 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), 
                  visibility 0.8s cubic-bezier(0.65, 0, 0.35, 1),
                  transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
    #_loader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: scale(1.05);
    }

    /* ── Loading ring container ── */
    #_loader .loader-wrap {
      position: relative;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Outer ring ── */
    #_loader .loader-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(79, 240, 84, 0.06);
    }

    /* ── Premium spinner ── */
    #_loader .spinner {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 2.5px solid rgba(79, 240, 84, 0.1);
      border-top: 2.5px solid #4ff054;
      border-right: 2.5px solid #2d970d;
      border-bottom: 2.5px solid rgba(79, 240, 84, 0.3);
      animation: ultraSpin 1s cubic-bezier(0.65, 0, 0.35, 1) infinite;
      box-shadow: 
        0 0 60px rgba(79, 240, 84, 0.06),
        inset 0 0 60px rgba(79, 240, 84, 0.03);
      filter: drop-shadow(0 0 20px rgba(79, 240, 84, 0.08));
    }

    @keyframes ultraSpin {
      0% { 
        transform: rotate(0deg) scale(0.92); 
        border-top-color: #4ff054;
        border-right-color: #2d970d;
      }
      25% {
        border-top-color: #2d970d;
        border-right-color: #4ff054;
      }
      50% { 
        transform: rotate(180deg) scale(1.08); 
        border-top-color: #4ff054;
        border-right-color: #2d970d;
      }
      75% {
        border-top-color: #2d970d;
        border-right-color: #4ff054;
      }
      100% { 
        transform: rotate(360deg) scale(0.92); 
        border-top-color: #4ff054;
        border-right-color: #2d970d;
      }
    }

    /* ── Pulsing glow rings ── */
    #_loader .glow-ring {
      position: absolute;
      inset: -12px;
      border-radius: 50%;
      border: 1px solid rgba(79, 240, 84, 0.04);
      animation: glowPulse 2.8s ease-in-out infinite;
    }
    #_loader .glow-ring:nth-child(2) {
      inset: -24px;
      animation-delay: 0.7s;
    }
    #_loader .glow-ring:nth-child(3) {
      inset: -36px;
      animation-delay: 1.4s;
    }

    @keyframes glowPulse {
      0%, 100% { 
        transform: scale(0.95); 
        opacity: 0.2;
        border-color: rgba(79, 240, 84, 0.04);
      }
      50% { 
        transform: scale(1.05); 
        opacity: 0.8;
        border-color: rgba(79, 240, 84, 0.12);
      }
    }

    /* ── Subtle particles ── */
    #_loader .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: rgba(79, 240, 84, 0.15);
      animation: particleFloat 3s ease-in-out infinite;
    }
    #_loader .particle:nth-child(4) { top: -10px; left: 50%; animation-delay: 0s; }
    #_loader .particle:nth-child(5) { bottom: -10px; left: 30%; animation-delay: 0.8s; }
    #_loader .particle:nth-child(6) { top: 50%; right: -10px; animation-delay: 1.6s; }
    #_loader .particle:nth-child(7) { top: 30%; left: -10px; animation-delay: 2.4s; }

    @keyframes particleFloat {
      0%, 100% { 
        transform: translate(0, 0) scale(1); 
        opacity: 0.15;
      }
      50% { 
        transform: translate(8px, -12px) scale(1.8); 
        opacity: 0.6;
      }
    }

    /* ── Scroll-to-top (Ultra Premium) ── */
    #_stt {
      position: fixed; bottom: 2rem; right: 2rem; z-index: 900;
      width: 54px; height: 54px; border-radius: 50%;
      background: linear-gradient(135deg, #2d970d, #4ff054);
      color: #fff; border: none; cursor: pointer; font-size: 1.2rem;
      box-shadow: 0 8px 32px rgba(45,151,13,.4);
      opacity: 0; transform: translateY(20px) scale(0.85);
      transition: opacity .4s cubic-bezier(.34,1.56,.64,1), 
                  transform .4s cubic-bezier(.34,1.56,.64,1), 
                  box-shadow .4s;
      display: flex; align-items: center; justify-content: center;
    }
    #_stt::after {
      content: '';
      position: absolute; inset: -3px;
      border-radius: 50%;
      background: linear-gradient(135deg, #2d970d, #4ff054);
      opacity: 0.3;
      filter: blur(12px);
      z-index: -1;
      transition: opacity .4s;
    }
    #_stt.show { opacity: 1; transform: translateY(0) scale(1); }
    #_stt:hover {
      transform: translateY(-4px) scale(1.1) !important;
      box-shadow: 0 12px 48px rgba(79,240,84,.6) !important;
    }
    #_stt:hover::after { opacity: 0.6; }

    /* ── Navbar glass on scroll (Ultra Premium) ── */
    nav { transition: background .6s, box-shadow .6s, padding .6s, backdrop-filter .6s !important; }
    nav.nav-scrolled {
      background: rgba(10,28,8,.95) !important;
      backdrop-filter: blur(28px) !important;
      -webkit-backdrop-filter: blur(28px) !important;
      box-shadow: 0 4px 48px rgba(0,0,0,.6), 0 1px 0 rgba(79,240,84,.06) inset !important;
      padding: .4rem 0 !important;
      border-bottom: 1px solid rgba(79,240,84,.06) !important;
    }

    /* ── Logo image glow (Ultra Premium) ── */
    .logo-img {
      border: 2px solid rgba(79,240,84,.4) !important;
      box-shadow: 0 0 24px rgba(79,240,84,.2) !important;
      transition: transform .6s cubic-bezier(.34,1.56,.64,1), 
                  box-shadow .6s cubic-bezier(.34,1.56,.64,1) !important;
      border-radius: 14px !important;
    }
    .logo:hover .logo-img {
      transform: rotate(4deg) scale(1.1) !important;
      box-shadow: 0 0 48px rgba(79,240,84,.6) !important;
    }

    /* ── Ultra Premium cta-btn ── */
    .cta-btn {
      background: linear-gradient(135deg, #4ff054, #175308) !important;
      color: #fff !important;
      padding: .75rem 2rem !important;
      border-radius: 60px !important;
      font-weight: 700 !important;
      letter-spacing: 0.03em;
      box-shadow: 0 4px 24px rgba(79,240,84,.35) !important;
      transition: transform .4s cubic-bezier(.34,1.56,.64,1), 
                  box-shadow .4s !important;
      border: none !important;
      position: relative;
      overflow: hidden;
    }
    .cta-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,.18), transparent);
      opacity: 0;
      transition: opacity .5s;
    }
    .cta-btn::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(135deg, transparent, rgba(255,255,255,.05));
      opacity: 0;
      transition: opacity .5s;
    }
    .cta-btn:hover::before { opacity: 1; }
    .cta-btn:hover::after { opacity: 1; }
    .cta-btn:hover {
      transform: translateY(-3px) scale(1.03) !important;
      box-shadow: 0 12px 40px rgba(79,240,84,.6) !important;
    }

    /* ── Ultra Premium section title underline ── */
    .section-title, .detailed-services h2, .packages-section h2,
    h2.page-title, .page-header h1 {
      position: relative;
    }
    .s-underline::after,
    .section-title::after {
      content: '';
      display: block;
      width: 80px; height: 4px;
      background: linear-gradient(90deg, #2d970d, #4ff054, #2d970d, #4ff054);
      background-size: 300% 100%;
      border-radius: 4px;
      margin: .7rem auto 0;
      animation: shimmerLine 4s ease-in-out infinite;
    }
    @keyframes shimmerLine {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 100% 0%; }
    }

    /* ── Page header hero animation ── */
    .page-header h1 { animation: _hFade .9s ease .2s both; }
    .page-header p  { animation: _hFade .9s ease .4s both; }
    @keyframes _hFade { from{opacity:0;transform:translateY(28px) scale(0.98);} to{opacity:1;transform:translateY(0) scale(1);} }

    /* ── Ultra Premium page-header overlay ── */
    .page-header {
      position: relative !important;
      overflow: hidden !important;
      padding-top: 110px !important;
    }
    .page-header::before {
      content: '';
      position: absolute; inset: 0; pointer-events: none;
      background: 
        linear-gradient(rgba(79,240,84,.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(79,240,84,.02) 1px, transparent 1px),
        radial-gradient(ellipse at 50% 30%, rgba(79,240,84,.02), transparent 70%);
      background-size: 40px 40px, 40px 40px, 100% 100%;
      z-index: 0;
    }
    .page-header > * { position: relative; z-index: 1; }

    /* ── Ultra Premium card hover ── */
    .card, .pricing-card, .highlight-card, .why-card,
    .service-card, .package-card, .detailed-item,
    .mv-card, .team-card, .cert-card, .info-item,
    .why-choose-item, .testimonial-card, .stat-box {
      transition: transform .5s cubic-bezier(.34,1.56,.64,1), 
                  box-shadow .5s,
                  border-color .5s !important;
      border: 1px solid rgba(255,255,255,.03);
    }
    .card:hover, .pricing-card:hover, .highlight-card:hover,
    .why-card:hover, .mv-card:hover, .team-card:hover,
    .cert-card:hover, .info-item:hover, .why-choose-item:hover,
    .testimonial-card:hover, .stat-box:hover {
      transform: translateY(-14px) scale(1.015) !important;
      box-shadow: 0 28px 64px rgba(45,151,13,.15), 
                  0 0 0 1px rgba(79,240,84,.08) !important;
      border-color: rgba(79,240,84,.12) !important;
    }

    /* ── AOS scroll-fade ── */
    .scroll-fade {
      opacity: 0;
      transform: translateY(36px) scale(0.98);
      transition: opacity .8s cubic-bezier(.34,1.56,.64,1), 
                  transform .8s cubic-bezier(.34,1.56,.64,1) !important;
    }
    .scroll-fade.visible {
      opacity: 1 !important;
      transform: translateY(0) scale(1) !important;
    }

    /* ── Premium button ripple ── */
    @keyframes _ripple { 
      0% { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; } 
    }

    /* ── Footer link hover ── */
    .footer-section a:hover {
      color: #4ff054 !important;
      padding-left: 8px !important;
      transform: translateX(2px);
    }
    .footer-section a {
      transition: color .3s, padding-left .3s, transform .3s !important;
      display: inline-block;
    }

    /* ── Ultra Premium scrollbar ── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0b1a0a; }
    ::-webkit-scrollbar-thumb { 
      background: linear-gradient(180deg, #2d970d, #4ff054, #2d970d);
      background-size: 100% 200%;
      border-radius: 10px;
      animation: scrollBar 3s ease-in-out infinite;
    }
    @keyframes scrollBar {
      0%, 100% { background-position: 0% 0%; }
      50% { background-position: 0% 100%; }
    }
    ::-webkit-scrollbar-thumb:hover { 
      background: linear-gradient(180deg, #4ff054, #2d970d);
    }
  `;
  document.head.appendChild(style);

  /* ── 5. Inject Ultra Premium Loading Screen ── */
  var loader = document.createElement('div');
  loader.id = '_loader';
  loader.innerHTML = `
    <div class="loader-wrap">
      <div class="glow-ring"></div>
      <div class="glow-ring"></div>
      <div class="glow-ring"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="spinner"></div>
    </div>
  `;
  document.body.insertBefore(loader, document.body.firstChild);

  /* ── 6. Inject scroll-to-top button ── */
  var stt = document.createElement('button');
  stt.id = '_stt';
  stt.title = 'Back to top';
  stt.innerHTML = '<i class="fas fa-chevron-up"></i>';
  document.body.insertBefore(stt, document.body.firstChild);
  stt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 7. Hide loader after 1.2 seconds ── */
  var loaderTimeout = setTimeout(function () {
    loader.classList.add('hidden');
  }, 1200);

  function onReady(callback) {
    if (document.readyState !== 'loading') return callback();
    document.addEventListener('DOMContentLoaded', callback);
  }

  onReady(function () {

    /* ── 8. Load AOS + GSAP scripts then init ── */
    function loadScript(src, cb) {
      if (document.querySelector('script[src="' + src + '"]')) { if (cb) cb(); return; }
      var s = document.createElement('script');
      s.src = src;
      s.onload = cb || null;
      document.body.appendChild(s);
    }

    function initEnhancements() {
      if (window.AOS) {
        AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 50 });
        document.querySelectorAll(
          '.card, .pricing-card, .highlight-card, .package-card, .detailed-item, .why-card, .mv-card, .team-card'
        ).forEach(function (el, i) {
          if (!el.getAttribute('data-aos')) {
            el.setAttribute('data-aos', 'fade-up');
            el.setAttribute('data-aos-delay', String((i % 4) * 80));
          }
        });
        AOS.refresh();
      }

      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        var heroContent = document.querySelector('.hero-content, .hero .text, .hero > div');
        if (heroContent) {
          gsap.fromTo(heroContent.children,
            { y: 35, opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, duration: .85, stagger: .12, ease: 'power3.out', delay: .3 }
          );
        }

        ['service-card', 'package-card', 'pricing-card', 'highlight-card', 'stat-box', 'team-card'].forEach(function (cls) {
          var els = document.querySelectorAll('.' + cls);
          if (els.length) {
            gsap.fromTo(els,
              { y: 45, opacity: 0, scale: 0.97 },
              {
                y: 0, opacity: 1, scale: 1, duration: .65, stagger: .1, ease: 'power2.out',
                scrollTrigger: { trigger: els[0].parentElement, start: 'top 82%', once: true }
              }
            );
          }
        });

        var ctaH = document.querySelector('.cta-section h2');
        if (ctaH) {
          gsap.fromTo(ctaH,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: .8, ease: 'power3.out',
              scrollTrigger: { trigger: ctaH, start: 'top 82%', once: true } }
          );
        }

        var galleryImgs = document.querySelectorAll('.gallery img');
        if (galleryImgs.length) {
          gsap.fromTo(galleryImgs,
            { scale: .85, opacity: 0, rotation: -2 },
            {
              scale: 1, opacity: 1, rotation: 0, duration: .6, stagger: .1, ease: 'back.out(1.6)',
              scrollTrigger: { trigger: '.gallery', start: 'top 85%', once: true }
            }
          );
        }
      }

      var sfObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('visible'); sfObs.unobserve(e.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -70px 0px' });
      document.querySelectorAll('.scroll-fade').forEach(function (el) { sfObs.observe(el); });

      document.querySelectorAll(
        '.card, .pricing-card, .highlight-card, .why-card, .mv-card, .team-card, .stat-box, .info-item'
      ).forEach(function (el) {
        if (!el.classList.contains('scroll-fade')) {
          el.classList.add('scroll-fade');
          sfObs.observe(el);
        }
      });
    }

    /* ── 9. Navbar scroll + stt visibility ── */
    var nav = document.querySelector('nav');
    function refreshNavState() {
      if (!nav) nav = document.querySelector('nav');
      if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 60);
      stt.classList.toggle('show', window.scrollY > 400);
    }

    window.addEventListener('scroll', refreshNavState, { passive: true });
    refreshNavState();

    /* ── 10. Smooth hash scroll ── */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var h = this.getAttribute('href');
        if (h !== '#') {
          var t = document.querySelector(h);
          if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
      });
    });

    /* ── 11. Premium button ripple ── */
    document.querySelectorAll('button, .cta-btn, .package-btn, .filter-btn, .btn-primary, .btn-secondary, .submit-btn, .book-btn, .service-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var r = document.createElement('span');
        var rc = btn.getBoundingClientRect();
        var sz = Math.max(rc.width, rc.height);
        r.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,.3);width:' + sz + 'px;height:' + sz + 'px;left:' + (e.clientX - rc.left - sz / 2) + 'px;top:' + (e.clientY - rc.top - sz / 2) + 'px;transform:scale(0);animation:_ripple .6s cubic-bezier(.34,1.56,.64,1);pointer-events:none';
        btn.style.position = 'relative'; btn.style.overflow = 'hidden';
        btn.appendChild(r);
        setTimeout(function () { if (r.parentNode) r.remove(); }, 620);
      });
    });

    /* ── 12. FIXED: Loading on link click ── */
    var isNavigating = false;

    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var trimmed = href.trim();
      if (
        trimmed === '' ||
        trimmed.startsWith('#') ||
        trimmed.startsWith('mailto:') ||
        trimmed.startsWith('tel:') ||
        trimmed.startsWith('javascript:') ||
        trimmed.toLowerCase().includes('loading.html') ||
        trimmed.toLowerCase().includes('home.html') && trimmed.startsWith('#')
      ) return;

      try {
        var url = new URL(trimmed, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (!url.pathname.toLowerCase().endsWith('.html') && !url.pathname.toLowerCase().endsWith('/')) {
          // Allow links without .html (like home)
        }
      } catch (_) { return; }

      link.addEventListener('click', function (event) {
        // Prevent multiple simultaneous navigations
        if (isNavigating) {
          event.preventDefault();
          return;
        }

        // Check if link is a CTA or package button that already shows alert
        if (this.classList.contains('cta-btn') || this.classList.contains('package-btn')) {
          // These have their own onclick handlers
          return;
        }

        // Check if link has inline onclick
        if (this.hasAttribute('onclick')) {
          // Let inline onclick handle it
          return;
        }

        event.preventDefault();
        isNavigating = true;

        // Show loader
        loader.classList.remove('hidden');

        // Clear any existing timeout
        if (window._navTimeout) {
          clearTimeout(window._navTimeout);
        }

        // Navigate after 1.2 seconds
        window._navTimeout = setTimeout(function () {
          window.location.href = trimmed;
          isNavigating = false;
        }, 1200);
      });
    });

    /* ── 13. Handle back button ── */
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        // Page loaded from cache (back button)
        console.log('🔄 Page restored from cache, hiding loader');
        loader.classList.add('hidden');
        isNavigating = false;
        if (window._navTimeout) {
          clearTimeout(window._navTimeout);
          window._navTimeout = null;
        }
      }
    });

    /* ── 14. Handle popstate (back/forward) ── */
    window.addEventListener('popstate', function() {
      console.log('⏪ Popstate detected, hiding loader');
      loader.classList.add('hidden');
      isNavigating = false;
      if (window._navTimeout) {
        clearTimeout(window._navTimeout);
        window._navTimeout = null;
      }
    });

    /* ── 15. Load AOS → then GSAP → then init ── */
    loadScript('https://unpkg.com/aos@2.3.4/dist/aos.js', function () {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', function () {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js', function () {
          initEnhancements();
        });
      });
    });

    /* ── 16. Dynamic footer year ── */
    document.querySelectorAll('.footer-bottom p, #footerCopy').forEach(function (el) {
      el.innerHTML = el.innerHTML.replace(/202[0-9]/g, new Date().getFullYear());
    });
    var yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();

  });

})();