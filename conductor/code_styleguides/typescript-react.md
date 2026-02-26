# TypeScript Style Guide

## General Principles
- **Type Safety First:** Leverage TypeScript's type system to catch errors at compile time
- **Explicit Types:** Prefer explicit type annotations for function parameters and return types
- **Interface over Type:** Use `interface` for object shapes, `type` for unions and primitives

## File Organization
- **Extensions:** Use `.ts` for source files, `.tsx` for React components
- **Naming:** PascalCase for components and types, camelCase for variables and functions
- **Exports:** Prefer named exports over default exports

## Type Definitions

### Interfaces
```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

// Prefer extending interfaces
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}
```

### Type Aliases
```typescript
// Use for unions and primitives
type Status = 'active' | 'inactive' | 'pending';
type UserId = string;
```

## React Components

### Functional Components
```typescript
// Use TypeScript with React.FC or explicit props type
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

### Hooks
```typescript
// Type custom hooks
function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return user;
}

// Type event handlers
const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setValue(event.target.value);
};
```

## Error Handling
```typescript
// Use typed error handling
try {
  // operation
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

## Avoid `any`
```typescript
// Bad
function processData(data: any) { }

// Good
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'id' in data) {
    // Type guard
  }
}
```

---

# React Style Guide

## Component Structure
1. Imports
2. Type definitions
3. Component props interface
4. Component function
5. Export

## Props
- **Destructure props** in the function parameter
- **Provide default values** via destructuring, not `defaultProps`
- **Keep props flat** - avoid deeply nested prop structures

## State Management
- **Use `useState`** for local component state
- **Use `useReducer`** for complex state logic
- **Lift state up** when multiple components need access

## Effects
```typescript
// Always specify dependencies
useEffect(() => {
  // subscription setup
  return () => {
    // cleanup
  };
}, [dependency]);
```

## Event Handlers
- **Name handlers** with `handle` prefix: `handleClick`, `handleChange`
- **Pass handlers** without calling: `onClick={handleClick}` not `onClick={handleClick()}`

---

# Next.js Style Guide

## App Router Conventions
- **Route structure:** Mirror file system to URL structure
- **Layouts:** Use `layout.tsx` for shared UI within routes
- **Loading states:** Use `loading.tsx` for suspense boundaries
- **Error handling:** Use `error.tsx` for error boundaries

## Server vs Client Components
```typescript
// Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component (when interactivity needed)
'use client';

export function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>{state}</div>;
}
```

## Data Fetching
- **Prefer Server Components** for data fetching
- **Use `async/await`** directly in Server Components
- **Stream responses** with Suspense for better UX

## File Naming
- `page.tsx` - Route entry point
- `layout.tsx` - Shared layout for routes
- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page
