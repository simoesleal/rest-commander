<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="fab fa-creative-commons-nc" main="Consultar NCM"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input placeholder="Exemplo: 2201.10.00"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getNcms"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarNcm', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo NCM</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfNcms.length > 0">
          <b-table hover striped bordered fixed :items="listOfNcms" :fields="fields">
            <template slot="actions" slot-scope="data">
                <router-link :to="{ name: 'CadastrarNcm', params: { actionMode:'edit', selectedNcm: data.item }}">
                <b-button variant="outline-info" class="mr-5"><i class="fas fa-pencil-alt"></i> Alterar</b-button>
              </router-link>
            </template>
          </b-table>
        </div>
        <div class="d-flex justify-content-start m-3 mt-5">
          <router-link :to="{ name: 'CadastrosEstruturais'}">
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
  name: 'CrudNCM',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfNcms: [],
			ncmDBReturn: [
				{
					id: '01',
					ncm: '2201.10.00',
					description: 'Bebidas, líquidos alcoólicos e vinagres - Águas, incluindo as águas minerais, naturais ou artificiais, e as águas gaseificadas, não adicionadas de açúcar ou de outros edulcorantes nem aromatizadas; gelo e neve. - Águas minerais e águas gaseificadas',
				},
				{
					id: '02',
					ncm: '2203.00.00',
					description: 'Bebidas, líquidos alcoólicos e vinagres - Cervejas de malte. ',
				},
			],
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'ncm', label: 'NCM', sortable: true
				},				
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
		getNcms() {
			this.listOfNcms = this.ncmDBReturn
		}
	}

}
</script>

<style>

</style>