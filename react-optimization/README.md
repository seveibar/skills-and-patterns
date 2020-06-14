# React Optimization

React is very fast if optimized well. In a fast React app, components are rendered only when 1) it is faster to render
than to check if it needs to be rendered or 2) if something has changed that effects how the component is displayed.

In most early React apps, components are rendered when **anything** changes. Most of the time, this isn't a problem. However,
when an application starts to get slow, it's time to open the React Dev Tools and profile components.
