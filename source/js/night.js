(function() {
    /* https://www.imaegoo.com/ */ 
    var isNight = localStorage.getItem('night');
    var nightNav;
  
    function applyNight(value) {
        if (value.toString() === 'true') {
            document.body.classList.add('night');
        } else {
            document.body.classList.remove('night');
        }
    }
  
    function findNightNav() {
        nightNav = document.getElementById('night-nav');
        if (!nightNav) {
            setTimeout(findNightNav, 100);
        } else {
            nightNav.addEventListener('click', switchNight);
        }
    }
  
    function switchNight() {
        isNight = isNight ? isNight.toString() !== 'true' : true;
        applyNight(isNight);
        localStorage.setItem('night', isNight, expireTime1H);
    }
  
    findNightNav();
    isNight && applyNight(isNight);
  }());