<p align="center"><a href="https://quickflip.app" target="_blank"><img src="./banners/banner.png"></a></p>

</br>

[QuickFlip](https://quickflip.app) is a simple React app with flashcards powered by Markdown for studying.

### Usage

Import flashcard set from any Github repo, must contain a `quickflip.yaml` file with the following YAML, markdown supported.

```yaml
- id: '1'
  category: Kubernetes (CKAD) - Multi-container Pods
  question: Create a Pod with two containers, both with image busybox and command "echo hello; sleep 3600". Connect to the second container and run 'ls'
  answer: |
    The easiest way to do it is create a pod with a single container and save its definition in a YAML file:

    ```bash
     kubectl run busybox --image=busybox --restart=Never -o yaml --dry-run=client -- /bin/sh -c 'echo hello;sleep 3600' > pod.yaml vi pod.yaml
    ```
```

### Develop
Run the following to install dependencies and start dev server (Vite).
```bash
λ npm i
λ npm run dev
```
### Flash Card Sets

Please see some sample flashcard sets 

- [quickflip-sample](https://github.com/heyjordn/quickflip-sample)
- [quickflip-ckad](https://github.com/heyjordn/quickflip-ckad) 