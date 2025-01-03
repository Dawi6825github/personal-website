import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import '../components/css/Navbar.css';

const Navbar = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'auto');

  // Function to apply theme based on selection
  const applyTheme = (theme) => {
    const navbar = document.querySelector('.navbar');

    // Apply styles based on the selected theme
    if (theme === 'auto') {
      const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(systemDarkMode ? 'dark-theme' : 'light-theme');
      navbar.classList.remove('bg-light', 'navbar-light', 'bg-dark', 'navbar-dark');
      navbar.classList.add(systemDarkMode ? 'bg-dark' : 'bg-light', systemDarkMode ? 'navbar-dark' : 'navbar-light');

      // Change body background color based on system preference
      document.body.style.backgroundColor = systemDarkMode ? '#343a40' : '#f8f9fa';
    } else {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${theme}-theme`);

      // Change navbar background and body background based on selected theme
      if (theme === 'light') {
        navbar.classList.remove('bg-dark', 'navbar-dark');
        navbar.classList.add('bg-light', 'navbar-light'); // Set light theme for navbar
        document.body.style.backgroundColor = '#f8f9fa'; // Light background color
      } else {
        navbar.classList.remove('bg-light', 'navbar-light');
        navbar.classList.add('bg-dark', 'navbar-dark'); // Set dark theme for navbar
        document.body.style.backgroundColor = '#343a40'; // Dark background color
      }
    }
  };


  document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      let dropdownMenu = this.nextElementSibling;
      // Toggle the display of the dropdown
      dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
    });
  });
  


  // Use effect to apply the theme on component mount and theme change
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Get the appropriate icon for the current theme
  const getThemeIcon = () => {
    if (theme === 'light') {
      return <i className="fas fa-moon"></i>; // Moon icon for light theme
    } else if (theme === 'dark') {
      return <i className="fas fa-sun"></i>; // Sun icon for dark theme
    } else {
      return <i className="fas fa-adjust"></i>; // Adjust icon for auto theme
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <div className="container">
{/*         <a className="navbar-brand" href="#home">
          <img src='../assets/T.png' alt='logo' />
        </a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home"><i id='fa' className="fas fa-home"></i> Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about"><i id='fa' className="fas fa-info-circle"></i> About</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#TopSkills"><i id='fa' className="fas fa-tools"></i> Top Skills</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#projects"><i id='fa' className="fas fa-tasks"></i> Projects</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#Certification"><i id='fa' className="fa fa-certificate"></i>Certificates</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#Testimonials"><i id='fa' className="fa fa-star"></i>Testimony</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact"><i id='fa' className="fas fa-envelope"></i> Contact</a>
            </li>


            {/* Dropdown for theme selection */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="themeDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {getThemeIcon()} {/* Display the theme icon */}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
                <li>
                  <button className="dropdown-item" onClick={() => setTheme('light')}>
                    <i className="fas fa-moon"></i> Light
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setTheme('dark')}>
                    <i className="fas fa-sun"></i> Dark
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => setTheme('auto')}>
                    <i className="fas fa-adjust"></i> Auto
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
