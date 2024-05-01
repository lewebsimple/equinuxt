import { type Queue, type QueueEvents, type Worker } from "bullmq";
import logger from "consola";

declare global {
  type BullMQTask = {
    queue: Queue;
    events: QueueEvents;
    worker: Worker;
    options?: {
      purgeQueue?: boolean;
    };
  };
}

type Tasks = Record<string, BullMQTask>;

export default defineNitroPlugin(async (nitroApp) => {
  // Instantiate tasks queues / workers
  Function.prototype(tasks);

  // Purge queues if needed
  Object.entries(<Tasks>tasks).forEach(async ([name, { queue, options }]) => {
    if (!options?.purgeQueue) return;
    logger.info(`Purging queue ${name}`);
    await queue.obliterate({ force: true });
  });

  logger.success(`BullMQ ready (${Object.keys(tasks).length} task(s))`);
  nitroApp.hooks.hookOnce("close", async () => {
    await Promise.all(Object.values(<Tasks>tasks).map(({ worker }) => worker.close()));
  });
});
