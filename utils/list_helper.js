const dummy=(blogs)=>{
return 1
}
const totalLikes=(blogs)=>{
const likes=blogs.reduce((sum,currentValue)=>sum+currentValue.likes,0)
return likes
}
const favoriteBlog=(blogs)=>{
    const arrayLikes=blogs.map(blog=>blog.likes)
    const maxValue=Math.max.apply(Math,arrayLikes)
    const indexOfFavorite=arrayLikes.indexOf(maxValue)

    return {
        title:blogs[indexOfFavorite].title,
        author:blogs[indexOfFavorite].author,
        likes:blogs[indexOfFavorite].likes
    }

}

module.exports={
    dummy,
    totalLikes,
    favoriteBlog
}