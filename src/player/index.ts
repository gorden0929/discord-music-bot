let id: string | null = null;

export const getPlayerId = () => {
  if (!id) {
    id = crypto.randomUUID();
  }
  return id;
};
