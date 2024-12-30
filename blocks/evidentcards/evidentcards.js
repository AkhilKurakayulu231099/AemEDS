import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Find all the evidentcard items inside the block
  const ul = document.createElement('ul');

  // Loop through each item (evidentcard) inside the block
  [...block.children].forEach((card) => {
    const li = document.createElement('li');
    
    // Move the children of each card into the new <li>
    moveInstrumentation(card, li);

    while (card.firstElementChild) {
      const div = card.firstElementChild;
      li.append(div);

      // Apply classes to each div based on its content
      if (div.querySelector('picture')) {
        div.className = 'evidentcard-image';  // Class for the image container
      } else if (div.querySelector('p')) {
        div.className = 'evidentcard-body';  // Class for the body containing the link
      } else {
        div.className = 'evidentcard-header';  // Default class for the header
      }
    }

    // Append the structured card to the <ul>
    ul.append(li);
  });

  // Now process the links and the images to make them clickable
  ul.querySelectorAll('li').forEach((li) => {
    const img = li.querySelector('img');
    const h6 = li.querySelector('h6');
    const anchor = li.querySelector('a');

    if (img && anchor) {
      const handleClick = () => {
        window.location.href = anchor.href;  // Redirect to the URL from the anchor
      };

      // Make the image and header clickable
      img.style.cursor = 'pointer';
      h6.style.cursor = 'pointer';

      // Add click event listeners to both image and header
      img.addEventListener('click', handleClick);
      h6.addEventListener('click', handleClick);
    }
  });

  // Clear the existing block content and append the new <ul>
  block.textContent = '';
  block.append(ul);
}
