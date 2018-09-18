

// load webpage for initial screen
document.addEventListener("DOMContentLoaded", () => {

  // retrieve object id from local storage

  const object_id = localStorage.getItem('object_id')
  console.log(object_id)

  const url_objects = `https://api.harvardartmuseums.org/object?objectnumber=${object_id}&apikey=${API_KEY}`

  showIndividualObjects(url_objects);
});

// function to show objects table
  function showIndividualObjects(url_objects) {
    fetch(url_objects)
    // wait until you recieve a response then parse the output as json
    .then(response => response.json())
    .then(data => {
      data.records.forEach(object => {
          document.querySelector("#individual_object").innerHTML += `
          <table><tr>
              <td>${object.title}</td>
              <td>${object.provenance}</td>
              <td>${object.accessionyear}</td>
              <td><image src="${object.primaryimageurl}" class="gallery-image"></image></td>
          </tr></table>
          Description: <div>${object.description}</div>
        `;
    });
  })
}
