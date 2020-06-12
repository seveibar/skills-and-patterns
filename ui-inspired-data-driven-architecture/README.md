# User Interface Inspired, Data Driven Architecture

When starting to build or architecting an application, you can start in many different places. Many decisions about the interface,
data and functionality will be considered. The best process for doing this is User Interface Inspired, Data Driven
Architecture (UI-DDA). This process is very effective at delivering the smallest amount of code, and the best interface.

To do UI-DDA, you perform the following process:

1. Build 80% of the user interface for the application in React Storybook (solicit feedback often)
2. Design the database schema
3. Use Postgrest to build the API
4. Build the application using the components from the storybook

An important part of DDA is the API is as little code as possible.
