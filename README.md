# AWS Lambda with Kinesis trigger

Simple configuration of AWS Lambda processing records from Kinesis Data Stream.

This configuration aims to avoid common pitfalls:

- small batch size
- no error handling
- wrong starting position
- insufficient parallelization

See the article for full description: [6 Common Pitfalls of AWS Lambda with Kinesis Trigger](https://dashbird.io/blog/lambda-kinesis-trigger/)

## Development

Deploying will create Kinesis Stream for which **you will be charged per hour**.
Make sure to remove the stack when no longer needed.

Install dependencies:

```bash
yarn install
```

Deploy:

```bash
yarn run deploy --region REGION [--stage STAGE]
```

Send new records to the Kinesis:

```bash
yarn run produce --region REGION [--stage STAGE]
```

Remove deployed stack:

```bash
yarn run remove --region REGION [--stage STAGE]
```
