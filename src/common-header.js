document.write(`
    <script src="src/p5.js" type="text/javascript"></script>
    <script src="src/complex.js" type="text/javascript"></script>
    <script src="src/globals.js" type="text/javascript"></script>
    <script src="src/buddhabrot.js" type="text/javascript"></script>
`);

// Function to insert common HTML content
function insertCommonElements() {
  const commonDiv = document.createElement('div');
  commonDiv.id = 'common-container';
  commonDiv.innerHTML = `
    <header>
      <h1>Buddhabrot Explorer</h1>
      <nav>
        <a href="index.html">Home</a> |
        <a href="exploration.html">Explore Orbits</a> |
        <a href="animation.html">Explore Animations</a>
      </nav>
    </header>
    <div id="content"></div>
  `;
  document.body.insertBefore(commonDiv, document.body.firstChild);
}

function insertSpecificSketch(sketchSource) {
    const content = document.getElementById('content');
    const script = document.createElement('script');
    script.src = sketchSource;
    content.appendChild(script);
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', insertCommonElements);