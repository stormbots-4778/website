/* ========================================
   STORMBOTS 4778 - Main JavaScript
   Handles all interactive functionality
======================================== */

// API endpoint for calendar data
const CALENDAR_API_URL = 'https://api.chanrobotics.org/web-cal/4778/';

// Cache for calendar data
let calendarDataCache = null;

document.addEventListener('DOMContentLoaded', async () => {
  initHeader();
  initMobileMenu();
  initScrollingLogos();
  initCarousel();
  initCurrentYear();
  initSmoothScroll();
  
  // Fetch calendar data once and use for both meetings and competitions
  const data = await fetchCalendarData();
  if (data) {
    loadMeetings(data);
    loadCompetitions(data);
  }
});

/* ----------------------------------------
   Fetch Calendar Data from API
---------------------------------------- */
async function fetchCalendarData() {
  if (calendarDataCache) {
    return calendarDataCache;
  }
  
  try {
    const response = await fetch(CALENDAR_API_URL);
    const data = await response.json();
    calendarDataCache = data;
    return data;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    return null;
  }
}

/* ----------------------------------------
   Header Scroll Effect
---------------------------------------- */
function initHeader() {
  const header = document.getElementById('header');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/* ----------------------------------------
   Mobile Menu Toggle
---------------------------------------- */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');

  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = !mobileNav.classList.contains('hidden');
    
    if (isOpen) {
      mobileNav.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    } else {
      mobileNav.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
    }
  });
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  
  mobileNav.classList.add('hidden');
  menuIcon.classList.remove('hidden');
  closeIcon.classList.add('hidden');
}

/* ----------------------------------------
   Scroll to Top
---------------------------------------- */
function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ----------------------------------------
   Scroll to About Section
---------------------------------------- */
function scrollToAbout() {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
}

