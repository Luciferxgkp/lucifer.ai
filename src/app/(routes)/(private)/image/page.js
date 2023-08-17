'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  ArrowRight,
  Download,
  Image,
} from 'lucide-react/dist/esm/lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Avatar from 'src/components/avatar';
import CustomMarkdown from 'src/components/custom-markdown';
import Heading from 'src/components/heading';
import Loader from 'src/components/loader';
import { Button } from 'src/components/ui/button';
import { Card, CardFooter } from 'src/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { amountOptions, imageSchema, resolutionOptions } from './schema.js';

const ImagePage = () => {
  const form = useForm({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      prompt: '',
      size: '512x512',
      count: '1',
    },
  });
  const router = useRouter();
  const isLoading = form.formState.isSubmitting;

  const [images, setImages] = useState([
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-4Mci0cp9sE00sDwyYDFGgK4y.png?st=2023-08-15T14%3A07%3A41Z&se=2023-08-15T16%3A07%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-14T17%3A08%3A22Z&ske=2023-08-15T17%3A08%3A22Z&sks=b&skv=2021-08-06&sig=pWIoutZixYitUQYcq3Q8N46MWGNF9T25WpOW8giZNbI%3D',
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-P9shBkAP2gusddluEpQclk4a.png?st=2023-08-15T14%3A45%3A54Z&se=2023-08-15T16%3A45%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-15T09%3A41%3A40Z&ske=2023-08-16T09%3A41%3A40Z&sks=b&skv=2021-08-06&sig=/t13Iptuqqh8ytpduxuE7sR3PpRjPSHdTIEZXFCKZ6w%3D',
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-Ex8d1Y9Ohoa8scHTHD9Eyfxg.png?st=2023-08-15T14%3A45%3A55Z&se=2023-08-15T16%3A45%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-15T09%3A41%3A40Z&ske=2023-08-16T09%3A41%3A40Z&sks=b&skv=2021-08-06&sig=IUfxyPWPoo2wTBocZ092YpRUIucQW1ZdLpUaHte8jeg%3D',
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-7h4ziLBQQ2lgGRV6ojYpZXq5.png?st=2023-08-15T14%3A45%3A53Z&se=2023-08-15T16%3A45%3A53Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-15T09%3A41%3A40Z&ske=2023-08-16T09%3A41%3A40Z&sks=b&skv=2021-08-06&sig=5FyJWkjo31al5hOuI98YEKqeUmqqBqYCCSXOf0VmAu8%3D',
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-ZC9E3BgF4mJGwxV89WHzXzkb.png?st=2023-08-15T14%3A45%3A54Z&se=2023-08-15T16%3A45%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-15T09%3A41%3A40Z&ske=2023-08-16T09%3A41%3A40Z&sks=b&skv=2021-08-06&sig=H/e53Yk71TgvJB%2BJzqEWSJjIZsOthUg4JozWuowf3dg%3D',
    // 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-YwSkaFEarNkq9VTw9FdoYQSe/user-xWdqAbXlLDWwruxWoSJruzrF/img-30t6kcNNC0qHjpBiJBCORhet.png?st=2023-08-15T14%3A45%3A54Z&se=2023-08-15T16%3A45%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-15T09%3A41%3A40Z&ske=2023-08-16T09%3A41%3A40Z&sks=b&skv=2021-08-06&sig=QDjDB3WZlNJeUGvhe8f3E2zXbdJOHBMUFO6UxxH4zkw%3D',
  ]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/api/image', {
        prompt: values.prompt,
        size: values.size,
        count: values.count,
      });

      
      // setImages(() => [...response.data]);
      // setImages((prev) => [...prev, ...response.data.map((item) => item.url)]);
      setImages(() => [...response.data.map((item) => item.url)]);
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
        title="Image Generation"
        description="Generate images using description."
        Icon={Image}
        iconColor="text-purple-500"
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
              <FormItem className="col-span-10 md:col-span-4 xl:col-span-7">
                <FormControl>
                  <Input
                    FormItem
                    {...field}
                    disabled={isLoading}
                    placeholder="Horizon with a purple sky"
                    // className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem className="col-span-4 md:col-span-2 xl:col-span-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resolution" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {resolutionOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="count"
            render={({ field }) => (
              <FormItem className="col-span-3 md:col-span-2 xl:col-span-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select amount" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {amountOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          {!isLoading && images.length === 0 && (
            <div
              className={
                'flex gap-x-4 md:gap-x-8 p-4 rounded-md mb-2 items-center w-full bg-muted'
              }
            >
              <Avatar role="assitant" />
              <CustomMarkdown content="No images found. Please generate some images." />
              {/* <pre className="text-sm font-medium">{message.content}</pre> */}
            </div>
          )}
          {isLoading ? (
            <div className="h-full w-full flex justify-center items-center">
              <Loader size="large" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <Card className="rounded-lg overflow-hidden " key={index}>
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt="image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardFooter className="p-2 w-full">
                    <Button onClick={() => window.open(image)}>
                      <Download />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
