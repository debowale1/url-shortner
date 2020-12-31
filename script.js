const shortenBtn = document.querySelector('#shorten-btn');

shortenBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const shortenLink = document.querySelector('#shorten-link').value;
  fetch(`https://api.shrtco.de/v2/shorten?url=${shortenLink}`)
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          //build and paint ui
          displayShortenLink(data.result)
          //clear input
          document.querySelector('#shorten-link').value = '';
        }).catch(err => console.log(err));
  
});

function displayShortenLink(data) {
  let output;
  const {original_link, full_short_link} = data;
  const link = document.createElement('div');
  link.className = 'statistics__link';
  link.innerHTML = `<div class="statistics__link--text">${original_link}</div>
        <div class="statistics__link--shortened">${full_short_link}</div>
        <button class="btn btn--primary btn--copy">Copy!</button>`;
  
  //select parent element
  document.querySelector('.statisctics__links').appendChild(link);

}