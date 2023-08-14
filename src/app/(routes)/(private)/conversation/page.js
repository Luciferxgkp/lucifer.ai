'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare } from 'lucide-react/dist/esm/lucide-react';
import { useForm } from 'react-hook-form';
import Heading from 'src/components/heading';
import { Button } from 'src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { ScrollArea } from 'src/components/ui/scroll-area';
import { conversationSchema } from './schema.js';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
const Conversation = () => {
  const form = useForm({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const onSubmit = (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };
  return (
    <div className="w-full h-screen">
      <Heading
        title="Conversation"
        description="Most powerful AI based conversation generator."
        Icon={MessageSquare}
        iconColor="text-gray-500"
      />
      {/* <div className="grid grid-cols-10 gap-4 p-4 shadow-lg">
        <Input
          placeholder="Search"
          className="col-span-7 md:col-span-8 xl:col-span-9"
        />
        <Button className="col-span-3 md:col-span-2 xl:col-span-1">
          Generate
        </Button>
      </div> */}
      <Form {...form} className="grid grid-cols-10 gap-4 p-4 shadow-lg">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-10 gap-4 p-4 shadow-lg"
        >
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="col-span-7 md:col-span-8 xl:col-span-9">
                <FormControl>
                  <Input placeholder="Search" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="col-span-3 md:col-span-2 xl:col-span-1"
          >
            Submit
          </Button>
        </form>
      </Form>
      <ScrollArea className="h-full w-full rounded-md">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div>
              <div className="text-sm" key={tag}>
                {tag}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Conversation;
