export const getDefaultResponse = (body: object, code: number = 200) =>
  new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
