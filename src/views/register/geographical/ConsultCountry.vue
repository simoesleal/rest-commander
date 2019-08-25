<template>
  <div>
    <template v-if="this.$route.path === '/cadastros-geografico/paises'">
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fas fa-flag" main="Consultar Países"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: Brasil"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getCountries"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo País</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfCountries.length > 0">
          <b-table hover striped bordered fixed :items="listOfCountries" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarPais', params: { actionMode:'edit', selectedCountry: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'Cadastros'}">
            <div><i class="fa fa-reply fa-2x m-r-5"></i></div>
            <div class="text-uppercase font-300">Voltar</div>
          </router-link>
        </div>
      </b-container>
    </template>
  </div>
</template>


<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'CrudPais',
  components: {
		'page-title': PageTitle
	},
  data() {
    return {
      countriesDBReturn: [
        { id: '01', nomePais: 'Brasil'},
        { id: '02', nomePais: 'Argentina'},
        { id: '03', nomePais: 'Paraguai'},
        { id: '04', nomePais: 'Chile'},
        { id: '05', nomePais: 'Peru'},
        { id: '06', nomePais: 'Costa Rica'},
        { id: '07', nomePais: 'Bolivia'},
        { id: '08', nomePais: 'México'},
      ],
      listOfCountries: [],
      fields: [
        { key: 'id', label: 'Código', sortable: true},
        { key: 'nomePais', label: 'Nome', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
/*   watch: {
		$route(to, from){}
	}, */
  methods: {
    getCountries() {
      this.listOfCountries = this.countriesDBReturn
    }
  }
}

</script>

<style>

</style>
