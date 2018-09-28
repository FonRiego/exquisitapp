// document.addEventListener('DOMContentLoaded', () => {

//   console.log('IronGenerator JS imported successfully!');

// }, false);
// $(document).ready( ()=> {
//   $("#get-new-gif").click( () => getRandomGif());
//   getRandomGif();

// })

// const getRandomGif = () => {
//   axios
//   .get("http://api.giphy.com/v1/gifs/random?api_key=6XPOIbXZf3DCR3aJ0gzBBP8zEyN8mS3K")
//   .then( giphy => {
//     let gifUrl = giphy.data.data.image_original_url;
//     $('#giphy-image-randomizer img').prop("src", gifUrl);
//     $('#image_url').val(gifUrl)
//   })
//   .catch(err => console.log(err))
// }


$(document).ready(()=>{
  $(".comment").each(function(){
    if ($(this).find(".comment-user h6").html().split(" ")[0] == thisUserName){
      let storyId = window.location.href.split("/").pop()
      let comment = $(this).attr('id')
      let parte1 = '<div class="delete-comment"><a href="/story/'
      let parte2 = '/deletecomment/'
      let parte3 = '">Borrar</a></div>'
      $(this).append(parte1+storyId+parte2+comment+parte3)
    }
  })
})

$(".author-username").each(function(){
  let username = $(this).html()
  axios.get(`/api/finduserid/${username}`)
  .then( e => {
    let userid = e.data.id;
    console.log(`/api/findcollabs/${userid}`)
    axios.get(`/api/findcollabs/${userid}`)
    .then( e => {
      let collabs = e.data.totalCollabs;
      let newDiv = '<p class="total-collabs"></p>';
      let final = $(newDiv).html(`${collabs} colaboraciones`)
      $(this).after(final)
    })
  }).catch( e => console.log(e))
})