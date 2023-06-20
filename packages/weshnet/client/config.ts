import { ServiceGetConfiguration_Reply } from "../protocoltypes";

class WeshConfig {
  private _config: ServiceGetConfiguration_Reply;
  private _shareLink: string = "";
  private _metadata = {
    rdvSeed: new Uint8Array(),
    tokenId: "",
  };

  get metadata() {
    return this._metadata;
  }
  set metadata(data) {
    this._metadata = data;
  }

  get config(): ServiceGetConfiguration_Reply {
    return this._config;
  }
  set config(config) {
    this._config = config;
  }

  get shareLink(): string {
    return this._shareLink;
  }
  set shareLink(shareLink) {
    this._shareLink = shareLink;
  }
}

const weshConfig = new WeshConfig();

export { weshConfig };