/* ----------------------------------------
   Meeting Calendar - API Powered
---------------------------------------- */
async function loadMeetings(data) {
  const calendarGrid = document.getElementById('calendarGrid');
  if (!calendarGrid) return;

  try {
    if (!data || !data.meetings || !data.meetings.success) {
      console.warn('No meeting data from API, using fallback');
      renderFallbackCalendar(calendarGrid);
      return;
    }

    const today = new Date();
    
    // Find Monday of current week (Monday = 1, Sunday = 0)
    const currentDay = today.getDay();
    const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1;
    const weekMonday = new Date(today);
    weekMonday.setDate(today.getDate() - daysFromMonday);
    weekMonday.setHours(0, 0, 0, 0);
    
    // Find Sunday of current week
    const weekSunday = new Date(weekMonday);
    weekSunday.setDate(weekMonday.getDate() + 6);
    weekSunday.setHours(23, 59, 59, 999);
    
    let meetings = data.meetings.events || [];

    // Create a map of dates with meetings
    const meetingsByDate = new Map();
    meetings.forEach(meeting => {
      const dateStr = meeting.start_date;
      let dateKey;
      if (dateStr.includes('T')) {
        dateKey = dateStr.split('T')[0];
      } else {
        dateKey = dateStr.substring(0, 10);
      }
      
      const meetingDate = new Date(meeting.start_date);
      if (meetingDate >= weekMonday && meetingDate <= weekSunday) {
        if (!meetingsByDate.has(dateKey)) {
          meetingsByDate.set(dateKey, []);
        }
        meetingsByDate.get(dateKey).push(meeting);
      }
    });

    // Generate calendar for the week starting Monday
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekMonday);
      date.setDate(weekMonday.getDate() + i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      
      const isToday = today.toDateString() === date.toDateString();
      
      const year = date.getFullYear();
      const monthNum = String(date.getMonth() + 1).padStart(2, '0');
      const dayNum = String(date.getDate()).padStart(2, '0');
      const dateKey = `${year}-${monthNum}-${dayNum}`;
      const dayMeetings = meetingsByDate.get(dateKey) || [];

      days.push({ date, dayName, dayNumber, month, isToday, meetings: dayMeetings });
    }

    calendarGrid.innerHTML = days.map((day) => {
      const hasMeeting = day.meetings.length > 0;
      let classes = 'calendar-day';
      if (day.isToday) classes += ' is-today';
      if (hasMeeting) classes += ' has-meeting';

      // Format meeting time if available
      let meetingInfo = '';
      if (hasMeeting) {
        const meeting = day.meetings[0];
        const startTime = formatTime(meeting.start_date);
        const endTime = meeting.end_date ? formatTime(meeting.end_date) : '';
        const timeStr = endTime ? `${startTime} - ${endTime}` : startTime;
        const title = meeting.title || 'Team Meeting';
        
        meetingInfo = `
          <div class="calendar-meeting">
            <div class="calendar-meeting-time">${timeStr}</div>
            <div class="calendar-meeting-type">${title}</div>
          </div>
        `;
      }

      return `
        <div class="${classes}">
          <div class="calendar-day-header">
            <div class="calendar-weekday">${day.dayName}</div>
            <div class="calendar-date">${day.dayNumber}</div>
            <div class="calendar-month">${day.month}</div>
          </div>
          ${meetingInfo}
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading meetings:', error);
    renderFallbackCalendar(calendarGrid);
  }
}

// Fallback calendar when API is unavailable
function renderFallbackCalendar(calendarGrid) {
  const today = new Date();
  const days = [];

  // Get yesterday, today, and next 5 days
  for (let i = -1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  // Fallback meeting schedule: Tuesdays (2), Thursdays (4), and Fridays (5)
  const meetingDays = [2, 4, 5];
  const meetingTime = '4:00 PM - 8:00 PM';
  const meetingType = 'Team Meeting';

  calendarGrid.innerHTML = days.map((date) => {
    const isToday = date.toDateString() === today.toDateString();
    const hasMeeting = meetingDays.includes(date.getDay());
    
    const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    let classes = 'calendar-day';
    if (isToday) classes += ' is-today';
    if (hasMeeting) classes += ' has-meeting';

    return `
      <div class="${classes}">
        <div class="calendar-day-header">
          <div class="calendar-weekday">${weekday}</div>
          <div class="calendar-date">${dayNum}</div>
          <div class="calendar-month">${month}</div>
        </div>
        ${hasMeeting ? `
          <div class="calendar-meeting">
            <div class="calendar-meeting-time">${meetingTime}</div>
            <div class="calendar-meeting-type">${meetingType}</div>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

/* ----------------------------------------
   Competition Schedule - API Powered
---------------------------------------- */
async function loadCompetitions(data) {
  const competitionsList = document.getElementById('competitionsList');
  if (!competitionsList) return;

  try {
    if (!data || !data.competitions || !data.competitions.success) {
      console.warn('No competition data from API');
      competitionsList.innerHTML = '<p class="no-competitions">No upcoming competitions scheduled.</p>';
      return;
    }
    
    let competitions = data.competitions.events || [];

    // Sort by date
    competitions = competitions.sort((a, b) => 
      new Date(a.start_date) - new Date(b.start_date)
    );

    if (competitions.length === 0) {
      competitionsList.innerHTML = '<p class="no-competitions">No upcoming competitions scheduled.</p>';
      return;
    }

    competitionsList.innerHTML = competitions.map(comp => {
      const dateStr = formatDate(comp.start_date);
      const location = comp.location || 'Location TBA';
      const title = comp.title || 'Competition';

      return `
        <div class="competition-card">
          <div class="competition-corner-tl"></div>
          <div class="competition-corner-br"></div>
          <div class="competition-content">
            <div class="competition-info">
              <h3 class="competition-name">${title}</h3>
              <div class="competition-details">
                <div class="competition-detail">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>${dateStr}</span>
                </div>
                <div class="competition-detail">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>${location}</span>
                </div>
              </div>
            </div>
            <div class="competition-status-wrap">
              <span class="competition-status">UPCOMING</span>
              <svg class="icon competition-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading competitions:', error);
  }
}

/* ----------------------------------------
   Date/Time Formatting Helpers
---------------------------------------- */
function formatDate(dateString) {
  // Parse date without timezone conversion
  const [datePart] = dateString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function formatTime(dateString) {
  // Parse time directly from string without timezone conversion
  if (!dateString.includes('T')) {
    return '';
  }
  
  const timePart = dateString.split('T')[1];
  const [hours, minutes] = timePart.split(':').map(Number);
  
  // Convert to 12-hour format
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  const minuteStr = minutes.toString().padStart(2, '0');
  
  return `${hour12}:${minuteStr} ${period}`;
}

/* ----------------------------------------
   Scrolling Logos - Two Mega Strips Logic
---------------------------------------- */
function initScrollingLogos() {
  const SCROLL_SPEED = 50; // pixels per second
  
  // Sponsor data with widths based on logo shape (wider logos get more space)
  const SPONSORS = [
    { url: 'https://district112.org', img: 'assets/logos/ECCS.svg', alt: 'Eastern Carver County Schools', width: 180 },
    { url: 'https://www.ghaasfoundation.org/', img: 'assets/logos/GeneHaas.svg', alt: 'Gene Haas Foundation', width: 180 },
    { url: 'https://www.meander-creative.com/', img: 'assets/logos/Meander.svg', alt: 'Meander Creative', width: 320 },
    { url: 'https://www.mitgr.com/', img: 'assets/logos/Macsteel.svg', alt: 'Macsteel International', width: 240 }
  ];

  let container, strip1, strip2;
  let stripWidth = 0;
  let pos1 = 0, pos2 = 0;
  let lastTimestamp = 0;
  let animationFrameId;

  function createLogoElement(sponsor) {
    const link = document.createElement('a');
    link.href = sponsor.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'logo-scroll-item';
    link.style.width = sponsor.width + 'px';
    link.style.flexShrink = '0';
    link.style.display = 'flex';
    link.style.alignItems = 'center';
    link.style.justifyContent = 'center';
    link.style.padding = '0 1rem';
    link.style.height = '100%';
    
    const img = document.createElement('img');
    img.src = sponsor.img;
    img.alt = sponsor.alt;
    img.draggable = false;
    img.style.height = '100%';
    img.style.width = '100%';
    img.style.objectFit = 'contain';
    img.style.filter = 'brightness(0) invert(1) opacity(0.85)';
    img.style.transition = 'filter 0.3s ease';
    
    link.appendChild(img);
    
    // Hover effect
    link.addEventListener('mouseenter', () => {
      img.style.filter = 'brightness(0) invert(1) opacity(1)';
    });
    link.addEventListener('mouseleave', () => {
      img.style.filter = 'brightness(0) invert(1) opacity(0.85)';
    });
    
    return link;
  }

  function buildStrip() {
    const strip = document.createElement('div');
    strip.style.display = 'flex';
    strip.style.alignItems = 'center';
    strip.style.position = 'absolute';
    strip.style.top = '0';
    strip.style.left = '0';
    strip.style.height = '100%';
    strip.style.willChange = 'transform';

    container.appendChild(strip);
    
    // Add at least one full set
    SPONSORS.forEach(s => strip.appendChild(createLogoElement(s)));
    
    // Keep adding sets until wider than screen + buffer
    while (strip.scrollWidth < window.innerWidth + 500) {
      SPONSORS.forEach(s => strip.appendChild(createLogoElement(s)));
    }
    
    stripWidth = strip.scrollWidth;
    container.removeChild(strip);
    
    return strip;
  }

  function init() {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    container = document.getElementById('sponsorScrollContainer');
    const scrollingLogosSection = document.getElementById('scrollingLogos');
    
    if (!container || !scrollingLogosSection) return;

    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.overflow = 'hidden';
    container.style.height = '100px';
    container.style.width = '100%';

    // Create the "Mega Strip"
    const baseStrip = buildStrip();

    // Create two identical instances
    strip1 = baseStrip.cloneNode(true);
    strip2 = baseStrip.cloneNode(true);

    // Set initial positions
    pos1 = 0;
    pos2 = stripWidth;

    container.appendChild(strip1);
    container.appendChild(strip2);

    // Start Animation
    lastTimestamp = performance.now();
    requestAnimationFrame(animate);
  }

  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    // Move both strips left
    const move = SCROLL_SPEED * dt;
    pos1 -= move;
    pos2 -= move;

    // Recycle logic
    if (pos1 <= -stripWidth) {
      pos1 += stripWidth * 2;
    }
    if (pos2 <= -stripWidth) {
      pos2 += stripWidth * 2;
    }
    
    // Failsafe for gaps
    if (Math.abs(pos1 - pos2) > stripWidth + 10) {
      if (pos1 < pos2) pos1 = pos2 - stripWidth;
      else pos2 = pos1 - stripWidth;
    }

    // Apply positions
    strip1.style.transform = `translate3d(${pos1}px, 0, 0)`;
    strip2.style.transform = `translate3d(${pos2}px, 0, 0)`;

    animationFrameId = requestAnimationFrame(animate);
  }

  // Boot up
  init();

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 200);
  });
}

