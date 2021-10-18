## Intro to Vuex: State Management Pattern + Library

State: Data your components depend on and render. Is reactive.

The Vuex Store has Actions which can update the Vuex State, and has Getters which can access the State.
<br />
The Store also has Mutations. Mutations are used to commit and track State changes.
<br />
It's best practice having Actions call Mutations which update State directly
