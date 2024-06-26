function toggleVisibility() {
    var thing = document.getElementById('thing');
    if (thing.style.display === 'none') {
      thing.style.display = 'block';
    } else {
      thing.style.display = 'none';
    }
  }