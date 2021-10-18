## References

+ [Creating a Vue project using Vue CLI](https://cli.vuejs.org/guide/creating-a-project.html#vue-create)
+ [Installing vuetify using Vue CLI](https://vuetifyjs.com/en/getting-started/installation/)
+ [Installing vue-i18n using Vue CLI](https://kazupon.github.io/vue-i18n/installation.html)
+ [Adding the project to GitHub](https://docs.github.com/es/github/importing-your-projects-to-github/importing-source-code-to-github/adding-an-existing-project-to-github-using-the-command-line)
+ [Creating a fake online REST server](https://my-json-server.typicode.com/)
+ [Deploying from GitHub using Render](https://cli.vuejs.org/guide/deployment.html#general-guidelines)
    + [Connecting GitHub with Render](https://render.com/docs/github)
+ [Adding custom domains in Render](https://render.com/docs/custom-domains)
    + [Configuring domain with Sered and Cloudflare](https://sered.net/revista/configura-tu-dominio-con-sered-y-cloudflare)
    + [Configuring Cloudflare DNS](https://render.com/docs/configure-cloudflare-dns)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Creating the Project

### node_modules
Dependencies needed to build project

### public
Files you don't want to process through Webpack

### src
Application code
- assets: Store images, fonts, etc.
- components: Building blocks of the app
- Vue Router: App navigation
- Vuex: State Management
- views: Components for different "views" of app
- App.vue: Root component (All other components are nested within it)
- main.ts: Renders App and mounts it to DOM



## Single File Components

- template -> body 
- script -> brain
- style -> clothes


## Vue Router Essentials

### Server-Side Routing
The user types a url, the browser requests the url from the server, and the server returns the page.
If the user where to click on a link on that page, the browser would request that url, and return the new page.

Browser refreshes on every page load.

### Client-Side Routing
When the user types in the url, the browser is going to request that url, and the server returns page index.html
including the rest of the app.

Because the app already has all the code it needs within the browser, Vue, with the help of Vue Router, compares and
then renders the differences without ever reloading the page.


## API Calls with Axios
We don't want data to be hard-coded. We want to be fetching the data with and API Call where we make a request to our
server for the data, the server sends back a response with the data as JSON, and then we take data and set it to
display.

### Axios
- GET, POST, PUT, and DELETE requests
- Add authentication to each request
- Set timeouts if requests take too long
- Configure defaults for every request
- Intercept requests to create middleware
- Handle errors and cancel requests properly
- Properly serialize and deserialize requests & responses


## Deploying with Render
To consider for deployment:
- Find a web hosting service
- Get SSL for a secure domain
- Build the site locally
- Drop those files into the server
- Ensure its served correctly

Once deployed you have to maintain it, add features, fix bugs, a nd ensure emergency rollbacks.


## Receiving URL Parameters

Use a Route parameter as Props
```
{
    path: '/events/:page',
    component: Events,
    props: true
}

props: {
    page: Number
}
```

Props Object Mode
```
{
    path: '/',
    name: 'Home',
    component: Home,
    props: { show: true }
}

props: {
    show: Boolean
}
```

Props Function Mode
```
http://localhost:8080/?e=true

{
    path: '/',
    name: 'Home',
    component: Home,
    props: (route) => ({ show: route.query.e })
}

props: {
    show: Boolean
}
```

## Programmatic Navigation

### Using Replace instead of Push to Navigate
To navigate without pushing a history entry into the browser (effectively disabling the back button)

### Navigating the History Stack with Go
You can programmatically invoke the browser back and forward buttons with:
```
this.$router.go(1)
```
Goes forward (like your browser's forward button)
```
this.$router.go(-1)
```
Goes backward (like your browser's backward button)

Could be useful for building a native app where you have custom back & forward buttons.


## Error Handling and 404s

### 3 Common Error We Need to Account For
- When user tries to navigate to a page that doesn't exist.
  - When a path doesn't exist, load a NotFound component.
- When user navigates to a resource that doesn't exist.
  - When an event doesn't exist, load a NotFound component.
- When user's network connectivity fails.
  - When the network fails, let's load a NetworkError component.


## Flash Messages

### Problem: No Message when Registering for an Event
- Create a global storage mechanism to store a flach message
  - Isn't this what Vuex is for? Yes, but thanks to Vue 3 we have another solution if we don't need Vuex. 
    We can create a reactive object to usa as Global Storage, and share that object across our app.
    Reactive means that when the object is updated, any Component that uses the object is re-rendered.
- Set the flash message inside Register.vue
- Create a place where flash message is displayed


## In-Component Route Guards

### Problem: When Internet is Slow Our Page Hangs
We can solve this by using a progress bar with either:
- In-Component Route Guards
  - Move API call into an In-Component Route Guard
  - Install nprogress, progress bar library
  - Start progress bar when routing to the component
  - Finish the progress bar when API call finishes
  - Ensure that pagination still works
- Global & Per-Route Guards

### Introducing 3 In-Component Route Hooks by Vue Router
These are additional lifecycle hooks, like created, mounted, and updated.
```
beforeRouterEnter(routeTo, routeFrom, next)
```
Called before the component is created, with no access to *this*.
```
beforeRouterUpdate(routeTo, routeFrom, next)
```
Called when route changes, but the component has not. Has access to *this*.
```
beforeRouterLeave(routeTo, routeFrom, next)
```
Called when route is navigated away from. Has access to *this*.

- routeTo: The route that is about to get navigated to.
- routeFrom: The route that is about to be navigated away from.
- next: A function used to resolve the hook and continue navigation.

```
next() or return true
```
Continue navigation to the component listed in routeTo.
```
next(false) or return false
```
Cancel the navigation.
```
next('/') or return '/'
```
Redirect to the / path
```
next({ name: 'EventList' }) or return  { name: 'EventList' }
```
Redirect to the named path.


## Global and Per-Route Guards

### Introducing 3 Global Navigation Guards
Each called whenever a navigation is triggered.

```
router.beforeEach((to, from) => { ... })
```
Called before each navigation, and before in-component guards.

```
router.beforeResolve((to, from) => { ... })
```
Called before each navigation, but after in-component guards.

```
router.afterEach((to, from) => { ... })
```
Called after navigation is complete.

### Vue Router Guards Calling Order

1. router.beforeEach((to, from) => { ... })
2. beforeEnter(routeTo, routeFrom) { ... }
3. beforeRouteEnter(routeTo, routeFrom) { ... }
4. router.beforeResolve((to, from) => { ... })
5. router.afterEach((to, from) => { ... })
6. beforeCreate()
7. created()
8. ...


## Wrapping Up

### 3 Important Features of Vue Router
- Route Meta Fields: Allow us to introduce extra information with our routes
- Lazy Loading Routes: Split parts of our application into different Javascript files
- Scroll Behavior: To make our navigation more user-friendly
  - How to force Vue to scroll to the top of the page when we navigate?
