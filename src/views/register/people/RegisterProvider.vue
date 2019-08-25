<template>
	<div class="register-provider">
		<page-title icon="fas fa-truck" main="Cadastrar Fornecedores"></page-title> 
		<b-form>

			<b-button class="mr-5" block  type="submit" variant="primary">Salvar</b-button>
    </b-form>

		<div class="d-flex justify-content-start m-3 mt-5">
			<router-link :to="{ name: 'ConsultarFuncionarios'}">
				<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
				<div class="text-uppercase font-300">Voltar</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
	name: 'Cadastro de Empregado',
	components: {
		'page-title': PageTitle
	},
	data() {
		return {
			fornecedor: {
				id: 0,
				status: false,
				tipoFornecedor: '',
				documento: '',
				nomeFantasia: '',
				razaoSocial: '',
				inscEstadual: '',
				inscMunicipal: '',
				logradouro: {
					cep: '',
					rua: '',
					numero: '',
					complemento: '',
					bairro: '',
					pais: '',
					uf: '',
					cidade: ''
				},
				contato: {
					telefone: '',
					celular: '',
					email: '',
					homePage: '',
				}

			}
		}
	}


}
</script>

<style>

</style>