import {KinesisStreamHandler} from 'aws-lambda/trigger/kinesis-stream';
import {logger, setupLogger} from './logger';

export const handler: KinesisStreamHandler = async (event, context?) => {
    setupLogger(context);
    logger.debug('Event', {event});

    logger.info('Records count', {count: event.Records.length});
    event.Records.forEach((record, index) => {
        const data = JSON.parse(Buffer.from(record.kinesis.data, 'base64').toString('utf-8'));
        logger.info('Record', {
            index,
            eventId: record.eventID,
            eventName: record.eventName,
            partitionKey: record.kinesis.partitionKey,
            sequenceNumber: record.kinesis.sequenceNumber,
            approximateArrivalTimestamp: record.kinesis.approximateArrivalTimestamp,
            data: record.kinesis.data,
            parsedData: data,
        });

        // uncomment to simulate processing errors
        // if (data.counter > 0 && data.counter % 5 === 0) {
        //     throw new Error('Unsupported counter value that is a multiple of 5: ' + data.counter);
        // }
    });
};
