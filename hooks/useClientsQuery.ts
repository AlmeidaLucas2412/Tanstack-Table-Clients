import { useQuery } from "@tanstack/react-query";

const fetchTodos = async () => {
  const res = await fetch(
    "https://682f1866746f8ca4a47fd112.mockapi.io/clients"
  );

  const data = await res.json();

  return data;
};

export const useClientsQuery = () =>
  useQuery({
    queryKey: ["clients"],
    queryFn: fetchTodos,
  });
