import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default async function LoginPage() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Register</CardTitle>
        <CardDescription>Start your journey with us today</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <form className="flex grow flex-col justify-between gap-18">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="youremail@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Link
              href="/login"
              className="inline-block text-sm underline-offset-4 hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
