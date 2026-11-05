export function ok<T>(data: T, init?: ResponseInit) {
  return Response.json({ code: 0, data }, init);
}

export function fail(code: number, message: string, status = 400) {
  return Response.json({ code, message }, { status });
}
