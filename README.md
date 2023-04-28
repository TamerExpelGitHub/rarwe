# emberjs-tutorial

This README will serve as a personal notes for myself to maintain my understanding of EmberJS.

_**Note:** This personal notes is written in addition to notes from lessons learned while building SuperRentals via Emberjs Tutorial. and building e-commerce website via YouTube Emberjs Tutorial_

> > Ember.js's high-value, uncompromising points of view:
> >
> > 1.  **URLS are the most distinctive feature of web applications, whether server- or client-side. Thus, any framework worth its salt has to support URLs** -- powerful routers and wide range of features.
> > 2.  **Convention over Configuration** -- chief design principle in Ember.
> > 3.  **Only code that is worth writing should be written** -- generator for the wins!
> > 4.  **Declarative templates and The Rule of Least Power**
> > 5.  **Stability without stagnation**

## Conventions

> Ember comes with strong _conventions_ and sensible defaults. Despite these defaults, EmberJS are still flexible enough to allow customization such as customzing paths for our routes.

## application.hbs

> Considered a special template that does not have its own URL and cannot be navigated to on its own. Rather, it is used to specify a common layout that is shared by every page in your app. Excellent for site-wide UI elements like nav-bar and footer.

## Ember Routing System

> When creating a route `app/router.js`, two JavaScript files are created in support: `app/routes/<name>.js` and `app/controllers/<name>.js`. Both JavaScript files support the template: `app/templates/<name>.js`
>
> - **Application route:** `/` <- The main template
> - **Basic route:** `this.route('<name>')` <- `/<name>`
> - **Nested route:** `this.route('<name>', function () { this.route('<nested name>'); });` <- `/<name>/<nested name>`
> - **Index route:** default route at a given current level <- `/<name>/<index>` === `/<name>` but with separate template
> - **Dynamic route:** `this.route('<name>', path: {'/<name>/:id'});` <- `/<name>/1`
> - **404 Not Found route:** `this.route('<name>', path: {'/*path'});` <- redirect any non-existing routes to `/<name>`

## Route vs Controller

> **Route:** `route/<name>.js` typically contain `model()` hook and can pass model to `template/<name>.hbs` and/or `controller/<name>.js`
>
> **Controller:** `controller/<name>.js` typically contain properties and actions

## LinkTo

> When clicking on these special links, Ember will intercept the click, render the content for the new page, and update the URL. All performed locally without having to wait for server, thus avoiding a full page refresh.

## Understanding `{{outlet}}`

> Keyword denotes the place where our site's pages should be rendered into, similar to `{{yield}}` below. Outlets are slots in the template where content can be rendered from child routes.

## Understanding `{{yield}}`

> When invoking a component, Ember will replace the component tag with the content found in the component's template. It is also common to pass content to components, like `<Jumbo>some content</Jumbo>`. This is enabled using `{{yield}}` keyword, which will be replaced with the content that was passed to the component.

## Model Hook

> An async method known as `model()`. Responsible for fetching and preparing any data for the route. Ember automatically call this hook when entering a route. Also typically housed in routes

## Order of Route Hooks

### beforeModel(transition) {...}

> First `model` hook called with the only parameter it receives is the current route transition
>
> Common use case: authentication

### model(params, transition) {...}

> In addition to the transition, this model also receives the params from the URL, which are parsed according to the routing tree

### afterModel(model, transition) {...}

> Once the model is resolved, this hook is called with the model and the transition object

### setupController(controller, model, transition) {...}

> When all of above hooks are called, all run for all levels of the transition, the transition is validated, then this hook is called.

## modelFor Method

> Fetches the model of a parent route that had already been activated.

## Understanding `...attributes`

> An answer to hard-coding specific values for the `src` and `alt` attributes. this allows arbitrary HTML attributes to be passed in when invoking this component: `<Rental::Image src="..." alt="..."/>` => `<img ...attributes>`

## Component vs Component-class

> Allow you to optionally associate JavaScript code with a component -- in this case a glimmer component class. Essentially a source code (js) for the supporting component. i.e. `app/component/rental/image.hbs` & `app/component/rental/image.js`

## Understanding `this.args`

> Arguments passed into a component are accessible on `this.args`.

## Properties & Arguments

> **Property** is the variable defined within the current class
>
> **Argument** is something passed from parent component
>
> Argument used `@` sign before the property: `<Child @propB={{this.propB}} />` (`this.probB` is sourced from property in corresponding JavaScript file)
>
> _Example:_ `child.hbs` -- from a parent component: `{{@probB}}` (sourced from argument above)
>
> _Example:_ `child.hbs` -- in a child component: `{{this.probA}}` (sourced from property in corresponding JavaScript file)

## Data Down Actions Up (DDAU)

> The act of passing data down into a component while using a handler function to communicate upwards to a parent that invoke the component

## Glimmer component

