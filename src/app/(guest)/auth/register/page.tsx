import RegisterForm from '@/components/auth/register-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function RegisterPage() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Register</CardTitle>
        <CardDescription>Start your journey with us today</CardDescription>
      </CardHeader>
      <CardContent className="flex">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
