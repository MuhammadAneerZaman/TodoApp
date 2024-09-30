"use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit } from "lucide-react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Todo {
  _id: string
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  completed: boolean
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get('/api/todo')
      setTodos(response.data.todos)
      setError(null)
    } catch (error) {
      console.error('Error fetching todos:', error)
      setError('Failed to fetch todos. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleComplete = async (id: string) => {
    try {
      const response = await axios.patch(`/api/todo/${id}`)
      setTodos(todos.map(todo => 
        todo._id === id ? response.data.todo : todo
      ))
    } catch (error) {
      console.error('Error toggling todo status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/todo/${id}`)
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo)
    setIsDrawerOpen(true)
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTodo) return

    try {
      const response = await axios.put(`/api/todo/${editingTodo._id}`, editingTodo)
      setTodos(todos.map(todo => 
        todo._id === editingTodo._id ? response.data.updatedTodo : todo
      ))
      setIsDrawerOpen(false)
      setEditingTodo(null)
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl font-semibold text-blue-600">Loading your todos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <p className="text-xl font-semibold text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-blue-600 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Your Todos</h1>
        {todos.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <p className="text-xl text-blue-600">No todos found. Start by adding a new todo!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
              <Card key={todo._id} className={`${todo.completed ? 'opacity-70' : ''} bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105`}>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardTitle className="flex items-center justify-between">
                    <span className="truncate">{todo.title}</span>
                    <Badge className={`${getPriorityColor(todo.priority)} text-white`}>
                      {todo.priority}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">{todo.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between bg-gray-50 p-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`complete-${todo._id}`}
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleComplete(todo._id)}
                    />
                    <label htmlFor={`complete-${todo._id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Complete
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(todo)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(todo._id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <DrawerTitle>Edit Todo</DrawerTitle>
            <DrawerDescription className="text-blue-100">Make changes to your todo here. Click save when you&apos;re done.</DrawerDescription>
          </DrawerHeader>
          {editingTodo && (
            <form onSubmit={handleUpdate} className="p-6 space-y-6">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  id="edit-title"
                  value={editingTodo.title}
                  onChange={(e) => setEditingTodo({...editingTodo, title: e.target.value})}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  id="edit-description"
                  value={editingTodo.description}
                  onChange={(e) => setEditingTodo({...editingTodo, description: e.target.value})}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-priority" className="text-sm font-medium text-gray-700">Priority</label>
                <Select 
                  value={editingTodo.priority} 
                  onValueChange={(value) => setEditingTodo({...editingTodo, priority: value as 'Low' | 'Medium' | 'High'})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DrawerFooter>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">Save changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  )
}