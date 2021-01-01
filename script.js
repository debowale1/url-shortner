const shortenBtn = document.querySelector('#shorten-btn');
const statisticsLinks = document.querySelector('.statistics__links');

shortenBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const shortenLink = document.querySelector('#shorten-link').value;
  fetch(`https://api.shrtco.de/v2/shorten?url=${shortenLink}`)
        .then(resp => resp.json())
        .then(data => {
          //build and paint ui
          displayShortenLink(data.result)
          //clear input
          document.querySelector('#shorten-link').value = '';
        }).catch(err => console.log(err));
  
});

function displayShortenLink(data) {
  
  const {original_link, full_short_link} = data;
  const link = document.createElement('div');
  link.className = 'statistics__link';
  link.innerHTML = `<div class="statistics__link--text">${original_link}</div>
        <div class="statistics__link--shortened">${full_short_link}</div>
        <button class="btn btn--primary btn--copy">Copy!</button>`;
  
  //select parent element
  document.querySelector('.statistics__links').appendChild(link);

}


statisticsLinks.addEventListener('click', copyTextToClipboard)
//copy function
function copyTextToClipboard(e) {

  if(e.target.classList.contains('btn--copy')){
    //get the previous element sibling of the button
    const copyText = e.target.previousElementSibling.innerText;
    navigator.clipboard.writeText(copyText);
  /* Alert the copied text */
    alert(`Copied: ${copyText}`);
  }

}