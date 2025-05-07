import { Link } from 'react-router-dom';

import { cn } from "@/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LoginForm from '@/forms/login'

export default function LoginPage({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={(values) => {
                console.log(values);
          }}/>
          <hr className='my-6' />

          <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to='/signup' className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
