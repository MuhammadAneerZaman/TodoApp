import Todo from "@/models/Todo";
import { verifyToken } from "@/utils/auth";
import dbConnect from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const userId = verifyToken(req);
    const todoId = params.id;
    const deleteTodo = await Todo.findOneAndDelete({ _id: todoId, userId });
    if (!deleteTodo) {
      return NextResponse.json(
        { message: "Todo not found or You are not authorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while deleting the todo", error);
    return NextResponse.json(
      { message: "Error while deleting the todo" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const userId = verifyToken(req);
    const todoId = params.id;
    const { title, description, priority, completed } = await req.json();

    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { title, description, priority, completed }
    );
    if (!updatedTodo) {
      return NextResponse.json(
        { message: "Todo not found or You are not authorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Todo updated successfully", updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while updating the todo", error);
    return NextResponse.json(
      { message: "Error while updating the todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const userId = verifyToken(req);
    const todoId = params.id;
    const todo = await Todo.findOne({ _id: todoId, userId });
    if (!todo) {
      return NextResponse.json(
        { message: "Todo not found or You are not authorized" },
        { status: 404 }
      );
    }
    todo.completed = !todo.completed;
    await todo.save();
    return NextResponse.json(
      { message: "Todo completed status toggled successfully", todo },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while toggle the complete todo", error);
    return NextResponse.json(
      { message: "Error while toggle the complete todo" },
      { status: 500 }
    );
  }
}
