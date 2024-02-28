import { useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import { generateAuthHeader } from "../auth/authentification";

interface ErrorWithId extends Error {
  id?: string;
}

export function useGetIds(offset: number, limit: number) {

  return useQuery(
    ["getIds", offset, limit],
    async () => {
      const authHeader = generateAuthHeader("Valantis");
      try {
        const response = await axios.post(
          "http://api.valantis.store:40000/",
          {
            action: "get_ids",
            params: { offset, limit },
          },
          {
            headers: { "X-Auth": authHeader },
          }
        );
        return response.data.result;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          console.error(axiosError.response?.data.id || axiosError);
          throw axiosError;
        }
        throw error;
      }
    },
    {
      retry: (error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          return !!axiosError.response?.data.id;
        }
        return false;
      },
    }
  );
}

export function useGetItems(ids: string[]) {
  return useQuery(
    ["getItems", ids],
    async () => {
      const authHeader = generateAuthHeader("Valantis");
      try {
        const response = await axios.post(
          "http://api.valantis.store:40000/",
          {
            action: "get_items",
            params: { ids },
          },
          {
            headers: { "X-Auth": authHeader },
          }
        );
        return response.data.result;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          console.error(axiosError.response?.data.id || axiosError);
          throw axiosError;
        }
        throw error;
      }
    },
    {
      retry: (error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          return !!axiosError.response?.data.id;
        }
        return false;
      },
    }
  );
}

export function useGetFields(offset: number, limit:number) {
  return useQuery(
    ["getFields", offset, limit],
    async () => {
      const authHeader = generateAuthHeader("Valantis");
      const fields = ["brand", "price", "product"];
      const results: Record<string, any> = {};
      for (const field of fields) {
        try {
          const response = await axios.post(
            "http://api.valantis.store:40000/",
            {
              action: "get_fields",
              params: { field, offset, limit },
            },
            {
              headers: { "X-Auth": authHeader },
            }
          );
          results[field] = response.data.result;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ErrorWithId>;
            console.error(axiosError.response?.data.id || axiosError);
            throw axiosError;
          }
          throw error;
        }
      }
      return results;
    },
    {
      retry: (error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          return !!axiosError.response?.data.id;
        }
        return false;
      },
    }
  );
}

export function useFilter(params: Record<string, any>) {
  return useQuery(
    ["filter", params],
    async () => {
      const authHeader = generateAuthHeader("Valantis");
      try {
        const response = await axios.post(
          "http://api.valantis.store:40000/",
          {
            action: "filter",
            params,
          },
          {
            headers: { "X-Auth": authHeader },
          }
        );
        return response.data.result;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          console.error(axiosError.response?.data.id || axiosError);
          throw axiosError;
        }
        throw error;
      }
    },
    {
      enabled: !!params,
      retry: (error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorWithId>;
          return !!axiosError.response?.data.id;
        }
        return false;
      },
    }
  );
}
