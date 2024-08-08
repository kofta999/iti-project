import { Calendar, Check, FolderSync, SquareCheckBig } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PriorityBadge from "@/components/PriorityBadge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simplify your life with Todo
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Stay organized and on top of your tasks with our intuitive todo
                list app.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Sign up for free
                </Link>
                <Link
                  to="/login"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Log in
                </Link>
              </div>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2 items-center mb-2">
                    <div className="mr-auto">Trying Todoz</div>
                  </CardTitle>
                  <CardDescription>
                    <PriorityBadge variant={2} />
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground">Must try todoz now!</p>

                  <h4 className="text-right font-bold">
                    Due {format(new Date(), "MMM dd, yyyy")}
                  </h4>
                </CardContent>

                <CardFooter className="flex justify-end">
                  <Button variant={"default"}>
                    <SquareCheckBig />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Features
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Todo has everything you need to stay organized and productive.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <Check className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Simple task management</h3>
                <p className="mt-2 text-muted-foreground">
                  Create, organize, and track your tasks with ease.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <Calendar className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Scheduled reminders</h3>
                <p className="mt-2 text-muted-foreground">
                  Never forget a task with our customizable reminders.
                </p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-sm">
                <FolderSync className="mb-4 h-8 w-8 text-primary" />
                <h3 className="text-lg font-medium">Cross-device sync</h3>
                <p className="mt-2 text-muted-foreground">
                  Access your tasks from anywhere, on any device.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12 md:px-6 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Get started today
            </h2>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Sign up for free and start organizing your life.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign up for free
              </Link>
              <Link
                to="/login"
                className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background px-4 py-6 text-center text-sm text-muted-foreground md:px-6">
        <p>&copy; 2024 Todo. All rights reserved.</p>
      </footer>
    </div>
  );
}
