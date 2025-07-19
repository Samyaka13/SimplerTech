# User Listing Page Assignment

This project is a fully functional and responsive user listing page built as part of an internship assignment. It demonstrates best practices in modern front-end development, including efficient state management, responsive design, and performance optimization.


### 📸 Live Demo / Screenshot


**Live Demo:** [View the app here](https://simpler-tech.vercel.app)

**Watch a walkthrough video:** [Loom Video Demo](https://www.loom.com/share/9d622a43319a4fa3bd35ce14a996286a?sid=32e49bee-ee99-4c7e-92ac-55c1ed69f652)

### 🎯 Project Objective

The goal was to build a user-friendly listing page that fetches and displays data from a backend server or static JSON file. The page includes features like searching, filtering, and pagination, all wrapped in a clean, professional UI.

---

## ✨ Key Features

- **Responsive Design:** The UI seamlessly transitions from a table-like layout on desktop to a touch-friendly card view on mobile devices.
- **Dynamic Search:** A real-time search bar filters users across multiple fields (Name, Email, Mobile, and Status).
- **Performance-Optimized Search:** A custom `useDebounce` hook is used to delay the search query, preventing excessive re-renders and API calls on every keystroke.
- **Status Filtering:** Users can be filtered by their status (`Successful`, `Pending`, `Overdue`) using a clean dropdown menu.
- **Client-Side Pagination:** Handles large datasets efficiently by breaking them into pages, with intuitive controls for navigation.
- **Loading & Empty States:** The application provides clear user feedback with a loading spinner while fetching data and a "No users found" message when filters return no results.

---

## 🛠️ Tech Stack

- **Framework:** React
- **Language:** TypeScript
- **UI Library:** Chakra UI
- **Data Fetching:** Axios
- **Icons:** React Icons

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd [project-directory]
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## 🔧 Technical Explanation

This section details the technical implementation of the project's core features.

### 1. Component Structure

The entire application is encapsulated within the `CustomTable` component. The structure is organized logically into three main parts:
1.  **Header:** Contains the "Users" title, the search input, and the status filter dropdown.
2.  **Content Area:** Conditionally renders the user list, the loading state, or the empty state.
3.  **Footer:** Contains the pagination controls.

### 2. Data Fetching

- Data is fetched from a static `/data.json` file using **Axios**.
- The fetching logic is placed inside a `useEffect` hook with an empty dependency array (`[]`). This is a critical best practice that ensures the data is fetched **only once** when the component first mounts, preventing infinite loops.
- An `isLoading` state is used to track the fetching process. It is set to `true` before the request and `false` in a `.finally()` block, ensuring the loading spinner is hidden whether the request succeeds or fails.

### 3. State Management

The component's state is managed using React's `useState` hook for:
-   `data`: Stores the original array of users fetched from the JSON file.
-   `isLoading`: A boolean to manage the visibility of the loading spinner.
-   `searchTerm`: Stores the real-time value from the search input.
-   `statusFilter`: Stores the currently selected status from the filter dropdown.

### 4. Search, Filtering, and Performance

This is the logical core of the application, designed for high performance.

-   **Debouncing:** To prevent the expensive filtering operation from running on every keystroke, a custom **`useDebounce` hook** was implemented. This hook takes the `searchTerm` and a delay (e.g., 300ms), and only provides the updated term after the user has stopped typing for that duration. This makes the UI feel responsive while being highly performant.

-   **Memoization:** The filtering logic itself is wrapped in a **`useMemo` hook**. This hook caches the result of the `filteredUsers` array. The filtering logic only re-runs if its dependencies (`debouncedSearchTerm`, `statusFilter`, or `data`) change. This prevents the entire user list from being re-filtered on every single component re-render, providing a major performance boost.

### 5. Responsive Design

-   The layout dynamically adapts to different screen sizes using **Chakra UI's** powerful responsive design features.
-   A `useBreakpointValue` hook checks the current screen size.
-   Based on the result, the component **conditionally renders** either:
    -   A **table-like row layout** for desktop screens.
    -   A custom **`MobileUserCard` component** for mobile screens, which provides a better user experience on smaller viewports.
-   Responsive style props (e.g., `direction={{ base: 'column', md: 'row' }}`) are used throughout to adjust layouts, font sizes, and spacing.

### 6. Pagination Logic

-   To keep the main component clean and promote reusability, all pagination calculations are abstracted into a **custom `usePaginationLogic` hook**.
-   This hook takes the filtered user list and the number of items per page as arguments.
-   It returns all the necessary state and handlers for the UI, including:
    -   `currentPage` and `totalPages`.
    -   `currentData` (the sliced array for the current page).
    -   `handlePageChange`, `handleNextPage`, and `handlePrevPage` functions.
-   The hook is designed to automatically reset to page 1 whenever the filters change, ensuring a consistent user experience.

### 7. Styling

-   Styling is handled exclusively through **Chakra UI**. This choice was made for its excellent developer experience, consistency, and built-in accessibility.
-   Layouts are built using composable components like `VStack`, `HStack`, and `Stack`.
-   Styling is applied via props (`bg`, `p`, `boxShadow`), which allows for rapid and maintainable development while adhering to a consistent design system.
-   Dynamic styling is used to change the background color of the status badge based on its value, providing clear visual cues.```