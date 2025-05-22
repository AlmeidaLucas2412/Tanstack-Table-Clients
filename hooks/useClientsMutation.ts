import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ClientResponse {
  id: string;
  name: string;
  image: string;
  username: string;
  createdAt: string;
  birthDate: string;
}

const deleteClient = async (id: string) => {
  const response = await fetch(
    `https://682f1866746f8ca4a47fd112.mockapi.io/clients/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
};

export const useOptimisticDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return deleteClient(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["clients"] });

      const previousClients = queryClient.getQueryData<ClientResponse[]>([
        "clients",
      ]);

      queryClient.setQueryData<ClientResponse[]>(
        ["clients"],
        (oldClients: ClientResponse[] | null | undefined) => {
          if (!oldClients) return oldClients ?? undefined;
          return oldClients.filter((client) => client.id !== id);
        }
      );

      return { previousClients };
    },
    onError: (_, __, context) => {
      if (context?.previousClients) {
        queryClient.setQueryData(["clients"], context.previousClients);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};
