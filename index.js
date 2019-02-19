const RPC = require('carlo-rpc-simple');
const undb = require('undb');

class RPCStore extends RPC {
  constructor({ db, rpc: { id = 'carlo-rpc-store', ...rest } }) {
    super({ id, ...rest });
    this.db = db;
    this._remoteSetDefer.promise = this._remoteSetDefer.promise.then(() => {
      return this.remote.update(JSON.parse(JSON.stringify(this.db)));
    });
  }
  update(update) {
    if (JSON.stringify(this.db) === JSON.stringify(update)) {
      return;
    };
    Object.assign(this.db, update);
  }
};

module.exports = ({
  rpc: rpcOpts = { id: 'carlo-rpc-store' },
  undb: undbOpts = {},
  update = 'both',
} = {}) => {
  const [db, onChange] = undb(undbOpts);
  const rpc = new RPCStore({ db, rpc: rpcOpts });
  onChange(() => {
    if (update === 'both' || (update === 'browser' && !rpc.isBrowser))
      rpc.remote.update(JSON.parse(JSON.stringify(db)));
  });
  return [db, onChange, rpc.loadParams(), rpc.remoteReady];
};
