// import DashboardCard from '../components/DashboardCard'

import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { z } from 'zod'

import PasswordInput from '@/components/PasswordInput'
import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { AuthContext } from '@/contexts/AuthContext'

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .trim()
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .trim()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
//Use .refine to check for ticked "Terms and Conditions" box or to check if password and confirm password match

// .refine((data) => data.password === data.confirmPassword, {
//   message: 'Passwords do not match',
// path: ['confirmPassword'],
// })

const HomePage = () => {
  const { user, login, isInitializing } = useContext(AuthContext)

  const methodsForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const handleSubmitSuccess = (data) => {
    login(data)
  }
  if (isInitializing) return null // or a loading spinner
  // if (!user) {
  //   return <Navigate to="/" /> // or a message saying that the user is not authenticated, but in this case we will just show the login form, so we can return null here
  // }
  if (user) {
    return <Navigate to="/maintenance/areas" />
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <h1>{user}</h1>
      <Form {...methodsForm}>
        <form onSubmit={methodsForm.handleSubmit(handleSubmitSuccess)}>
          <Card className="w-[500px]">
            <CardHeader>
              <CardTitle>Hanlon Concrete</CardTitle>
              <CardDescription>Maintenance Manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* EMAIL */}
              <FormField
                control={methodsForm.control}
                name="email" // Has to match the name in the Schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Please enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* PASSWORD */}
              <FormField
                control={methodsForm.control}
                name="password" // Has to match the name in the Schema
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Login</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  )
}

export default HomePage
