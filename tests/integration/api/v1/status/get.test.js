import { expectNoPendingImmediates } from "next/dist/server/node-environment-extensions/fast-set-immediate.external";

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});
