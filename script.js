/****************************************************************
  SCRIPT.JS
  1) Display the sequential messages once
  2) Show the 2 "Choose Me" buttons
  3) Button #1 -> Festive Page
  4) Button #2 -> Birthday Card
  5) Each page has a "Take me back to Surprises!" button 
     that returns user to the 2-button home screen
  6) Confetti logic
****************************************************************/
// SEQUENTIAL MESSAGES & IMAGE LOGIC
// 1) Define the sequence of message groups
// Each group and how long it stays visible
const messageGroups = [
  { id: 'messageGroup1', displayDuration: 3000 }, // 3s
  { id: 'messageGroup2', displayDuration: 4000 }, // 4s
  { id: 'messageGroup3', displayDuration: 7000 }, // 5s
  { id: 'messageGroup4', displayDuration: 4000 }, // 4s
  { id: 'messageGroup5', displayDuration: 6000 }, // 6s (GIF stays longer)
  { id: 'messageGroup6', displayDuration: 4000 }, // 4s
  { id: 'messageGroup7', displayDuration: 5000 }  // 5s
];

let totalDelay = 0;

messageGroups.forEach((group, index) => {
  // SHOW group
  setTimeout(() => {
    const element = document.getElementById(group.id);
    if (element) {
      element.classList.remove('hidden');
      element.classList.add('show');
    }
  }, totalDelay);

  // HIDE group after displayDuration
  setTimeout(() => {
    const element = document.getElementById(group.id);
    if (element) {
      element.classList.remove('show');
      element.classList.add('hidden');
    }
    
    // Once final group is hidden, show the 2 main buttons
    if (index === messageGroups.length - 1) {
      document.getElementById('buttonsContainer').classList.remove('hidden');
    }
  }, totalDelay + group.displayDuration);

  totalDelay += group.displayDuration;
});

  // 2) GET BUTTONS & PAGE ELEMENTS
  const btnChooseMe1 = document.getElementById('btnChooseMe1');
  const btnChooseMe2 = document.getElementById('btnChooseMe2');
  const pageOne = document.getElementById('pageOne');
  const pageTwo = document.getElementById('pageTwo');
  const buttonsContainer = document.getElementById('buttonsContainer');
  
  // 3) BUTTON #1 => SHOW FESTIVE PAGE
  btnChooseMe1.addEventListener('click', () => {
    buttonsContainer.classList.add('hidden');
    pageTwo.classList.add('hidden');
    pageOne.classList.remove('hidden');
  });
  
  // 4) BUTTON #2 => SHOW BIRTHDAY CARD
  btnChooseMe2.addEventListener('click', () => {
    buttonsContainer.classList.add('hidden');
    pageOne.classList.add('hidden');
    pageTwo.classList.remove('hidden');
  });
  
  // 5) "BACK" BUTTONS => RETURN TO HOME (the 2-button screen)
  const btnBackPageOne = document.getElementById('btnBackPageOne');
  const btnBackPageTwo = document.getElementById('btnBackPageTwo');
  
  btnBackPageOne.addEventListener('click', goHome);
  btnBackPageTwo.addEventListener('click', goHome);
  
  function goHome() {
    // Hide both pages
    pageOne.classList.add('hidden');
    pageTwo.classList.add('hidden');
    // Show the 2-button container again (home screen)
    buttonsContainer.classList.remove('hidden');
  }
  
  // 6) CONFETTI LOGIC (on the Festive Page)
  const confettiBtn = document.getElementById('confettiBtn');
  if (confettiBtn) {
    confettiBtn.addEventListener('click', launchConfetti);
  }
  
  function launchConfetti() {
    for (let i = 0; i < 40; i++) {
      createConfettiPiece();
    }
  }
  
  function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    
    // Random color
    const colors = ['#fce18a', '#ff726d', '#b48def', '#f4306d', '#85e3ff', '#f7aef8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.backgroundColor = randomColor;
  
    // Position confetti in center
    confetti.style.left = (window.innerWidth / 2) + 'px';
    confetti.style.top = (window.innerHeight / 2) + 'px';
    
    document.body.appendChild(confetti);
  
    // Random angle/distance
    const angle = Math.random() * 2 * Math.PI;
    const velocity = Math.random() * 30 + 10; 
    const xSpeed = Math.cos(angle) * velocity;
    const ySpeed = Math.sin(angle) * velocity;
    
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    
    const gravity = 0.7;
    let alpha = 1;
  
    const confettiTimer = setInterval(() => {
      x += xSpeed;
      y += ySpeed + gravity;
      alpha -= 0.02;
      
      confetti.style.left = x + 'px';
      confetti.style.top = y + 'px';
      confetti.style.opacity = alpha;
  
      if (alpha <= 0 || y > window.innerHeight) {
        clearInterval(confettiTimer);
        confetti.remove();
      }
    }, 16);
  }