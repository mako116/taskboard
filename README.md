# Taskboard

A simple Kanban board app I built using React, TypeScript, Redux Toolkit, and Tailwind CSS. You can move tasks around between To Do, In Progress, and Done columns using drag-and-drop.

## What I Completed

* **Setup**: Got the project running with Vite, React 19, and TypeScript.
* **UI/Layout**: Built the main board layout, columns, and individual task cards.
* **Drag and Drop**: Wrote a custom HTML5 drag-and-drop feature to move tasks across columns and reorder them. It includes a visual preview while dragging.
* **State Management**: Set up Redux Toolkit to handle tasks, users, and UI state. 
* **Data Fetching**: Hooked up async thunks to pull the initial tasks and users from an external API. I also had to write some logic to figure out task priorities and statuses since the API didn't give me everything I needed.
* **Filtering & UI Extras**: Added search/filters, summary metric cards, and a modal that pops up to show task details. 
* **Styling**: Styled everything using Tailwind v4 (including dark mode) without using heavy UI component libraries.

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
