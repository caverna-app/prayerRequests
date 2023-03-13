import { Injectable } from '@angular/core';
import { baseGraphCMSFetch } from '../base_request';
import { prayerRequest } from '../interface/prayerRequest';

@Injectable({
  providedIn: 'root'
})
export class PrayerRequestsService {

  constructor() { }

  async save(params: prayerRequest) {
    const query = { 
      query: `mutation {
        createPrayerRequest(data: {
          name: "${params.name}",
          prayer: """${params.prayer}"""
        }) { id }
      }
    `};
    const response = await baseGraphCMSFetch(query);
    await this.publish(response?.data?.createPrayerRequest?.id);
    return response;
  }

  async publish(id: string) {
    const cmsQuery = {
      query: `mutation {
        publishPrayerRequest(to:PUBLISHED, where:{id: "${id}"}) {
            id
        }
      }
    `};

    return await baseGraphCMSFetch(cmsQuery);
  }

  async getAll() {
    const cmsQuery = {
      query: `query MyQuery {
        prayerRequests {
          id
          name
          prayer
          createdAt
        }
      }      
    `};

    return await baseGraphCMSFetch(cmsQuery);
  }

  async delete(id: string) {
    if (id){
      const cmsQuery = {
        query: `mutation {
          deletePrayerRequest(where:{id: "${id}"}) {
              id
          }
      }`};
      
      return await baseGraphCMSFetch(cmsQuery);
    }
  }
}
