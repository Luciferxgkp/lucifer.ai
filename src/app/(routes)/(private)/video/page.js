'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowRight, Video } from 'lucide-react/dist/esm/lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Avatar from 'src/components/avatar';
import CustomMarkdown from 'src/components/custom-markdown';
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
import { cn } from 'src/lib/utils';
import { videoSchema } from './schema.js';
import { toast } from 'react-toastify';

const VideoPage = () => {
  const form = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const router = useRouter();
  // const isLoading = form.formState.isSubmitting;
  const isLoading = true;
  const [messages, setMessages] = useState([
    // { role: 'user', content: 'basic modal using react hooks' },
    // {
    //   role: 'assistant',
    //   content:
    //     'Sure! Here\'s an example of a basic modal using React hooks:\n\n```jsx\nimport React, { useState } from "react";\n\nconst Modal = ({ isOpen, toggleModal }) => {\n  return (\n    isOpen && (\n      <div className="modal-container">\n        <div className="modal-content">\n          <h2>Modal Title</h2>\n          <p>Modal content goes here.</p>\n          <button onClick={toggleModal}>Close Modal</button>\n        </div>\n      </div>\n    )\n  );\n};\n\nconst App = () => {\n  const [isModalOpen, setIsModalOpen] = useState(false);\n\n  const toggleModal = () => {\n    setIsModalOpen(!isModalOpen);\n  };\n\n  return (\n    <div>\n      <h1>React Hooks Modal Example</h1>\n      <button onClick={toggleModal}>Open Modal</button>\n      <Modal isOpen={isModalOpen} toggleModal={toggleModal} />\n    </div>\n  );\n};\n\nexport default App;\n```\n\nIn this example, we create a `Modal` component that receives two props: `isOpen` and `toggleModal`. The `isOpen` prop indicates whether the modal should be open or closed. The `toggleModal` prop is a function that toggles the modal\'s visibility.\n\nWithin the `Modal` component, we use a conditional rendering approach to show the modal content only when `isOpen` is `true`. The modal content itself can be customized with whatever elements and styles you prefer.\n\nIn the `App` component, we use the `useState` hook to manage the state `isModalOpen`, which determines whether the modal is currently open or closed. Clicking the "Open Modal" button toggles the state and opens or closes the modal accordingly.\n\nRemember to style the modal using CSS or any styling library of your choice to achieve the desired visual appearance.',
    // },
    {
      role: 'assistant',
      content: 'Hello, This is in progress. Please check back later.',
    },
  ]);

  const onSubmit = async (values) => {
    try {
      const userMessage = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/code', {
        messages: newMessages,
      });

      setMessages((prev) => [userMessage, response.data, ...prev]);
      form.reset();
    } catch (error) {
      // TODO: open pro modal
      // console.log(error);
      toast.error(error?.response?.data);

    } finally {
      router.refresh();
    }
  };

  return (
    <div className="w-full h-screen">
      <Heading
        title="Video Generation"
        description="Generate videos using description."
        Icon={Video}
        iconColor="text-yellow-500"
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
                    placeholder="Horse in the field with a rider"
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
          {/* {isLoading && (
            <div className="flex justify-center items-center h-36 bg-muted rounded-md mb-2">
              <Loader size="small" />
            </div>
          )} */}
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

export default VideoPage;
