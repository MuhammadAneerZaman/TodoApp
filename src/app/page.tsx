'use client'

import Link from 'next/link'
import { CheckCircle, ArrowRight, ListTodo, Target, BarChart3 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden">
      <main className="container mx-auto px-6 py-16 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex justify-center mb-8">
            <CheckCircle className="h-20 w-20 text-yellow-300" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">
            Welcome to TodoApp
          </h1>
          <p className="text-2xl mb-12 max-w-2xl mx-auto text-gray-200">
            Streamline your tasks, boost your productivity, and achieve your goals with our intuitive and powerful todo management app.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<ListTodo className="h-8 w-8 text-yellow-300" />}
              title="Easy Task Management"
              description="Add, edit, and organize your tasks effortlessly with our user-friendly interface."
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-yellow-300" />}
              title="Priority Setting"
              description="Assign priorities to your tasks and focus on what matters most."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-yellow-300" />}
              title="Progress Tracking"
              description="Monitor your productivity and celebrate your accomplishments as you complete tasks."
            />
          </div>
          <div className="flex justify-center">
            <Button asChild className="bg-yellow-400 text-purple-800 hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 text-lg px-8 py-6 rounded-full shadow-lg">
              <Link href="/todo">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <BackgroundAnimation />
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-left shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold ml-3">{title}</h2>
      </div>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/5 rounded-full"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            opacity: [0.1, 0.2, 0.4, 0.2, 0.1],
            borderRadius: ["20%", "20%", "50%", "80%", "20%"],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}