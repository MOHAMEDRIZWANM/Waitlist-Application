import React, { useEffect } from 'react';
import '../styles/Coupan.css';
import WinnerImage from '../assets/winner-win.jpg'; // Ensure the path is correct
import {useLocation} from 'react-router-dom'

function Coupan() {
  const location = useLocation();
  const { name, couponCode } = location.state;
  useEffect(() => {
    // Function to run the confetti animation
    const startConfetti = () => {
      const confetti = {
        maxCount: 150,
        speed: 2,
        frameInterval: 15,
        alpha: 1.0,
        gradient: false,
        start: null,
        stop: null,
        toggle: null,
        pause: null,
        resume: null,
        togglePause: null,
        remove: null,
        isPaused: null,
        isRunning: null
      };

      // Confetti animation logic
      (function () {
        confetti.start = startConfettiAnimation;
        confetti.stop = stopConfettiAnimation;
        confetti.toggle = toggleConfettiAnimation;
        confetti.pause = pauseConfettiAnimation;
        confetti.resume = resumeConfettiAnimation;
        confetti.togglePause = togglePauseConfettiAnimation;
        confetti.isPaused = isConfettiPaused;
        confetti.isRunning = isConfettiRunning;
        const supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        const colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];

        const particles = [];
        let isRunning = false;
        let interval = null;

        // Create particles
        function createParticles() {
          const width = window.innerWidth;
          const height = window.innerHeight;
          for (let i = 0; i < confetti.maxCount; i++) {
            const particle = {
              color: colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")"),
              diameter: Math.random() * 10 + 5,
              tilt: Math.random() * 10 - 5,
              tiltAngle: Math.random() * Math.PI,
              tiltAngleIncrement: Math.random() * 0.07 + 0.05,
              speed: Math.random() * confetti.speed + 2,
              x: Math.random() * width,
              y: Math.random() * height - height,
              r: Math.random() * Math.PI * 2,
              xSpeed: Math.random() * 0.6 - 0.3
            };
            particles.push(particle);
          }
        }

        // Update particles
        function updateParticles() {
          const width = window.innerWidth;
          const height = window.innerHeight;
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.y += (Math.cos(particle.tiltAngle) + 3 + particle.speed) * 0.5;
            particle.x += Math.sin(particle.r) * particle.xSpeed;
            particle.r += Math.random() * 0.02;
            if (particle.y > height || particle.x > width || particle.x < -width) {
              // Reset particle position to top
              particle.x = Math.random() * width;
              particle.y = -particle.diameter;
            }
          }
        }

        // Render particles
        function renderParticles() {
          const canvas = document.getElementById("confetti");
          const context = canvas.getContext("2d");
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          context.clearRect(0, 0, canvas.width, canvas.height);
          for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            context.moveTo(particle.x + particle.tilt + particle.diameter / 2, particle.y);
            context.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.diameter / 2);
            context.stroke();
          }
        }

        // Animation loop
        function animateConfetti() {
          updateParticles();
          renderParticles();
          interval = supportsAnimationFrame ? requestAnimationFrame(animateConfetti) : setTimeout(animateConfetti, confetti.frameInterval);
        }

        // Start animation
        function startConfettiAnimation() {
          createParticles();
          isRunning = true;
          animateConfetti();
        }

        // Stop animation
        function stopConfettiAnimation() {
          isRunning = false;
          clearTimeout(interval);
        }

        // Toggle animation
        function toggleConfettiAnimation() {
          if (isRunning) {
            stopConfettiAnimation();
          } else {
            startConfettiAnimation();
          }
        }

        // Pause animation
        function pauseConfettiAnimation() {
          if (isRunning) {
            clearTimeout(interval);
            isRunning = false;
          }
        }

        // Resume animation
        function resumeConfettiAnimation() {
          if (!isRunning) {
            animateConfetti();
            isRunning = true;
          }
        }

        // Toggle pause animation
        function togglePauseConfettiAnimation() {
          if (isRunning) {
            pauseConfettiAnimation();
          } else {
            resumeConfettiAnimation();
          }
        }

        // Check if animation is paused
        function isConfettiPaused() {
          return !isRunning;
        }

        // Check if animation is running
        function isConfettiRunning() {
          return isRunning;
        }

        // Start the confetti animation
        startConfettiAnimation();
      })();
    };

    // Execute the confetti animation function
    startConfetti();

    return () => {
      // Clean up if necessary
    };
  }, []);

  return (
    <div className="winner-container">
      <div className="winner-card">
        <h2 className="congrats">Congratulations!</h2>
        <img src={WinnerImage} alt="Winner" className="winner-image" />
        <h3 className="winner-name">Dear {name}</h3> <br/>
        <p className="winner-text">You have won the coupon and your coupon is COUPON-{couponCode}</p>
      </div>
      <canvas id="confetti"></canvas>
    </div>
  );
}

export default Coupan;
