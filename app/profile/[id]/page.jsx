"use client";

import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import Router from "next/router";

const UserProfile = ( {params} ) => {

  const searchParams = useSearchParams()
  const userName = searchParams.get("name");

  const [posts,setPosts]=useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      console.log("userID",params?.id)
      const data = await response.json();
      setPosts(data)
    }

    if(params?.id) fetchPosts();
  },[])

  return (
    <div>
      <Profile 
        name={`${userName}'s`}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.` }
        posts={posts}
       
      />
    </div>
  )
}

export default UserProfile
