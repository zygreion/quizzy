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
        <CardTitle className="text-lg">Login</CardTitle>
        <CardDescription>
          Just one step closer to train your knowledge
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <form className="flex grow flex-col justify-between gap-18">
          <div className="flex flex-col gap-6">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button type="submit" className="w-full">
              <Link href="/">Sign In</Link>
            </Button>
            <Link
              href="/register"
              className="inline-block text-sm underline-offset-4 hover:underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
