var particles = Particles.init({
  selector: '.background',
  color: ['#fd9644', '#fed330'],
  connectParticles: true,
  responsive: [{
    breakpoint: 800,
    options: {
      color: '#00C9B1',
      maxParticles: 80,
      connectParticles: false
    }
  }]
});
