import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertIdCardSchema, type InsertIdCard } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import PhotoUpload from "./photo-upload";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { generateRegistrationNumber } from "@/lib/id-card";

interface IdCardFormProps {
  onPreview: (data: InsertIdCard) => void;
}

export default function IdCardForm({ onPreview }: IdCardFormProps) {
  const { toast } = useToast();
  
  const form = useForm<InsertIdCard>({
    resolver: zodResolver(insertIdCardSchema),
    defaultValues: {
      studentName: "",
      level: "",
      matricNumber: "",
      department: "",
      registrationNumber: "",
      photoUrl: "",
      institutionName: "",
      institutionLogo: "",
      institutionAddress: "",
    }
  });

  const createCardMutation = useMutation({
    mutationFn: async (data: InsertIdCard) => {
      const res = await apiRequest("POST", "/api/id-cards", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "ID card has been generated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: String(error),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertIdCard) => {
    const regNumber = generateRegistrationNumber();
    const finalData = { ...data, registrationNumber: regNumber };
    onPreview(finalData);
    createCardMutation.mutate(finalData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="matricNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matriculation Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo</FormLabel>
                <FormControl>
                  <PhotoUpload 
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Logo URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="institutionAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full"
          disabled={createCardMutation.isPending}
        >
          {createCardMutation.isPending ? "Generating..." : "Generate ID Card"}
        </Button>
      </form>
    </Form>
  );
}
