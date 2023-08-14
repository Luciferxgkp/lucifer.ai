'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { MessageSquare } from 'lucide-react/dist/esm/lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const Conversation = () => {
  const form = useForm({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;
  const [messages, setMessages] = useState([]);
  const onSubmit = async (values) => {
    try {
      const userMessage = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });

      setMessages((prev) => [userMessage, response.data, ...prev]);
      form.reset();
    } catch (error) {
      // TODO: open pro modal
      console.log(error);
    } finally {
      router.refresh();
    }
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
                  <Input
                    placeholder="How do you feel today?"
                    {...field}
                    disabled={isLoading}
                    // className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="col-span-3 md:col-span-2 xl:col-span-1"
          >
            Submit
          </Button>
        </form>
      </Form>
      <ScrollArea className="h-[75vh] w-full rounded-md">
        <div className="p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col mb-4">
              <span className="text-xs font-medium text-gray-500">
                {message.role}
              </span>
              <span className="text-sm font-medium">{message.content}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Conversation;
