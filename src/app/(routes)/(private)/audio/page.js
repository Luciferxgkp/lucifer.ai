'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowRight, Music } from 'lucide-react/dist/esm/lucide-react';
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
import { audioSchema } from './schema.js';

const AudioPage = () => {
  const form = useForm({
    resolver: zodResolver(audioSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const [music, setMusic] = useState();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/audio', {
        prompt: values.prompt,
      });

      setMusic(response.data.audio);
      // console.log('AUDIO_RESPONSE', response.data);
      form.reset();
    } catch (error) {
      // TODO: open pro modal
      // console.log(error?.response?.status);
      // toast.error('Something went wrong. Please try again.');
      toast.error(error?.response?.data);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="w-full h-screen">
      <Heading
        title="Audio Generation"
        description="Generate audios/music using description."
        Icon={Music}
        iconColor="text-slate-500"
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
                    placeholder="piano music"
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
        <div className="p-4 w-full h-full">
          {!isLoading && !music && (
            <div
              className={
                'flex gap-x-4 md:gap-x-8 p-4 rounded-md mb-2 items-center w-full bg-muted'
              }
            >
              <Avatar role="assitant" />
              <CustomMarkdown content="No music found. Please generate some music." />
              {/* <pre className="text-sm font-medium">{message.content}</pre> */}
            </div>
          )}
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader size="large" />
            </div>
          ) : (
            music && (
              <div>
                <audio controls src={music} className="w-full" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPage;
