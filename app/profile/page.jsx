"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import Router from "next/router";

const MyProfile = () => {

  const router = useRouter();

  const {data: session} = useSession();
  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      console.log("session user id",session?.user.id )
      const data = await response.json();
      setPosts(data)
    }

    if(session?.user.id) fetchPosts();
  },[])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async  (post) => {
    const hasConfirmed =confirm("Are you sure you want to delete this prompt?");

    if(hasConfirmed) {
      try{
        await fetch(`api/prompt/${post._id.toString()}}`,{
          method:'DELETE'
        });

        const filteredPosts = posts.filter((p) => {
          return p._id !== post._id
        })

        setPosts(filteredPosts)

      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div>
      <Profile 
        name="My"
        desc="Welcome to your personalized profile page."
        posts={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default MyProfile
