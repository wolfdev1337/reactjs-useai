# reactjs-useai

A simple React hook to call AI endpoints with built-in loading and error handling.

<p>
<a href="https://github.com/wolfdev1337" style="padding-left:5px"><img alt="X platform" src="https://img.shields.io/badge/Github-25292f"></a>
<a href="https://x.com/WolfDev1337"><img alt="Github platform" src="https://img.shields.io/badge/Twitter-1DA1F2"></a>
</p>

## Installation

```bash
npm install reactjs-useai
```

## Usage

```typescript
import useAi from "reactjs-useai";

const { data, error, loading, call } = useAi("/api/ask");

call({ prompt: "Hi, How are you ?" });
```
