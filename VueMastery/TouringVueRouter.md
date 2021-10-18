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
