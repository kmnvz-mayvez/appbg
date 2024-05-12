import { config } from '@users/config';
import { winstonLogger } from '@kmnvz-mayvez/myapp-share';
import { Channel, ConsumeMessage, Replies } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@users/queues/connection';
import { createUser } from '@users/services/user.service';
import { IUserDocument } from '@users/interface/user.interface';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersServiceConsumer', 'debug');

const consumeUserDirectMessage = async (channel: Channel): Promise<void> => {
  try {
    if (!channel) {
      channel = (await createConnection()) as Channel;
    }
    const exchangeName = 'user-update';
    const routingKey = 'user';
    const queueName = 'user-queue';
    await channel.assertExchange(exchangeName, 'direct');
    const myappQueue: Replies.AssertQueue = await channel.assertQueue(queueName, { durable: true, autoDelete: false });
    await channel.bindQueue(myappQueue.queue, exchangeName, routingKey);
    channel.consume(myappQueue.queue, async (msg: ConsumeMessage | null) => {
      const { type } = JSON.parse(msg!.content.toString());
      if (type === 'auth') {
        const { username, email, phoneNumber, profilePicture, hourStay, plateNumber, cost, createdAt } = JSON.parse(msg!.content.toString());
        const user: IUserDocument = {
          username,
          email,
          profilePicture,
          cost,
          hourStay,
          plateNumber,
          phoneNumber,
          createdAt
        };
        await createUser(user);
      }
      channel.ack(msg!);
    });
  } catch (error) {
    log.log('error', 'UsersService UserConsumer consumeUserDirectMessage() method error:', error);
  }
};

export { consumeUserDirectMessage };
