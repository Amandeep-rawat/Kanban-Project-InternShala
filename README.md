# ProjectHub - Kanban Board

ProjectHub is a Kanban board application built using React and Redux. It allows users to manage tasks across different stages: **To Do, In Progress, Peer Review, and Done**. The board supports **drag-and-drop** functionality for task movement and includes a **search feature** to filter tasks.

## Features

✅ **Kanban Board Layout**
- Four sections representing different task stages:
  - To Do
  - In Progress
  - Peer Review
  - Done
- Tasks are displayed in their respective sections.

✅ **Task Cards**
- Each task card displays:
  - **Task Title**
  - **Task Description** (shortened to fit within the card)
- Tasks can be **dragged and dropped** between different columns.

✅ **Drag-and-Drop Functionality**
- Tasks can be moved between different stages.
- Dragging a task into a new column updates its status accordingly.

✅ **Search Functionality**
- A search bar is available at the top of the board.
- **Live search optimization:** The component does not re-render on every keystroke. Instead, it updates only when the user clicks on a relevant suggestion.
- Tasks in all columns are filtered based on the search input.

✅ **Add New Tasks**
- A floating button allows users to create new tasks.
- New tasks are always added to the **To Do** column.
- Task creation form includes:
  - **Task Title**
  - **Task Description**

✅ **State Management**
- Implemented using **Redux** for efficient state management.
- No database is used; tasks are stored in Redux state.

## Installation & Usage

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/projecthub.git
   cd projecthub
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
### Dependency Conflicts with React 19  

If you face dependency conflicts due to React 19, you can use the following command while installing packages (Not a good appraoch or either you can downgrade the version to react 18 ):  

```sh
npm install --legacy-peer-deps

3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. 

## Technologies Used
- **React.js**
- **Redux Toolkit**
- **TypeScript**
- **Tailwind CSS**

## Notes
- The project does not use a database; state persistence is handled by Redux.
- The search functionality is optimized to prevent unnecessary re-renders.

---
🚀 Happy Coding! 🎉
