import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request ,{ params } ) => { //id is a params

  try {
    await connectToDB();  //need to connect every time since its lambda function(will die after finishing job)
    
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(prompts), { status: 200} )
  } catch (error) {

    return new Response("Failed to fetch all prompts", { status: 500} )
  
  }
}