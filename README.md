# webdriverio-accessibility-seleniumconf2025

## Install
First in the root of the repo run the following command to install the dependencies.
```bash
npm install
```

## Using the submodules
This repo contains **optional** submodules for the websites used in the tests. The websites are also hosted online, but if you'd like to make local changes, you can use the submodules.

You can initialize them by running the following command:
```bash
git submodule update --init --recursive
```

## Using the Deque Axe Watcher
This is **only** necessary if you want to run the `wdio-axe-watcher.e2e.ts` tests. You'll need to create an `.env` file with the environment varialbe `DEQUE_API_KEY` with your Deque Developer Hub api-key.   
You can create that [HERE](https://axe.deque.com/settings)

## The websites
The following websites are used in the tests:
- https://a11y-assessments.pages.oit.duke.edu/accessible-u/before_u.html
- https://www.washington.edu/accesscomputing/AU/before.html

If you want to use the submodules, you can host them locally from within the specific site folder.
Go to the `sites` folder and and go to the folder of one of the sites, then run the following command:    
```bash
npx live-server
```


## Resources
[IBM equal access toolkit](https://www.ibm.com/able/toolkit/)
[Deque VoiceOver shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

## Readings
Some readings that might give you an insight:
* https://benmyers.dev/blog/clickable-divs/
* https://www.smashingmagazine.com/2019/02/buttons-interfaces/