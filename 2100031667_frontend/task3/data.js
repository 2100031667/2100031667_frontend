function extractAndHighlightWords(paragraphContainer) {
    const paragraphText = paragraphContainer.querySelector('p').textContent;
    const words = paragraphText.split(/\W+/);
  
    words.forEach(word => {
      if (word.length > 8) {
        const highlightedWord = document.createElement('span');
        highlightedWord.classList.add('highlighted-word');
        highlightedWord.textContent = word;
        paragraphContainer.appendChild(highlightedWord);
      }
    });
  
    // Optional: Handle no highlighted words
    if (words.every(word => word.length <= 8)) {
      const message = document.createElement('p');
      message.textContent = 'No words found that meet the criteria.';
      paragraphContainer.appendChild(message);
    }
  }
  
  const paragraphContainer = document.getElementById('paragraph-container');
  extractAndHighlightWords(paragraphContainer);
  