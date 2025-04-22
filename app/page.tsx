import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">TASKIA</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="rounded-xl shadow-sm transition-all hover:shadow">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="rounded-xl shadow-sm transition-all hover:shadow">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-24 md:py-32 space-y-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-block rounded-xl bg-primary/10 px-3 py-1 text-sm text-primary shadow-sm">
              Developed by SRM Institute of Science and Technology
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Advanced Task Management <br className="hidden sm:inline" />
              for Modern Teams
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Streamline task management, enhance team collaboration, and improve efficiency with TASKIA's unified,
              user-friendly interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/auth/register">
                <Button size="lg" className="gap-2 rounded-xl shadow-sm transition-all hover:shadow">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="rounded-xl shadow-sm transition-all hover:shadow">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="container py-24 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              TASKIA offers a comprehensive suite of tools designed to make task management effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 border-none rounded-xl bg-card/50 shadow-sm hover:shadow-md hover:bg-card transition-all">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-muted-foreground">
                Create, assign, update, and track tasks in real-time with prioritization, subtasks, and dependencies.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 border-none rounded-xl bg-card/50 shadow-sm hover:shadow-md hover:bg-card transition-all">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Seamlessly collaborate with team members through comments, attachments, and real-time notifications.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 p-6 border-none rounded-xl bg-card/50 shadow-sm hover:shadow-md hover:bg-card transition-all">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Agile Sprint Management</h3>
              <p className="text-muted-foreground">
                Manage sprints with drag-and-drop functionality, burndown charts, and automated performance reports.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">TASKIA</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} TASKIA. Developed by SRM Institute of Science and Technology.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
