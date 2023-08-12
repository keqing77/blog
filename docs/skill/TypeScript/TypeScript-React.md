---
id: typescript-react
slug: /typescript-react
title: TypeScript-React
date: 2023-03-05
authors: keqing
tags: [typescript]
keywords: [typescript]
sidebar_position: 3
---

<!-- truncate -->

> 在 `React` 中使用 `Typescript` , 也就是 `TSX`

## useState in TSX

### `App.tsx`

```ts
import {User} from './User';

function App() {
  return (
    <div>
      <User />
    </div>
  );
}

export default App;
```

### `User.tsx`

```ts {10}
// User.tsx
import {useState} from 'react';

type AuthUser = {
  name: string;
  email: string;
};

export const User = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const handleLogin = () => {
    setUser({
      name: 'Keqing',
      email: 'Keqing@genshin.com',
    });
  };

  const handleLogut = () => {
    setUser(null);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogut}>Logout</button>
      <div>User name is {user?.name}</div>
      <div>User email is {user?.email}</div>
    </div>
  );
};
```

## useRef in TSX

### `App.tsx`

```ts
import {DomRef} from './components/ref/DomRef';
import {MutableRef} from './components/ref/MutableRef';

function App() {
  return (
    <div>
      <DomRef />
      <MutableRef />
    </div>
  );
}

export default App;
```

### `DomRef.tsx`

```ts
import {useRef, useEffect} from 'react';

export const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
};
```

### `MutableRef.tsx`

```ts
import {useState, useRef, useEffect} from 'react';

export const MutableRef = () => {
  const [timer, setTimer] = useState(0);
  const interValRef = useRef<number | null>(null);

  const stopTimer = () => {
    if (interValRef.current) window.clearInterval(interValRef.current);
  };
  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
    return () => {
      stopTimer();
    };
  }, []);
  return (
    <div>
      HookTimer - {timer} -
      <button onClick={() => stopTimer()}>Stop Timer</button>
    </div>
  );
};
```

## useReducer in TSX

### `App.tsx`

```ts
import {Counter} from './Counter';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
```

### `Counter.tsx`

```ts
import {useReducer} from 'react';

type CounterState = {
  count: number;
};

type UpdateAction = {
  type: 'increment' | 'decrement';
  payload: number;
};

type ResetAction = {
  type: 'reset';
};

type CounterAction = UpdateAction | ResetAction;

const initialState = {count: 0};
const reducer = (state: CounterState, action: CounterAction) => {
  switch (action.type) {
    case 'increment':
      return {count: state.count + action.payload};
    case 'decrement':
      return {count: state.count - action.payload};
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'increment', payload: 10})}>
        Increment 10
      </button>
      <button onClick={() => dispatch({type: 'decrement', payload: 10})}>
        Decrement 10
      </button>
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
    </>
  );
};
```

## useContext in TSX

### `App.tsx`

```tsx
import {Box} from './context/Box';
import {ThemeContextProvider} from './context/ThemeContext';

function App() {
  return (
    <div>
      <ThemeContextProvider>
        <Box />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
```

### `Box.tsx`

```tsx
import {useContext} from 'react';
import {ThemeContext} from './ThemeContext';

export const Box = () => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{background: theme.primary.main, color: theme.primary.text}}>
      Theme context
    </div>
  );
};
```

### `theme.ts`

```tsx
export const theme = {
  primary: {
    main: '#3f51b5',
    text: '#fff',
  },
  secondary: {
    main: '#f50057',
    text: '#fff',
  },
};
```

### `ThemeCont.tsx`

```tsx
import {createContext} from 'react';
import {theme} from './theme';

type ThemeContextProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext(theme);

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}> {children} </ThemeContext.Provider>
  );
};
```

## Event Props

### `App.tsx`

```tsx
import {Button} from './Button';
import {Input} from './Input';

function App() {
  return (
    <div>
      <Button
        handleClick={(event, id) => console.log('button clicked', event, id)}
      />
      <Input value="" handleChange={(event) => console.log(event)} />
    </div>
  );
}

export default App;
```

### `Button.tsx`

```tsx
type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={(event) => props.handleClick(event, 1)}>Button</button>
  );
};
```

### `Input.tsx`

```tsx
type InputProps = {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: InputProps) => {
  // 可以定义在 type 里面, 也可以写在 组件里面的
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };
  return (
    // <input type="text" value={props.value} onChange={props.handleChange />
    <input type="text" value={props.value} onChange={handleInputChange} />
  );
};
```

## Style Props

### `App.tsx`

```tsx
import {Container} from './Container';

function App() {
  return (
    <div>
      <Container styles={{border: '1px solid black', padding: '1rem'}} />
    </div>
  );
}

export default App;
```

### `Container.tsx`

```tsx
type ContainerProps = {
  styles: React.CSSProperties;
};

export const Container = (props: ContainerProps) => {
  return <div style={props.styles}>Text content goes here</div>;
};
```

## Generic props

### `App.tsx`

