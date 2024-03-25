import NewTimerCard from "@/components/new-timer";
import Timer from "@/components/timer";
import TodoList from "@/components/ui/task-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Timer /> */}
      <NewTimerCard />
      <TodoList />
    </main>
  );
}
