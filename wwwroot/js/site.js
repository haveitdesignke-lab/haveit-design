const canvas = document.getElementById('networkCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = 420;
    }
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: 36 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * 300 + 80,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.4,
        color: Math.random() > 0.5 ? '#F29A4E' : '#00AEEF',
        r: Math.random() * 2 + 3.5
    }));
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(d => {
            d.x += d.vx; d.y += d.vy;
            if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
            if (d.y < 0 || d.y > 380) d.vy *= -1;
            ctx.fillStyle = d.color;
            ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        });
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                let dx = dots[i].x - dots[j].x;
                let dy = dots[i].y - dots[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 160) {
                    ctx.strokeStyle = `rgba(242,154,78,${0.35 - dist / 500})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}