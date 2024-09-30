import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import {verifyToken} from "@/utils/auth"
import Todo from "@/models/Todo";

export async function POST(req:NextRequest){
    try {
        await dbConnect();
  
        const { title, description, priority } =  await req.json();
  
        // Extract the user ID from the verified token
        const userId = verifyToken(req);
  
        // Create a new To-Do
        const todo = new Todo({ title, description, priority, userId });
        await todo.save();
  
        return NextResponse.json({message:"Todo Created successfully", todo},{status:200})
      } catch (error) {
        console.error(error);
        return NextResponse.json({message:"Server Error"},{status:500})
      }
}

export async function PUT(req:NextRequest){
  try {
    await dbConnect();

    const { title, description, priority, completed } = await req.json();

    // Extract the user ID from the verified token
    const userId = verifyToken(req);
    console.log("User ID: " + userId);
    

    // Find and update the To-Do
    const updatedTodo = await Todo.findByIdAndUpdate(userId, { title, description, priority, completed }, { new: true });

    // if (!todo) {
    //   return NextResponse.json({message:"To-Do not exist"},{status:500})
    // }

    return NextResponse.json({message:"Updated todo", updatedTodo},{status:200})
  } catch (error) {
    console.log("Error while updating todo", error);
    return NextResponse.json({message:"Error while updating todo"},{status:500})
  }
}

export async function GET(req:NextRequest){
  await dbConnect();
  console.log("req: ",req);
  
  try {
    const userId = verifyToken(req);
    const todos = await Todo.find({ userId }).sort({ priority: 'asc' });
    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.log("Error while getting todo", error);
    return NextResponse.json({ message: "Error while getting todos" }, { status: 500 });
    
  }
}

