# carlo-rpc-store

A simple two-way store for [Carlo] that syncs changes between Node and Browser.

Uses [carlo-rpc-simple] & [undb].

[carlo]: https://github.com/GoogleChromeLabs/carlo
[carlo-rpc-simple]: https://github.com/laggingreflex/carlo-rpc-simple
[undb]: https://github.com/laggingreflex/undb

## Install

```
npm i carlo-rpc-store
```

## Usage

* Node

    ```js
    const carlo = require('carlo')
    const carloStore = require('carlo-rpc-store')

    const app = carlo.launch(...)
    const [store, onChange, loadParams, remoteReady] = carloStore()
    await app.load(uri, loadParams)
    await remoteReady
    onChange(() => {
      /* Fires whenever store changes, locally or on remote */
    })
    store.node = 'value'
    ```

* Browser

    ```js
    const carloStore = require('carlo-rpc-store')
    const [store, onChange] = carloStore()
    onChange(() => {
      /* Fires whenever store changes, locally or on remote */
    })
    store.browser = 'value'
    ```