/* ----------------------------------------
   Team Photos Carousel
---------------------------------------- */
let carouselCurrentIndex = 0;
let carouselImages = [];

async function initCarousel() {
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const carouselContainer = document.getElementById('photosCarousel');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (!carouselTrack || !carouselContainer) return;

  try {
    // Try to load photos from the JSON file
    const response = await fetch('assets/photos/photos.json');
    if (!response.ok) throw new Error('Could not load photos data');
    
    const photosData = await response.json();
    
    if (!photosData || photosData.length === 0) {
      carouselContainer.style.display = 'none';
      return;
    }

    carouselImages = photosData;

    // Create carousel slides
    carouselTrack.innerHTML = photosData.map((item, index) => `
      <div class="carousel-slide" data-index="${index}">
        <img src="assets/photos/${item.filename}" alt="${item.caption}">
      </div>
    `).join('');

    // Create dots
    carouselDots.innerHTML = photosData.map((_, index) => `
      <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
    `).join('');

    // Add event listeners
    prevBtn.addEventListener('click', () => {
      carouselCurrentIndex = (carouselCurrentIndex - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      carouselCurrentIndex = (carouselCurrentIndex + 1) % carouselImages.length;
      updateCarousel();
    });

    // Dot click handlers
    carouselDots.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        carouselCurrentIndex = parseInt(dot.dataset.index);
        updateCarousel();
      });
    });

    // Auto-advance every 5 seconds
    setInterval(() => {
      carouselCurrentIndex = (carouselCurrentIndex + 1) % carouselImages.length;
      updateCarousel();
    }, 5000);

  } catch (error) {
    console.warn('Could not load outreach images:', error);
    carouselContainer.style.display = 'none';
  }
}

function updateCarousel() {
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  
  if (!carouselTrack) return;

  // Update track position
  carouselTrack.style.transform = `translateX(-${carouselCurrentIndex * 100}%)`;
  carouselTrack.style.transition = 'transform 0.3s ease';

  // Update dots
  carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
    if (index === carouselCurrentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

/* ----------------------------------------
   Current Year in Footer
---------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* ----------------------------------------
   Smooth Scroll for Anchor Links
---------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return; // Skip if just "#"
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
