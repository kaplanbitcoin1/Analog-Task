1 
        npm i @analog-labs/timegraph-js 
        npm i @polkadot/keyring

2 
        nano index.js


3
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { new_cert, build_apikey, encode_ssk, build_ssk } from "@analog-labs/timegraph-wasm";
import { Keyring } from "@polkadot/keyring";
import { waitReady } from "@polkadot/wasm-crypto";

(async () => {
    await waitReady();
    let cert_data, secret;
    const addr = "ADDRESS";
    const PHRASE = "SEED PARSE";
 
    const keyring = new Keyring({ type: "sr25519" });
    const keyPair = keyring.addFromUri(PHRASE);
 
    [cert_data, secret] = new_cert(addr, "developer");
 
    const signature = keyPair.sign(cert_data);
    const key = build_apikey(secret, cert_data, signature);
 
    const ssk_data = encode_ssk({
        ns: 0,
        key: addr,
        user_id: 1,
        expiration: 0,
    });
 
    const ssk_signature = keyPair.sign(ssk_data);
    const ssk = build_ssk(ssk_data, ssk_signature);
 
    const client = new TimegraphClient({
        url: "https://timegraph.testnet.analog.one/graphql",
        sessionKey: ssk,
    });
 
    const response1 = await client.alias.add({
        hashId: "<hash id of the View>", // Look at watch.analog
        name: "<name of the view>", // Look at watch.analog
    });
 
    console.log(response1);
 
    const response2 = await client.view.data({
        hashId: "<hash id of the View>", // Look at watch.analog
        fields: ["_clock", "_index"], // Fields to return
        limit: "10", // Number of records required
    });
 
    console.log(response2);
})();






note: for save  press CTRL+X and press Y and press enter button



4 
        package.json change

 

{
  "type": "module",
  "name": "analog",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@analog-labs/timegraph-js": "^0.1.1",
    "@analog-labs/timegraph-wasm": "^1.0.0",
    "@polkadot/keyring": "^12.6.2",
    "@polkadot/util": "^12.6.2"
  }
}


5 
        NOTE on index.js you need change 


 
const addr = "ADDRESS"; with your address
const PHRASE = "SEED PARSE"; with your seed phase


     hashId: "<hash id of the View>", // Look at watch.analog 
     name: "<name of the view>", // Look at watch.analog


             
6
     node index.js
