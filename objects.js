
// load webpage for initial screen
document.addEventListener("DOMContentLoaded", () => {
  // retrieve item from local storage
  const gallery_id = localStorage.getItem('gallery_id')
  console.log(gallery_id)
  const url_objects = `https://api.harvardartmuseums.org/object?gallery=${gallery_id}&apikey=${API_KEY}`
  showObjectsTable(url_objects);
});

// function to show objects table
  function showObjectsTable(url_objects) {
    fetch(url_objects)
    // wait until you recieve a response then parse the output as json
    .then(response => response.json())
    .then(data => {
      data.records.forEach(object => {

          // set object ID
          object_id = object.objectid

          // set artist variable
          artist_list = object.people

            // JOIN FUNCTION
              // create a string variable
              var artist = "";
              // if there are artists
              if(artist_list) {
              artist_list.forEach(people => {
              // append the existing artists to the string variable
              artist += people.name
              console.log(artist)
            })
            }
            // if there are not artists
            else {
            }

          // populate the rows of the table based off of JSON
          document.querySelector("#all-objects").innerHTML += `
          <tr>
              <td><a href="individual_objects.html" onclick="saveObjectID(${object.objectnumber})">
              ${object.title}</a></td>
              <td>${artist}</td>
              <td><image src="${object.primaryimageurl}" class="gallery-image"></image></td>
              <td><a href="${object.url}">${object.url}</a></td>`
        })
      })
  }


  // set object id in local storage
  function saveObjectID(object_id) {
    localStorage.setItem('object_id', object_id)
    console.log(object_id)
  }
