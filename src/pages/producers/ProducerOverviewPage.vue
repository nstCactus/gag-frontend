<template>
  <div class="producers-page">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Les producteurs du GAG</h1>
          <h2 class="subtitle">Sans eux, rien ne serait possible !</h2>
        </div>
      </div>
    </section>

    <section
      v-if="loading || loadingError"
      class="hero is-medium"
      :class="{ 'is-danger': loadingError }"
    >
      <div class="hero-body">
        <div class="container has-text-centered">
          <clip-loader :loading="loading" color="#00d1b2" size="100px" />

          <template v-if="loadingError">
            <h1 class="title">Erreur de chargement</h1>
            <h2 class="subtitle">{{ loadingError }}</h2>
          </template>
        </div>
      </div>
    </section>

    <template v-else>
      <producer-map-component
        :producers="producers"
        :loading="loading"
        :error="loadingError"
      />

      <producer-list-component
        :producers="producers"
        :loading="loading"
      />
    </template>
  </div>
</template>


<script lang="ts">
  import ProducerListComponent from '@/components/producers/ProducerListComponent.vue';
  import ProducerMapComponent from '@/components/producers/ProducerMapComponent.vue';
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
  import {Component, Vue} from 'vue-property-decorator';
  import ProducerModel from '../../models/ProducerModel';

  @Component({components: {ProducerListComponent, ProducerMapComponent, ClipLoader}})
  export default class ProducerOverviewPage extends Vue
  {
    producers: ProducerModel[] = [];
    loadingError: any = null;
    loading: boolean  = true;

    async created()
    {
      await this.populateProducers();
    }

    async populateProducers()
    {
      try {
        this.producers = await ProducerModel.findAll({
          fields: [
            'id',
            'raison_sociale',
            'siret',
            'slug',

            'presentation',
            'photo_de_presentation.*',

            'adresse',
            'numero',
            'rue',
            'code_postal',
            'ville',

            'email',
            'numero_de_telephone',
            'site_internet',

            'activites.*.*',
          ],
          filter: {
            'active': 'published',
          },
        });
      } catch (e) {
        console.error(e);// eslint-disable-line no-console
        this.loadingError = e.toString();
      } finally {
        this.loading = false;
      }
    }
  }
</script>


<style scoped lang="scss">
</style>
