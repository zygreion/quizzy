import LoginForm from '@/components/auth/login-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
        <LoginForm />
      </CardContent>
    </Card>
  );
}
