// import DashboardCard from '../components/DashboardCard'

import { EyeIcon } from 'lucide-react'
import { EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/Input'

import InputLabel from '../components/InputLabel'

function HomePage() {
  const [passwordIdVisible, setPasswordIdVisible] = useState(false)
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter Details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputLabel> Email</InputLabel>
          <Input id="email" type="email" placeholder="Enter Email"></Input>
          <InputLabel>Password</InputLabel>
          <div className="relative">
            <Input
              id="password"
              type={passwordIdVisible ? 'text' : 'password'}
              placeholder="Enter Password"
            ></Input>
            <Button
              variant="ghost"
              className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
              onClick={() => setPasswordIdVisible((prev) => !prev)}
            >
              {passwordIdVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default HomePage
