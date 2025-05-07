import { Link } from 'react-router-dom';

import { cn } from "@/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignUpForm from '@/forms/signup';

import fetchApi from '@/fetch-api';
import { error } from '@/lib/utils';

export default function SignUpPage({
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Start selling right now.</CardTitle>
          <CardDescription>
          Register your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm onSubmit={async(values) => {
            try {
                const res = await fetchApi(
                  'auth/signup',
                  'POST',
                   values
                  );

                console.log(res);
            } catch (ex) {
               error(ex);
            }
          }}/>
          <hr className='my-6' />

          <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
              <Link 
              to='/login' 
              className="underline underline-offset-4">
                Login
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
