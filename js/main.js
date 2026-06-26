  // Header scroll state + progress bar
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const toTop = document.getElementById('toTop');

  function onScroll(){
    const sc = window.scrollY;
    header.classList.toggle('scrolled', sc > 30);
    toTop.classList.toggle('show', sc > 500);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? (sc / max * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  // Mobile nav
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileNav(){
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
    navBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleMobileNav(){
    const isOpen = mobileNav.classList.contains('open');
    if(isOpen){ closeMobileNav(); }
    else{
      burger.classList.add('open');
      mobileNav.classList.add('open');
      navBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  burger.addEventListener('click', toggleMobileNav);
  burger.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      toggleMobileNav();
    }
  });
  navBackdrop.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));

  // Smooth-scroll anchor offset correction not needed (scroll-behavior:smooth + fixed header already accounted for via padding-top on sections)
