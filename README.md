# AWS Lambda with Kinesis trigger

Simple configuration of AWS Lambda processing records from Kinesis Data Stream.

This configuration aims to avoid common pitfalls:

- small batch size
- no error handling
- wrong starting position
- insufficient parallelization

See the article for full description: *TODO*

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

Remove deployed stack:

```bash
yarn run remove --region REGION [--stage STAGE]
```
