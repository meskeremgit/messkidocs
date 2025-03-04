let dropdownStates = {
  appFeaturesDropdown: true,
  platformDropdown: true,
  faqDropdown: true
};

let isSidebarOpen = false;

window.onload = () => {
  setActiveLink();
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  const openBtn = document.querySelector(".openbtn");
  
  // Initialize sidebar and button visibility based on screen width
  if (window.innerWidth >= 768) {
    sidebar.classList.add("open");
    main.classList.add("sidebar-open");
    openBtn.style.display = "none";
    isSidebarOpen = true;
  } else {
    sidebar.classList.remove("open");
    main.classList.remove("sidebar-open");
    openBtn.style.display = "flex";
  }

  // Set dark mode state
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
    document.querySelector('.theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Open all dropdowns by default
  document.querySelectorAll('.dropdown-container').forEach(container => {
    container.classList.add('active');
  });

  // Ensure consistent dropdown states
  setDropdownStates();
};

function toggleNav() {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  const openBtn = document.querySelector(".openbtn");

  if (isSidebarOpen) {
    sidebar.classList.remove("open");
    main.classList.remove("sidebar-open");
    openBtn.style.display = "flex";
  } else {
    sidebar.classList.add("open");
    main.classList.add("sidebar-open");
    openBtn.style.display = "none";
  }
  isSidebarOpen = !isSidebarOpen;
}

window.addEventListener("resize", () => {
  const sidebar = document.getElementById("mySidebar");
  const main = document.getElementById("main");
  const openBtn = document.querySelector(".openbtn");
  
  if (window.innerWidth >= 768) {
    sidebar.classList.add("open");
    main.classList.add("sidebar-open");
    openBtn.style.display = "none";
    isSidebarOpen = true;
  } else if (!isSidebarOpen) {
    sidebar.classList.remove("open");
    main.classList.remove("sidebar-open");
    openBtn.style.display = "flex";
  }
});

function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId);
  if (event.target.tagName === 'A') return;
  dropdown.classList.toggle("active");
  dropdownStates[dropdownId] = !dropdownStates[dropdownId];
  localStorage.setItem('dropdownStates', JSON.stringify(dropdownStates));
}

function setActiveLink() {
  const currentPath = window.location.pathname;
  const sidebarLinks = document.querySelectorAll('#mySidebar a');
  sidebarLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.style.background = 'rgba(59, 130, 246, 0.2)';
      link.style.color = '#fff';
    } else {
      link.classList.remove('active');
    }
  });
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDarkMode = document.body.classList.contains('dark');
  themeToggle.innerHTML = isDarkMode 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem('darkMode', isDarkMode);
});

// Sidebar Search
const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const links = document.querySelectorAll('#mySidebar a');
  links.forEach(link => {
    const text = link.textContent.toLowerCase();
    link.style.display = text.includes(query) ? 'flex' : 'none';
  });
});

function setDropdownStates() {
  const savedStates = JSON.parse(localStorage.getItem('dropdownStates'));
  if (savedStates) {
    dropdownStates = savedStates;
    Object.keys(dropdownStates).forEach(id => {
      const dropdown = document.getElementById(id);
      if (dropdownStates[id]) {
        dropdown.classList.add('active');
      } else {
        dropdown.classList.remove('active');
      }
    });
  }
}
