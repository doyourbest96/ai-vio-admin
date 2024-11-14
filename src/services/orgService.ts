import { ApiSuccessResponse } from "@/types";
import { api } from "@/utils/api";

export interface OrgModel extends BaseOrgModel {
  id?: string;
}

export interface BaseOrgModel {
  createdAt?: string;
  creatorType?: string;
  isActive?: boolean;
  isPremium?: boolean;
  name?: string;
  size?: boolean;
  dmlType?: string;
  owner?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }
}

interface ApiOrgsResponse {
  data?: OrgModel[];
}

interface ApiOrgResponse {
  data?: OrgModel;
}

export const getOrgs = async (): Promise<ApiOrgsResponse> => {
  const response = await api.get("/api/orgs?offset=0&limit=100");
  return {
    data: response.data,
  };
};

export const updateOrg = async (data: OrgModel): Promise<ApiOrgResponse> => {
  const response = await api.put(`/api/orgs/${data.id}`, data);
  return {
    data: response.data,
  };
};

export const deleteOrg = async (orgId: string): Promise<ApiSuccessResponse> => {
  const response = await api.delete(`/api/orgs/${orgId}`);
  return {
    data: response.data,
  };
};
