import { type Queue, type QueueEvents, type Worker } from "bullmq";
import logger from "consola";

declare global {
  type BullMQTask = {
    queue: Queue;
    events: QueueEvents;
    worker: Worker;
  };
}

export default defineNitroPlugin(async (nitroApp) => {
  Function.prototype(tasks);
  Object.entries(tasks).forEach(([name, { queue }]) => {
    logger.info(`Purging queue ${name}`);
    queue.obliterate({ force: true });
  });
  logger.success(`BullMQ ready (${Object.keys(tasks).length} task(s))`);
  nitroApp.hooks.hookOnce("close", async () => {
    await Promise.all(Object.values(tasks).map(({ worker }) => worker.close()));
  });
});
