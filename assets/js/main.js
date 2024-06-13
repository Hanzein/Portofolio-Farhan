

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  //   /**
  //  * Service Flip card
  //  */
  // document.addEventListener('DOMContentLoaded', function() {
  //   const cards = document.querySelectorAll('.flip-card');
  
  //   cards.forEach(card => {
  //     card.addEventListener('click', function() {
  //       this.querySelector('.flip-card-inner').classList.toggle('is-flipped');
  //     });
  //   });
  // });
  document.querySelectorAll('.icon-box').forEach(box => {
    box.addEventListener('mouseover', () => {
      AOS.refresh();
    });
  });

  const servicesDescription = [
    "Android app development via Kotlin and Flutter\n- Splash Screen\n- Firebase Auth/Cloud\n- REST APIs\n- CRUD \n- ML Integrated and more...!",
    "Modern UI/UX Designing\n- Figma\n- Mobile & Web designs\n- Interactive UI designs\n- Responsiveness\n- and more..!",
    "Front End Web Development using flutter, HTML, CSS, Javascript\n- Login/Register\n- REST API\n- CRUD and more...!",
  ];

  const servicesData = [
    {
      title: "Mobile App Development",
      img: "assets/img/service/app.png",
      description: servicesDescription[0],
      iconBoxClass: "iconbox-blue"
    },
    {
      title: "UI/UX Designing",
      img: "assets/img/service/ui.png",
      description: servicesDescription[1],
      iconBoxClass: "iconbox-orange"
    },
    {
      title: "Front End Web Development",
      img: "assets/img/service/open_b.png",
      description: servicesDescription[2],
      iconBoxClass: "iconbox-pink"
    }
  ];

  const servicesList = document.getElementById('services-list');

  servicesData.forEach((service, index) => {
    const serviceItem = document.createElement('div');
    serviceItem.className = `col-lg-4 col-md-6 d-flex align-items-stretch ${index > 0 ? 'mt-4 mt-md-0' : ''}`;
    serviceItem.dataset.aos = 'zoom-in';
    serviceItem.dataset.aosDelay = (index + 1) * 100;

    serviceItem.innerHTML = `
      <div class="icon-box ${service.iconBoxClass}">
        <div class="icon">
          <img src="${service.img}" width="100" height="100" viewBox="0 0 600 600" alt="">
        </div>
        <h4>${service.title}</h4>
        <p>Click for more details information</p>
        <div class="details">
          <p>${service.description.replace(/\n/g, '<br>')}</p>
        </div>
      </div>
    `;

    servicesList.appendChild(serviceItem);
  });
  
  

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()