"use client";

import { useEffect, useMemo, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { TaskListCard } from "@/components/dashboard/task-list-card";
import {
  TaskFilters,
  type TaskFilters as TaskFiltersType,
} from "@/components/dashboard/task-filters";
import { TaskViewDialog } from "@/components/dashboard/task-view-dialog";
import { TaskEditDialog } from "@/components/dashboard/task-edit-dialog";
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-dialog";
import { type Task } from "@/components/dashboard/task-table";
import { deleteTaskApi, updateTaskById } from "@/lib/tasks/task-helpers";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<TaskFiltersType>({
    search: "",
    status: "all",
    priority: "all",
  });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/tasks", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
        setTasks([]);
      }
    }
    fetchTasks();
  }, []);

  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.titulo.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.descricao.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus =
        filters.status === "all" || task.status === filters.status;
      const matchesPriority =
        filters.priority === "all" || task.prioridade === filters.priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  const handleTaskAction = (taskId: string, action: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    switch (action) {
      case "view":
        setViewTask(task);
        break;
      case "edit":
        setEditTask(task);
        break;
      case "delete":
        setDeleteTask(task);
        break;
    }
  };

  const handleEditSave = async (updatedTask: Task) => {
    try {
      const updated = await updateTaskById(updatedTask.id, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updated.id ? updated : task))
      );
      setEditTask(null); // fecha o modal
    } catch (error) {
      console.error("Erro ao salvar tarefa:", error);
      alert("Erro ao atualizar tarefa.");
    }
  };

  const handleDeleteConfirm = async () => {
  if (!deleteTask) return;

  try {
    await deleteTaskApi(deleteTask.id);
    setTasks(tasks.filter((task) => task.id !== deleteTask.id));
    setDeleteTask(null);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
  }
};

  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      priority: "all",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskFilters
          filters={filters}
          onFiltersChange={setFilters}
          onClearFilters={handleClearFilters}
        />

        <TaskListCard
          tasks={filteredTasks}
          onTaskAction={handleTaskAction}
          onTaskCreated={(newTask) => setTasks((prev) => [...prev, newTask])}
        />
      </main>

      {/* Dialogs */}
      <TaskViewDialog
        task={viewTask}
        isOpen={!!viewTask}
        onOpenChange={(open) => !open && setViewTask(null)}
      />

      <TaskEditDialog
        task={editTask}
        isOpen={!!editTask}
        onOpenChange={(open) => !open && setEditTask(null)}
        onSave={handleEditSave}
      />

      <DeleteConfirmationDialog
        isOpen={!!deleteTask}
        onOpenChange={(open) => !open && setDeleteTask(null)}
        onConfirm={handleDeleteConfirm}
        taskTitle={deleteTask?.titulo || ""}
      />
    </div>
  );
}
