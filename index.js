const API_KEY = '66a96560-b77e-11e8-bf0e-e9322ccde4db';

// load webpage for initial screen
document.addEventListener("DOMContentLoaded", () => {

  // load link
  const url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
  showGalleries(url);
});

  // Show the list of Galleries
  function showGalleries(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      data.records.forEach(gallery => {
        document.querySelector("#galleries").innerHTML += `
          <li>
            <a href="objects_page.html" onclick="setGalleryId(${gallery.id})">
              Gallery #${gallery.id}: ${gallery.name} (Floor ${gallery.floor})
            </a>
          </li>
        `;
      });
      if (data.info.next) {
        showGalleries(data.info.next);
      }
    })
  }

  // setting gallery local storage is a function that is called on click
  function setGalleryId(gallery_id) {
    localStorage.setItem('gallery_id', gallery_id)
    console.log(gallery_id)
  }

  // check the state of the URL after each hash change
  ['DOMContentLoaded', 'hashchange'].forEach((e) => {
      window.addEventListener(e, () => {

        // change to the correct page based on the value passed into the link
          if (window.location.hash) {
            console.log(window.location.hash)
              let id = window.location.hash.slice(1);
              var gallery_ids = ['2740', '1610', '1600', '4400', '1510', '1500', '1310', '2550', '2520', '2300', '1005', '6', '3710', '1300', '4000', '1120','3500', '3460', '3400', '2600', '2540', '2470', '1510', '2500', '2440', '2120', '1012', '1003', '1000', '3700', '3600', '2710', '1320', '3750', '1006', '1110', '1330', '1740', '2200', '2210', '2340', '4400', '1320', '3750', '1006', '1110', '1330', '1740','2200','2210']

              if (gallery_ids.includes(id)) {
                url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}&gallery=${id}`
                window.location.replace('file:///Users/briannabolon/Documents/objects_page.html')
                showIndividualObjects(url)
              }
              else {
                url = `https://api.harvardartmuseums.org/object?objectnumber=${id}&apikey=${API_KEY}`
                window.location.replace('file:///Users/briannabolon/Documents/individual_objects.html')
                showIndividualObjects(url)
              }
          }
          else {
            url = `https://api.harvardartmuseums.org/gallery?apikey=${API_KEY}`;
            showGalleries(url);
          }
      });
  });
