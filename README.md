# Customer Service dApp

The Customer Service Dapp is a proposed web application that would make it easier for dapps on the Internet Computer (IC) to provide customer service to their users.

It allows customer service reps to create links that can be sent to users to call specific functions from their principal, even if the current front end dapp does not expose the function or if the integration is broken.

## ICDevs.org Bounty

This solution is targeting the ICDevs bounty: https://icdevs.org/bounties/2023/03/24/50-Customer-Service-Dapp.html.

## Developing

Once you've cloned the repository and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Using the dApp

The dApp landing page accepts as input a canister id which will be used to initialize the [candid-ui](https://github.com/dfinity/dfn-components/tree/main/packages/candid-ui). When filling in arguments for a method that is not [blacklisted](#methods-blacklist) the URL will be updated with query parameters for `defaultValues` including the `method` and the `args` that are used within the form for that method.

The URL can be shared and the dApp will pre-fill the whole form accordingly if there is data in the `defaultValues` query parametr.

One example of URL would be the following:

```
https://u4mx2-ziaaa-aaaap-qbgva-cai.icp0.io/canister?canisterId=4u25a-4qaaa-aaaag-abnzq-cai&defaultValues=%257B%2522method%2522%253A%2522transfer%2522%252C%2522args%2522%253A%255B%257B%2522to%2522%253A%257B%2522principal%2522%253A%2522nayto-yhiky-76bvl-3qeh5-eupz7-sgmun-mn5fu-ezr5c-xfdcm-zpk37-6qe%2522%257D%252C%2522token%2522%253A%2522nft-1%2522%252C%2522notify%2522%253Atrue%252C%2522from%2522%253A%257B%2522principal%2522%253A%2522nayto-yhiky-76bvl-3qeh5-eupz7-sgmun-mn5fu-ezr5c-xfdcm-zpk37-6qe%2522%257D%252C%2522memo%2522%253A%255B12%255D%252C%2522subaccount%2522%253A%255B%255B1%252C3%255D%255D%252C%2522amount%2522%253A%2522502%2522%257D%255D%257D
```

## Methods blacklist

We want to prevent the dApp from updating the `defaultValue` query param or pre-filling the form for some methods. This precautionary action is intended to mitigate the possibility of users intentionally sharing URLs containing default values for a method that can make others a falling victim to fraudulent activities.

You can check the `canister.utils.ts` file to update the methods blacklist.

Example:

```js
export const METHODS_BLACKLIST: { [key: string]: string[] } = {
	'*': ['transfer_ownership'],
	'rrkah-fqaaa-aaaaa-aaaaq-cai': ['method_1', 'method_2']
};
```

It is possible to either blacklist a method for any canister or for a specific cansiter only.

## License

MIT License

Copyright (c) 2023 Sebastian Deme

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
