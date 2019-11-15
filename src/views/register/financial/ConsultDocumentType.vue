<template>
  <div>
    <template>
      <b-container>
        <b-row class="mt-2">
          <b-col cols="12" md="9">
            <page-title icon="far fa-file-alt" main="Consultar Tipo de Documentos"></page-title>       
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col cols="12" md="9">
            <b-input-group prepend="Pesquisar:">
              <b-form-input v-model="searchItem" placeholder="Exemplo: Boleto"></b-form-input>
              <b-input-group-append>
                <b-button variant="outline-secondary" @click="getItem"><i class="fas fa-search"></i> Buscar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-col>
          <b-col cols="12" md="2">
            <router-link :to="{ name: 'CadastrarTipoDocumento', params: { actionMode:'save' }}">
              <b-button variant="primary"><i class="fas fa-plus"></i> Novo Documento</b-button>
            </router-link>
          </b-col>
        </b-row>
        <div class="mt-3" v-if="listOfDocumentType.length > 0">
          <b-table hover striped bordered fixed :items="listOfDocumentType" :fields="fields">
            <template v-slot:cell(actions)="data">
                <router-link :to="{ name: 'CadastrarTipoDocumento', params: { actionMode:'edit', selectedDocumentType: data.item }}">
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
import { RestConnection } from '../../../rest/rest.connection'
import PageTitle from '../../../components/template/PageTitle'

export default {
  name: 'ConsultTipoDocumento',
  components: {
		'page-title': PageTitle
	},
	data() {
		return {
			listOfDocumentType: [],
			searchItem: '',
			fields: [
				{
					key: 'id', label: 'Código', sortable: true
				},
				{
					key: 'tipoDocumento', label: 'Tipo do Documento', sortable: true
				},			
				{
					key: 'descricao', label: 'Descrição', sortable: true
				},			
				{ key: 'actions', label: 'Ações' }
			]
		}
	},
	methods: {
    getItem () {
      if (this.searchItem.length === 0) {
        this.getTypeDocument()
      } else {
        this.getTypeDocumentByName(this.searchItem)
      }
    },

    async getTypeDocument () {
      let response
      try {
        response = await RestConnection.get('tipo-documento/consultar/')
      } catch (exception) {
          if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
            return alert(exception.response.data.mensagem)
          } else {
            return alert("Não foi possível buscar a lista de Tipos de Documentos.")
          }
      }
      this.listOfDocumentType = response.data.conteudo
    },

    async getTypeDocumentByName (searchItem) {
      let response
      try {
          response = await RestConnection.get('tipo-documento/consultar/nome/' + searchItem)
        } catch (exception) {
            if (exception && exception.response && exception.response.data &&   exception.response.data.mensagem) {
              return alert(exception.response.data.mensagem)
            } else {
              return alert('Nenhum Tipo de Documento com este nome encontrado.')
            }
        }
        this.listOfDocumentType = response.data.conteudo
      }
	}

}
</script>

<style>

</style>