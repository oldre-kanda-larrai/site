import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Link } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({
  email: z.string().email(),
  password: z.string()
});

export default function LoginForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  return (<>
     <Form {...form}>
      <form 
         onSubmit={form.handleSubmit(onSubmit)} 
         className="space-y-4">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>    
              <FormDescription>
              </FormDescription>
              <FormControl>
                <Input 
                placeholder="m@example.com" 
                {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="password"
          type="password"
          render={({ field }) => (
            <FormItem>
               <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to='/forget-password'
                    className="
                    ml-auto 
                    inline-block 
                    text-sm 
                    underline-offset-4 
                    hover:underline
                    ">
                    Forgot your password?
                  </Link>
                </div>

              <FormControl>
                <Input 
                type='password' 
                placeholder="password" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
        className='w-full curosr pointe'
        type="submit">Sign in</Button>
      </form>
    </Form>
  </>);
}
