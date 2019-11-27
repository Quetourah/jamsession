const createSong = `mutation createSong($title:String!) {
  createTodo(input:{
    title:$title
  }){
    id
    title
  }
}`;
export { createSong };