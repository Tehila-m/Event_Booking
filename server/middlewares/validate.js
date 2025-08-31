export function requireFields(fields) {
    return async (request, reply) => {
      const missing = fields.filter(f => request.body[f] === undefined);
      if (missing.length > 0) {
        return reply.code(400).send({ error: `Missing fields: ${missing.join(", ")}` });
      }
    };
  }
  