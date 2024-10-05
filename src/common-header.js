document.write(`
    <script src="src/p5.js" type="text/javascript"></script>
    <script src="src/complex.js" type="text/javascript"></script>
    <script src="src/globals.js" type="text/javascript"></script>
    <script src="src/buddhabrot.js" type="text/javascript"></script>
    <script type="text/javascript" id="MathJax-script" async
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
    </script>
    <!-- MathJax Configuration -->
    <script type="text/javascript">
        window.MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true
        },
        svg: {
            fontCache: 'global'
        }
        };
    </script>
    <link rel="stylesheet" href="styles.css">
`);

// Function to insert common HTML content
function insertCommonElements() {
  const commonDiv = document.createElement('div');
  commonDiv.id = 'common-container';
  commonDiv.innerHTML = `
    <header class="centered-header">
      <h1>Buddhabrot Explorer</h1>
      <nav>
        <a href="index.html">Home</a> |
        <a href="exploration.html">Explore Trajectories</a> |
        <a href="animation.html">Explore Animations</a>
      </nav>
    </header>
  `;
  document.body.insertBefore(commonDiv, document.body.firstChild);
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', insertCommonElements);