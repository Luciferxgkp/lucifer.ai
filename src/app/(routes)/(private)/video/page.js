'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowRight, Video } from 'lucide-react/dist/esm/lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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
import { useProModal } from 'src/hooks/use-pro-modal';
import { videoSchema } from './schema.js';
const VideoPage = () => {
  const proModal = useProModal();
  const form = useForm({
    resolver: zodResolver(videoSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const [video, setVideo] = useState();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/video', {
        prompt: values.prompt,
      });

      setVideo(response?.data[0]);
      // console.log('VIDEO_RESPONSE', response.data);
      form.reset();
    } catch (error) {
      // TODO: open pro modal
      // console.log(error?.response?.status);
      // toast.error('Something went wrong. Please try again.');
      if (error?.response?.status === 429) {
        proModal.onOpen();
      } else toast.error('Something went wrong. Please try again.');

      // else toast.error(error?.response?.data);
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
                    placeholder="Clown fish swimming in a coral reef"
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
      <div className="overflow-auto h-[70vh] md:h-[75vh] w-full rounded-md">
        <div className="p-4 w-full h-full">
          {!isLoading && !video && (
            <div
              className={
                'flex gap-x-4 md:gap-x-8 p-4 rounded-md mb-2 items-center w-full bg-muted'
              }
            >
              <Avatar role="assitant" />
              <CustomMarkdown content="No video found. Please generate some video." />
              {/* <pre className="text-sm font-medium">{message.content}</pre> */}
            </div>
          )}
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader size="large" />
            </div>
          ) : (
            video && (
              <div className="w-full h-full flex justify-center items-center">
                <video controls src={video} className="w-full" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
