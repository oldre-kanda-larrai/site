import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
  userName: z.string(),
  storeName: z.string(),
  storeLink: z.string(),

  email: z.string().email(),
  password: z.string()
});

export default function SignUpForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: '',
      storeName: '',
      storeLink: '',
      email: '',
      password: ''
    }
  });

  return (<>
     <Form {...form}>
      <form 
         onSubmit={form.handleSubmit(onSubmit)} >

            <h3 className='text-md mb-4 font-semibold text-center'>Personal data</h3>

            <div className="space-y-4">
       <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="Your name" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormDescription>
              Your best email.
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
                </div>
              <FormControl>
                <Input 
                type='password' 
                placeholder="Password" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

    </div>

       <h3 className='text-md my-4 font-semibold text-center'>Your store data</h3>
       <div className="space-y-4">
       <FormField
          control={form.control}
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of your store</FormLabel>
              <FormControl>
                <Input 
                placeholder="Name of your store" 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="storeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exclusive link to your store</FormLabel>
              <FormControl>
                <Input 
                placeholder=" " 
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <Button 
        className='mt-6 w-full curosr pointe'
        type="submit">Sign up</Button>
      </form>
    </Form>
  </>);
}
