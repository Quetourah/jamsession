const createSongs = `mutation createSongs($title:String!) {
  createSongs(input:{
    title:$title
  }){
    id
    title
  }
}`;
export { createSongs };