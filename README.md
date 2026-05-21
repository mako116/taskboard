# Taskboard

A simple Kanban board app I built using React, TypeScript, Redux Toolkit, and Tailwind CSS. You can move tasks around between To Do, In Progress, and Done columns using drag-and-drop.

## What I Completed

* Got the base project up and running with React 19, Vite, and TypeScript.
* Built out the main Kanban board layout, including the columns and the individual cards for each task.
* I managed to get a custom drag-and-drop working using native HTML5. You can drag tasks between columns and reorder them, and it even shows a little preview image while you're dragging.
* Set up Redux Toolkit to keep track of all the state (tasks, users, and whether dialogs are open).
* I wired up the app to pull the initial tasks and users from the external API. Since the API only gave me basic data, I had to write some extra code on the frontend to figure out what priority and status each task should have.
* Added a search bar and some filters, plus those summary cards at the top. I also made a modal that pops up when you click a task to see more details.
* Styled the whole thing using Tailwind CSS (v4). It even has a dark mode, and I did all this without relying on big component libraries like Radix.

## What I Didn't Complete (Important!)

* **Saving Updates**: When you drag a task to a new column or change its priority, it updates in the Redux store but doesn't actually save back to the backend API.
* **Creating Tasks**: There's a '+' button to add a task, but I didn't get around to wiring it up to actually create and save a new one.
* **Editing Tasks**: You can't really edit task titles or assign users yet (missing full CRUD).
* **Auth**: The app loads a list of users, but there isn't a real login system to tie tasks to whoever is currently logged in.

## Challenges Faced

* **Custom Drag-and-Drop**: Figuring out the native HTML5 drag-and-drop API from scratch was a headache. I decided not to use a library like `dnd-kit`, which meant I had to manually handle drag events, calculate where things should drop, and deal with ghost images.
* **Redux Sync**: Keeping the Redux store's order in sync when dragging items around took a lot of trial and error.
* **No UI Libraries**: Doing all the interactive UI stuff (like dialogs) from scratch using just React and Tailwind took way longer than I expected since I couldn't just drop in Radix UI or something similar.
* **Weird API Data**: The external API just gave me basic Todo objects. I had to write custom logic to derive stuff like "In Progress" status and "Priority" levels just to make the Kanban board work properly.

## Tech Stack

* React 19
* TypeScript
* Vite
* Redux Toolkit
* Tailwind CSS v4
* Lucide React
