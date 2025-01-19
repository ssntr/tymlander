document.addEventListener('mousemove', function (e) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    document.body.appendChild(heart);

    // Satunnaiset värit ja koot
    //const size = Math.random() * 20 + 10; // 10px–30px
    const colors = ['#FF0000', '#FF69B4', '#FFA500', '#FF1493']; // Värit
    const color = colors[Math.floor(Math.random() * colors.length)];
    heart.style.backgroundColor = color;
    //heart.style.width = `${size}px`;
    //heart.style.height = `${size}px`;

    // Aseta sydämen sijainti
    heart.style.left = `${e.pageX}px`;
    heart.style.top = `${e.pageY}px`;

    // Poista sydän, kun animaatio päättyy
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
});

        function toggleDropdown(id) {
            const content = document.getElementById(id);
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
