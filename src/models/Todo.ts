// models/Todo.js
import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed:{
    type:Boolean,
    default: false, // Set a default completed status
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'], // Define allowed priority values
    default: 'Medium', // Set a default priority
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = mongoose.models.todos || mongoose.model('todos', todoSchema);

export default Todo;