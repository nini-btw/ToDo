const createButton = document.getElementById('createButton');
const container = document.getElementById('container');

createButton.addEventListener('click', () => {
  // Create the <div> element
  const divElement = document.createElement('div');

  // Create the <p> element
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = 'This is a paragraph.';
  paragraphElement.classList.add('myParagraph');

  // Append the <p> element to the <div> element
  divElement.appendChild(paragraphElement);

  // Append the <div> element to the container
  container.appendChild(divElement);

  // Add click event listener to the paragraph
  paragraphElement.addEventListener('click', () => {
    console.log(paragraphElement.classList);
  });
});
