'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowRight, MessageSquare } from 'lucide-react/dist/esm/lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from 'src/components/avatar';
import CustomMarkdown from 'src/components/custom-markdown';
import Heading from 'src/components/heading';
import Loader from 'src/components/loader';
import { Button } from 'src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { cn } from 'src/lib/utils';
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
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I am your assistant. How can I help you?',
    },
  ]);
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
            Generate
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </Form>
      <div className="overflow-auto h-[75vh] w-full rounded-md">
        <div className="p-4 w-full ">
          {isLoading && (
            <div className="flex justify-center items-center h-36 bg-muted rounded-md mb-2">
              <Loader size="small" />
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex gap-x-4 md:gap-x-8 p-4 rounded-md mb-2 items-center w-full',
                message.role === 'assistant' ? 'bg-muted ' : 'border'
              )}
            >
              <Avatar role={message.role} />
              <CustomMarkdown content={message.content} />
              {/* <pre className="text-sm font-medium">{message.content}</pre> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
