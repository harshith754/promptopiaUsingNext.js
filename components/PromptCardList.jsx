import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick, handleProfileClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map( (post) => {
        return <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          // handleProfileClick={handleProfileClick}
        />
      })}
    </div>
  )
}

export default PromptCardList
