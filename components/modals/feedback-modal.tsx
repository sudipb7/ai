"use client";

import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useModal } from "@/hooks/use-modal-store";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Required"),
  subject: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  topic: z.enum([
    "FEATURE_REQUEST",
    "COLLABORATION",
    "IMPROVEMENT",
    "BUG",
    "HELP",
    "OTHER",
  ]),
});

const topicMap = [
  {
    value: "FEATURE_REQUEST",
    label: "Request a feature",
  },
  {
    value: "COLLABORATION",
    label: "Wanna collaborate",
  },
  {
    value: "IMPROVEMENT",
    label: "Improvement",
  },
  {
    value: "HELP",
    label: "Need help",
  },
  {
    value: "BUG",
    label: "Bug spotted",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

export const FeedbackModal = () => {
  const { toast } = useToast();
  const { type, isOpen, onClose } = useModal();
  const isModalOpen = isOpen && type === "feedback";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "BUG",
      description: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post("/api/feedback", values);
      toast({
        title: "Feedback received!",
        description:
          "Thanks for your feedback! We'll review it and reach out soon.",
      });
      handleClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong",
      });
    } finally {
      form.reset();
    }
  }

  const getCurrentTopic = () => {
    const filtered = topicMap.filter(
      (elem) => elem.value === form.getValues("topic")
    );
    return filtered[0].label;
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary tracking-wide">
            Your Feedback Matters
          </DialogTitle>
          <DialogDescription className="max-sm:text-xs font-medium tracking-wide mt-2">
            Your feedback matters! Help us improve our service by sharing your
            thoughts. Your insights will be used to enhance your experience.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      type="text"
                      placeholder="Enter your subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger disabled={isSubmitting}>
                        {field.value ? getCurrentTopic() : "Select one"}
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {topicMap.map(({ value, label }) => (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          {label}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...field}
                      disabled={isSubmitting}
                      placeholder="Enter your feedback here"
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="flex items-center text-white"
              >
                {isSubmitting && (
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                )}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
