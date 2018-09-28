$(document).ready(()=>{
  $(".comment").each(function(){
    if ($(this).find(".comment-user p").html().split(" ")[0] == thisUserName){
      let storyId = window.location.href.split("/").pop()
      let comment = $(this).attr('id')
      let parte1 = '<div class="delete-comment"><a class="btn btn-danger" href="/story/'
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
    return axios.get(`/api/findcollabs/${userid}`)
  })
  .then( e => {
    let collabs = e.data.totalCollabs;
    let newDiv = '<p class="total-collabs"></p>';
    let final = $(newDiv).html(`${collabs} colaboraciones`)
    $(this).after(final)
  })
  .catch( e => console.log(e))
})