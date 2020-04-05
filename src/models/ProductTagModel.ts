import {Fields, Model} from '@vuex-orm/core';
import {Response} from '@vuex-orm/plugin-axios';
import {querify} from '@/utils/qs';

export default class ProductTagModel extends Model
{
  static entity = 'tags_des_produits';

  static fields(): Fields
  {
    return {
      id:  this.attr(null),
      nom: this.string(''),
    };
  }

  static fetchParams = {
    fields: ['*'],
    filter: {},
  };

  static async fetchOne(filters: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/tags_des_produits?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  static async fetchAll(filters?: any): Promise<Response>
  {
    const fetchParams = Object.assign({}, this.fetchParams);
    fetchParams.filter = Object.assign(fetchParams.filter, filters);

    const result = await this.api().get(`items/tags_des_produits?${querify(fetchParams)}`);
    return result.response.data.data;
  }

  id!: number;
  nom!: string;
}
