## Coincover Tech Test


### Information

[Node](https://nodejs.org/en/download) - version 20.5.1
[Yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) - version 1.22.19


### Environment & Set Up

- System set up

```bash
brew install node
yarn global add rimraf
```

- Project set up

```bash
yarn run ci
```


### Development

- run app locally

```bash
yarn run local
```

- invoke app locally

```bash
curl  -H "Content-Type: application/json" -d "{\"operand1\": \"1\",\"operand2\": \"1\",\"operation\": \"+\"}" http://localhost:3000/v1/calculate
```


### Testing

- Run all tests

```bash
yarn run test
```


## Scripts

- Build docker image

```bash
bash scripts/build.sh <environment>
```

- Push docker image

```bash
bash scripts/push.sh <environment>
```

- Run docker image locally

```bash
bash scripts/run.sh --service example --environment <environment>
```
