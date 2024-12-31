export default function decorate(block) {
  // Create a new <ul> element to hold the list of cards
  const ul = document.createElement('ul');

  // Find the evidentcards block and iterate through each of its children
  const evidentCards = block.querySelectorAll('.evidentcards-wrapper > .evidentcards > div');

  evidentCards.forEach((card) => {
    const li = document.createElement('li');
    
    // Loop through the child div elements of each card and move them into the <li>
    [...card.children].forEach((div) => {
      li.appendChild(div);

      // Apply classes based on the type of content inside each div
      if (div.querySelector('picture')) {
        div.className = 'evidentcard-image';  // Class for the image container
      } else if (div.querySelector('a')) {
        div.className = 'evidentcard-body';  // Class for the body containing the link
      } else {
        div.className = 'evidentcard-header';  // Default class for the header
      }
    });

    // Append the structured card (li) to the <ul>
    ul.appendChild(li);
  });

  // Now process the links, images, and make the entire li clickable
  ul.querySelectorAll('li').forEach((li) => {
    const anchor = li.querySelector('a');
    const img = li.querySelector('img');
    const p = li.querySelector('p'); // Select <p> inside the list item

    // Check if the anchor tag exists inside the list item (li)
    if (anchor) {
      const handleClick = () => {
        // Redirect to the link in the anchor
        window.location.href = anchor.href;

        // Hide the anchor tag after click
        anchor.style.display = 'none';
        
        // Hide the <p> tag after click (if exists)
        if (p) {
          p.style.display = 'none';
        }
      };

      // Add click event listener to the entire li (click anywhere inside)
      li.style.cursor = 'pointer';
      li.addEventListener('click', handleClick);

      // Make sure the image is also clickable (if an image exists)
      if (img) {
        img.style.cursor = 'pointer';
        img.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent li click handler from firing
          handleClick(); // Redirect and hide anchor and <p> when image is clicked
        });
      }
    }
  });

  // Clear the existing block content and append the new <ul>
  block.textContent = '';
  block.appendChild(ul);
}
