// Floating hearts animation
document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 18; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = (Math.random() * 8) + 's';
        heart.style.animationDuration = (6 + Math.random() * 4) + 's';
        heartsContainer.appendChild(heart);
    }

    // Confetti setup
    let confettiCanvas;
    function launchConfetti() {
        if (!confettiCanvas) {
            confettiCanvas = document.createElement('canvas');
            confettiCanvas.id = 'confetti-canvas';
            document.body.appendChild(confettiCanvas);
        }
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        const ctx = confettiCanvas.getContext('2d');
        const confettiColors = ['#e75480', '#ffb6c1', '#fff', '#b23a48', '#f9c6d1'];
        let confettiPieces = [];
        for (let i = 0; i < 180; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * -confettiCanvas.height,
                r: 6 + Math.random() * 8,
                d: Math.random() * 180,
                color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
                tilt: Math.random() * 10 - 5,
                tiltAngle: 0,
                tiltAngleIncremental: (Math.random() * 0.07) + 0.05
            });
        }
        let angle = 0;
        function drawConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            angle += 0.01;
            for (let i = 0; i < confettiPieces.length; i++) {
                let p = confettiPieces[i];
                p.y += (Math.cos(angle + p.d) + 2 + p.r / 6) * 0.9;
                p.x += Math.sin(angle);
                p.tiltAngle += p.tiltAngleIncremental;
                p.tilt = Math.sin(p.tiltAngle) * 12;
                ctx.beginPath();
                ctx.lineWidth = p.r;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
                ctx.stroke();
            }
        }
        let confettiInterval = setInterval(drawConfetti, 16);
        setTimeout(() => {
            clearInterval(confettiInterval);
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            confettiCanvas.remove();
        }, 4000);
    }

    // Button logic
    const yesBtn = document.getElementById('yesBtn');
    const response = document.getElementById('response');
    yesBtn.addEventListener('click', () => {
        yesBtn.disabled = true;
        yesBtn.textContent = '💖 Yes!';
        response.innerHTML = 'You have made me the happiest person in the world! <br> I love you forever.';
        launchConfetti();
    });
});