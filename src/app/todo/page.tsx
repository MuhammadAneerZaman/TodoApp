'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'


export default function TodoForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('/api/todo', { title, description, priority }, { withCredentials: true })
      console.log("Response: " + response)
      toast({
        title: "Todo Added Successfully",
        description: "Your new todo has been added to your list.",
      })
      // Reset form
      setTitle('')
      setDescription('')
      setPriority('')
    } catch (error) {
      console.log("Error while sending todo", error)
      toast({
        title: "Todo not added",
        description: "Check your internet connection or Try agin.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-orange-400 text-white">
          <CardTitle className="text-2xl">Add New Todo</CardTitle>
          <CardDescription className="text-pink-100">Fill in the details to add a new todo item.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
              <Input
                id="title"
                placeholder="Enter todo title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
              <Textarea
                id="description"
                placeholder="Enter todo description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</label>
              <Select value={priority} onValueChange={setPriority} required>
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
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-orange-400 text-white" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Todo'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      


    </div>
  )
}