const RPC = require('carlo-rpc-simple');
const undb = require('undb');

class RPCStore extends RPC {
  constructor({ db, rpc: { id = 'carlo-rpc-store' } }) {
    super({ id });
    this.db = db;
    this._remoteSetDefer.promise = this._remoteSetDefer.promise.then(() => {
      return this.remote.update(this.db);
    });
  }
  update(update) {
    if (JSON.stringify(this.db) === JSON.stringify(update)) {
      return;
    };
    Object.assign(this.db, update);
  }
};

module.exports = ({ rpc: rpcOpts = { id: 'carlo-rpc-store' }, undb: undbOpts = {} } = {}) => {
  const [db, onChange] = undb(undbOpts);
  const rpc = new RPCStore({ db, rpc: rpcOpts });
  onChange(() => {
    rpc.remote.update(db);
  });
  return [db, onChange, rpc.loadParams(), rpc.remoteReady];
};
