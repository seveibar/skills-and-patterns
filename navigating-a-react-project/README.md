# Navigating a React Project

React components can be hundreds of lines and scattered across hundreds of files. However, it is very easy to navigate a
React project if you know some common patterns.

## Know the Roots

Where does the project start? Know the top 1-2 levels of components, using these components, you can navigate down
and up the tree to get to the specific piece of code you need.

Usually, the "App.js" file is where the project begins. This file will define different Context Providers for the application,
and probably set up the state management system.

## Find a Component

Using React Dev Tools, you can find the name of any component on a page. Just navigate to the "Components" tab and click
the component on the page you want to see. Then do a file name search for the components name.

## Find a Component's Usage

This is known as navigating "up" the tree. Doing this in React is very easy. Do a file content search for "<ComponentName".

> Note: Notice the "<" character at the beginning of the search term. This is essential to finding the usage! Don't
> search for the component name without the "<" character to find usage!

## Reading a Component

Many slow developers read a React file from the top to the bottom. **Don't read a React file from the top to the bottom**.

**When you open a React file, you'll almost always want to look the children it renders. Quickly scan the document for
where it returns it's children and start there. When you need to add things, you'll go up to add imports or props.**
