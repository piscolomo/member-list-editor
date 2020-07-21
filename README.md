# MemberListEditor Component
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

**For reviewers:**

I've decided to come up improving the design of dual lists shown in the demo video. When we want to display users available and users assigned, which are double sets of data, I think showing these dual lists is a good way to go, so let's keep the UI that we currently know it works.

I love to keep UI simple so I kept the design with less buttons as possible, sometimes less is more, so instead of having multiple buttons to select all/remove all users, let's use interface experiences that people already are used to, so in order to improve the usability of the component I've decided to add global checkboxes that would select all the users from the list, exactly the same behaviour that you had experienced when you want to select all mails from your Inbox or the whole list of files from your folder. Achieving this multiselect functionality helps us to remove complexity into our interface, that leaves us with the only functional buttons: Add and Remove.

Also, Because organization managers know already which are the users they look for, it's crucial to keep input searches over the list of available users and the final list of members so managers can navigate easily the list, it's also good for them if we keep the lists sorted.

As further directions that I would like to take if I had more time, I would love to implement Lazy Loading inside the User Item elements, so the html from these nodes would be mounted only when the organization manager needs to see them, otherwise final html would be clean as possible only showing a short ammount of UserItems until it's asked for more. As next improvement I would like to collect other interesting sets of data that would gives us a better insight about how we can group the users more efficient, maybe by categories, tags, roles, etc. So organization managers can rely on this information and filter the user lists as they needed, which will decrease by a lot the size of the lists.

MemberListEditor component is located in src/components directory, and test suite in `test.js` files inside `src`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
- **Dear reviewers:** Remember use `a` option after run this command to run all test suite

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
