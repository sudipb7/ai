"use client";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import { feedbackSchema } from "@/lib/utils";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Modal } from "@/components/ui/modal";

export const FeedbackModal = () => {
  const { toast } = useToast();
  const { type, isOpen, onClose } = useModal();
  const isModalOpen = isOpen && type === "feedback";

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "",
      description: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  async function onSubmit(values: z.infer<typeof feedbackSchema>) {
    try {
      await axios.post("/api/feedback", values);
      toast({
        title: "Feedback sent!",
        description: "Thanks for your feedback!",
      });
      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again.",
      });
    }
  }

  return (
    <Modal
      title="Your Feedback Matters"
      description="We are always looking for ways to improve our product. Please let us know if you have any suggestions. Don't hesitate to reach out to us if you have any questions."
      isOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="you@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Please atleast type 10 characters, so we can better understand your suggestions and feedback."
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-3 w-full flex items-center justify-stretch md:justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="btn_gradient max-md:w-full flex items-center"
            >
              {isSubmitting && <Loader className="h-4 w-4 animate-spin mr-2" />}
              Send feedback
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export const FeedbackModalTrigger = () => {
  const { onOpen } = useModal();

  return (
    <Button
      onClick={() => onOpen("feedback")}
      size="sm"
      variant="ghost"
      className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
    >
      Feedback
    </Button>
  );
};
