import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IUser } from '../types/User';
import { useUser } from '../context/UserContext';

import { AlertCircle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [authError, setAuthError] = useState('');

  const {
    data: users,
    isLoading: fetchLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/users');
      return response.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const foundUser = users?.find(
      (user: IUser) =>
        user.email === data.email && user.password === data.password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      login(userWithoutPassword);
      navigate('/dashboard');
    } else {
      setAuthError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: 'Email is required' })}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password', {
                  required: 'Password is required',
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {authError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{authError}</AlertDescription>
              </Alert>
            )}
            {fetchError && (
              <p className=" text-sm text-red-600">
                Something went wrong please try again later
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting && fetchLoading}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
