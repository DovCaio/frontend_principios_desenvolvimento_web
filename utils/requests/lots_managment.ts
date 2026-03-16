import axios from "axios";
import { url } from "../constants/url";

export const getLots = async () => {
  return await axios.get(`${url}/lot`);
};

export const getResidentsWithoutALot = async () => {
  return await axios.get(`${url}/resident`);
};

export const makeAResidentLiveInLot = async (
  cpf: number,
  lotId: number,
  token: string,
) => {
  return await axios.put(`${url}/employee/associate_resident/${cpf}/lot/${lotId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unmakeAResidentLiveInLot = async (
  cpf: string,
  lotId: number,
  token: string,
) => {

  return axios.delete(
    `${url}/employee/dessociate_resident/${cpf}/lot/${lotId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const makeResidentResponsible = async (
  cpf: string,
  lotId: number,
  token: string,
) => {
  return await axios.put(`${url}/employee/make_responsible_resident/${cpf}/lot/${lotId}}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unMakeResidentResponsible = async (
  cpf: string,
  lotId: number,
  token: string,
) => {
  return await axios.delete(`${url}/employee/unmake_responsible_resident/${cpf}/lot/${lotId}}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