> One of the serveral component classes available in Ember. Learn more about [Glimmer Component](https://guides.emberjs.com/release/upgrading/current-edition/glimmer-components/).

## Ember [decorator](https://guides.emberjs.com/release/in-depth-topics/native-classes-in-depth/#toc_decorators)

> User defined modifiers that can be applied to a class or class element such as field or method to change its behavior. Can be used within component or controller.

### `@tracked`

> Inform Ember to monitor the assigned variable for updates

### `@action`

> Inform ember that we intend to use this method from our template. Without the decorator, the function will not function properly as a callback function.

### `@attr`

> Used to declare the attributes of a rental property. These attributes correspond directly to the attributes data we expect the server to provide in its responses.

## Ember [modifier](https://guides.emberjs.com/release/components/template-lifecycle-dom-and-modifiers/#toc_event-handlers)

> Event handler (i.e.: `{{ on ... }}`) added to an HTML element. Operate by passing the element to a function that can do anything with it.
>
> `(fn @<functionName> value)` -- when a function is envoked, the value is used to pass into the function. A full action with on clicking: `{{ on "click" (fn @<functionName> value) }}`

## Ember Helpers

> **Built-in Helpers:**
>
> - `{{ on`
> - `{{ concat` - concat mulitple strings - `{{concat "active-" @color}}`
> - `{{ let` - help you define a temporary variable - `{{let (concat this.firstName this.lastName) as |fullName|}}`
>   - `{{#let}} content... {{/let}}` - for block scope
> - `{{ if` - a conditional statement - `{{if this.isRed 'red' 'black'}}`
>   - `{{#if}} content... {{/if}}` - for block scope
>   - `{{#if}} content... {{else}} content... {{/if}}` - for if/else block scope
>   - `{{#if}} content... {{else if}} content... {{/if}}` - for if/else if block scope
> - `{{ get` - get value with given key from the object provided - `{{get this.product "name"}}` _or_ `{{get this.product this.attribute}}`
> - `{{ hash` - allow you to create object (hash) within a template - `<Child @user={{hash firstName="Tamer" lastName="Mahmoud"}} />`
> - `{{ unless` - basically opposite of if conditional statement
>   - `{{#unless}} content... {{/unless}}` - for block scope
>   - `{{#unless}} content... {{else}} content... {{/unless}}` - for unless/else block scope
>   - `{{#unless}} content... {{else if}} content... {{/unless}}` - for unless/else if block scope
> - `{{ each` - essentially a for loop - `{{#each list as |item|}} <li>item.attr</li> {{/each}}`

## Understanding setupController

> A hook that comes in handy when you want to set properties on the controller (from the routes)

## Understanding resetController

> A hook used to update controller properties when moving between routes. It's called on the route everytime a route transition is initiated.

## Ember Services

> In Ember, services serve a similar role to global variables, in that they can be easily accessible by any part of the app. The bigget difference from global variables, is that services are scoped to your app; instead of all the JavaScript code that's running on the same page. This allows you to have multiple scripts running on the same page without interfering with each other.

## [Ember Data](https://guides.emberjs.com/release/models/)

> Ember Data store acts as a kind of intermediary between our app and the server; it does many important things, including caching the responses that were fetched from the server. If we request some records (instances of model classes) that we had _already_ fetched from the server in the past, Ember Data's store ensures that we can access the records immediately, without having to fetch them again unnecessarily and wait for the server to response. But, if we don't already have that response cached in our store, then it will go off and fetches it from the server.
>
> Source of Ember Data fetch are found in the `app/model/` folder

## Adapter

> Adapters deal with _how_ and _where_ Ember Data should fetch data from your servers, such as whether to use HTTP, HTTPS, WebSockets, or local storage, as well as the URLs, headers and parameters to use for these requests.

## Serializer

> Serializers are in charge of converting the data returned by the server into a format Ember Data can understand.

## Automated Testing

> Uses [`QUnit`](https://qunitjs.com/) js testing framework
>
> Put automated testing into motion: `ember test --server` or `ember t -s`
>
> Automated testing URL: [`http://localhost:7357/`](http://localhost:7357/)
>
> - **Acceptance test:** test the _work flow_ of an application. Since a page can take time to load, we use `async/await` to ensure that each step wait its turn before moving on.
>
> - **Component test:**, also known as rendering (integration) test used to render and test a single component at a time.
>
> - **Unit test:** doesn't actually render anything. It instantiates the model object and tests the model object directly, manipulating its attributes and asserting their value.
>
> `beforeEach` is a hook used to share boilerplate code, that allows you to have two tests that each focus on different, single aspect of the component. `beforeEach` runs once before each test function which is an ideal place to set up anything that might be needed by all test cases in the file.

## Ember Generators

> Typically written as `ember generate <type> <name>` or `ember g <type> <name>`.

### Route generator

> `ember generate route <name>`
>
> `ember generate route <name>/<nested name>`

### Controller generator

> `ember generate controller <name>`

### Component generator

> `ember generate component <name>`
>
> Will generate a component template at `app/component/<name>` and a component test file at `tests/integration/components/<name>`
>
> `ember generate component <name>/<name>`
>
> This is a namespaced components, allowing you to organize components by folders according to their purpose. Invoked as `<name::name>`

### Component-class generator

> `ember generate component-class <name>`

### Component generator with component class

> `ember generate component <name> --with-component-class`
>
> alt: `ember g component <name> -gc`

### Helper generator

> `ember g helper <name>`

### Service generator

> `ember g service <name>`

### Adapter & Serializer generator

> `ember g adapter <name>`
>
> `ember g serializer <name>`

### Acceptance Test generator

> `ember generate acceptance-test <name>`

### Component Test generator

> `ember generate component-test <name>`

## Setting proxy server

> `ember s --proxy=http://...` - minimize need to prepend the host when fetching (for developmental purpose only)
