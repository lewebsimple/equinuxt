import { type Job, Queue, QueueEvents, Worker } from "bullmq";

const { connection } = useRuntimeConfig().bullmq;

export type DummyTaskData = {};
export type DummyTaskReturn = { message: string };

export const dummyTask: BullMQTask = {
  queue: new Queue<DummyTaskData, DummyTaskReturn>("DummyTask", { connection }),
  events: new QueueEvents("DummyTask", { connection }),
  worker: new Worker<DummyTaskData, DummyTaskReturn>(
    "DummyTask",
    async (_job: Job<DummyTaskData>) => {
      return { message: "DummyTask done!" };
    },
    { connection },
  ),
};