```tsx
import {List} from './components/generics/List';

const App = () => {
  return (
    <div>
      {/* <List items={['Batman','Superman','Wonder Woman']}
   onClick={(item) => console.log(item)}  />
  <List items={[1,2,3]}
   onClick={(item) => console.log(item)}  /> */}
      <List
        items={[
          {
            id: 1,
            first: 'Bruce',
            last: 'Wayne',
          },
          {
            id: 2,
            first: 'Clark',
            last: 'Kent',
          },
          {
            id: 3,
            first: 'Princess',
            last: 'Diana',
          },
        ]}
        onClick={(item) => console.log(item)}
      />
    </div>
  );
};

export default App;
```

### `List.tsx`

```tsx
type ListProps<T> = {
  items: T[];
  onClick: (value: T) => void;
};

export const List = <T extends {id: number}>({
  items,
  onClick,
}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map((item, index) => {
        return (
          <div key={item.id} onClick={() => onClick(item)}>
            {index}
          </div>
        );
      })}
    </div>
  );
};
```

## Restricting Props

### `App.tsx`

```tsx
import {RandomNumber} from './components/restriction/RandomNumber';

const App = () => {
  <div>
    <RandomNumber value={10} isNegative />
  </div>;
};

export default App;
```

### `RandomNumber.tsx`

```tsx
type RandomNumberType = {
  value: number;
};

type PositiveNumber = RandomNumberType & {
  isPositive: boolean;
  isNegative?: never;
  isZero?: never;
};

type NegativeNumber = RandomNumberType & {
  isNegative: boolean;
  isPositive?: never;
  isZero?: never;
};

type Zero = RandomNumberType & {
  isZero: boolean;
  isNegative?: never;
  isPositive?: never;
};

type RandomNumberProps = PositiveNumber | NegativeNumber | Zero;

export const RandomNumber = ({
  value,
  isPositive,
  isNegative,
  isZero,
}: RandomNumberProps) => {
  return (
    <div>
      {value} {isPositive && 'positive'} {isNegative && 'negative'}{' '}
      {isZero && 'zero'}
    </div>
  );
};
```

## type assertion

### `App.tsx`

```tsx
import {User} from './User';

function App() {
  return (
    <div>
      <User />
    </div>
  );
}

export default App;
```

### `User.tsx`

```tsx
import {useState} from 'react';

type AuthUser = {
  name: string;
  email: string;
};

export const User = () => {
  const [user, setUser] = useState<AuthUser>({} as AuthUser);
  const handleLogin = () => {
    setUser({
      name: 'Keqing',
      email: 'Keqing@genshin.com',
    });
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <div>User name is {user.name}</div>
      <div>User email is {user.email}</div>
    </div>
  );
};
```

## Template Literals and Exclude

### `App.tsx`

```tsx
import {Toast} from './components/Toast';

const App = () => {
  <div>
    <Toast position="center" />
  </div>;
};

export default App;
```

### `Toast.tsx`

```tsx
type HorizontalPosition = 'left' | 'center' | 'right';
type VerticalPosition = 'top' | 'center' | 'bottom';

type ToastProps = {
  position:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, 'center-center'>
    | 'center';
};

export const Toast = ({position}: ToastProps) => {
  return <div>Toast Notification Position - {position}</div>;
};
```

### `Status.tsx`

```tsx
type StatusProps = {
  status: 'loading' | 'success' | 'error';
};

export const Status = (props: StatusProps) => {
  let message;
  if (props.status === 'loading') {
    message = 'Loading...';
  } else if (props.status === 'success') {
    message = 'Data fetched successfully';
  } else if (props.status === 'error') {
    message = 'Error fetching data';
  }
  return (
    <div>
      <h2>Statis - {message}</h2>
    </div>
  );
};
```

## Wrapping HTML Elements

### `App.tsx`

```tsx
import {CustomButton} from './components/Button';

const App = () => {
  <div>
    <CustomButton variant="primary" onClick={() => console.log('Clicked')}>
      Primary Button
    </CustomButton>
  </div>;
};

export default App;
```

### `Input.tsx`

```tsx
type InputProps = React.ComponentProps<'input'>;

export const CustomInput = (props: InputProps) => {
  return <input {...props} />;
};
```

### `Button.tsx`

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary';
  children: string;
} & Omit<React.ComponentProps<'button'>, 'children'>;

export const CustomButton = ({variant, children, ...rest}: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {' '}
      {children}
    </button>
  );
};
```

## Polymorphic Components

### `App.tsx`

```tsx
import {Text} from './components/Text';

const App = () => {
  return (
    <div>
      <Text as="h1" size="lg">
        Heading{' '}
      </Text>
      <Text as="p" size="md">
        Paragraph
      </Text>
      <Text as="label" size="sm" htmlFor="some-id" color="secondary">
        Label{' '}
      </Text>
    </div>
  );
};

export default App;
```

### `Text.tsx`

```tsx
type TextOwnProps<E extends React.ElementType> = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
  children: React.ReactNode;
  as?: E;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;

export const Text = <E extends React.ElementType = 'div'>({
  size,
  color,
  children,
  as,
}: TextProps<E>) => {
  const Component = as || 'div';
  return (
    <Component className={`class-with-${size}-${color}`}>{children}</Component>
  );
};
```
