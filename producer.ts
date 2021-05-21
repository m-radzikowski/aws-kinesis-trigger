import yargs from 'yargs';
import {GetParameterCommand, SSMClient} from '@aws-sdk/client-ssm';
import {KinesisClient, PutRecordCommand} from '@aws-sdk/client-kinesis';
import {v4 as uuid} from 'uuid';
import {TextEncoder} from 'util';

const argv = yargs(process.argv.slice(2))
    .option('region', {type: 'string', demandOption: true, default: 'eu-west-1'})
    .option('stage', {type: 'string', demandOption: true, default: 'dev'})
    .argv;

const ssm = new SSMClient({region: argv.region});
const kinesis = new KinesisClient({region: argv.region});

const encoder = new TextEncoder();

const main = async () => {
    const streamNameResult = await ssm.send(new GetParameterCommand({
        Name: `/blog/${argv.stage}/kinesisMistakes/kinesisStreamName`,
    }));
    const streamName = streamNameResult.Parameter?.Value || '';

    const runId = uuid().split('-')[0];

    console.log(`Sending messages to Kinesis Stream ${streamName} with runId ${runId}`);
    console.log(`Press Ctrl+C to stop`);

    let counter = 0;
    while (true) {
        const partitionKey = uuid();
        const data = JSON.stringify({
            runId,
            counter: counter++,
        });
        console.log(`Sending record with partition key: ${partitionKey}`);
        console.log(data);

        await kinesis.send(new PutRecordCommand({
            StreamName: streamName,
            PartitionKey: partitionKey,
            Data: encoder.encode(data),
        }));

        await sleep(1000);
    }
};

const sleep = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    });
