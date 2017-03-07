# Client Auth
```
npm i -S redux-form react-thunk axios
On the server:
npm i -S cors
```
CORS
- making request to diff domanain, sub-domain, or port
- tell server to allow connection from any domain
Cors is a middleware on exress side
- you can limit by domain

## Higher order components
- react component that ads additional functionality or data to existing component
- Component + Higher order component = Enhanced Component
- good way to extract functionality that is common to multiple components
- centralizes logic
- used by 3rd party libs: react-redux
```js
function mapStateToProps(state) {
  return { posts: state.posts };
}
//We are enhancing functionality of a component
export default connect(mapStateToProps)(App);
```
## What is the purpose of the Provider?
- Provider holds redux store and watches redux store
- Whenever redux store changes, provider would go and update
all child components
- Provider broadcasts new state
- connect is a higher order component that is specifically made 
to make communication with a provider at the top of the application
