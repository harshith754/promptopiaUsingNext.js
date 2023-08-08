'use client'
import { useState,useEffect } from "react"

import PromptCardList from './PromptCardList'



const Feed = () => {

  const [ allPosts,setAllPosts ]= useState([])
  const [ displayedPosts,setDisplayedPosts ]= useState([])


  //search states
  const [ searchText, setSearchText ] = useState("");
  const [ searchTimeout,setSearchTimeout ] = useState(null); //its an id for timeout
  const [ searchedResults,setSearchedResults ] =useState([])

  const fetchPosts = async () => {
    const response = await fetch('api/prompt');
    const data = await response.json();
    setAllPosts(data)
    setDisplayedPosts(data)
  }

  useEffect(()=>{
    fetchPosts();
    // if( displayedPosts.length== 0){
    //   alert("Cant Find Posts")
    // }
  },[])

  useEffect(()=>{
    if(searchedResults.length === 0){
      setDisplayedPosts(allPosts)
    }
    else{
      setDisplayedPosts(searchedResults)
    }
  },[searchedResults])

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText,'i') 

    const filteredPosts = allPosts.filter((post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.prompt)
    );

    return filteredPosts;
  }

  const handleSearchTextChange =(e) =>{
    clearTimeout(searchTimeout) 
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(() =>{
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick= (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);

    setSearchedResults(searchResult);

  }

  return (
    <section className="field">
      <form className="relative w-full flex-center mt-10">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList 
        data={displayedPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
