import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginResponseData, loginUser } from "@/actions/auth-action";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/use-auth";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password can't be more then 50 characters long" }),
});

export type LoginFormData = z.infer<typeof formSchema>;

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = useAuth();

  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  useEffect(() => {
    if (auth?.user) {
      navigate(from, { replace: true });
    }
  }, [auth?.user, from, navigate]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponseData) => {
      localStorage.setItem("token", data.token);
      navigate("/");
      toast({
        title: "Successfully logged in",
      });
      navigate(0);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error logging in",
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values);
  }

  return (
    <div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-50 p-4 space-y-8">
        <div>
          <h2 className=" font-serif mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="w-full"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className="mt-2">
          New heare?
          <Link to={"/register"} className="underline">
            {" "}
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
