# Seamless Immutable Pattern

The seamless immutable pattern allows you to build fast react components.

Immutability means that an object can't be modified. In functional programming, immutability is used
to give strong guarantees about the values of variables and to make optimizations. In React, immutability
is used to optimize code for rendering.

React rerenders a component when it's props don't pass a shallow equal test. Consider the following subsequent renders:

```javascript
const MyComponent = ({ a, b }) => <div>a={a}, b={b}</div>

// Render 1
<MyComponent a={1} b={2} />
// Renders to <div>a=1, b=2</div>

// Render 2
<MyComponent a={1} b={2} />
// Also renders to <div>a=1, b=2</div>
```

React knows that the second rendering of the component is equal, because it runs a shallow comparison on the props; it
checks each prop to see if it changed.

```javascript
next.a === prev.a // true
next.b === next.b // true
// okay! no need to rerender! I'll use the same rendering from before
```

This becomes problematic when you work with objects. Since objects aren't primitives, you can't compare them normally:
```javascript
{a: 1} === {a: 1} // false! These are different object references
```

React doesn't do deep comparisons because deep comparisons become very expensive. This is where seamless immutable comes in.
Seamless immutable tracks changes to objects, so that you can directly compare objects.

TODO simple seamless immutable react pattern.
