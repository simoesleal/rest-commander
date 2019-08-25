<template>
	<div class="consult-employee">
		<page-title icon="fas fa-user-tie" main="Consultar Funcionários"></page-title>
		<b-container>
			<b-row class="justify-content-md-center mt-3">
				<b-col cols="9">
					<b-input-group prepend="Pesquisar:">
						<b-form-input placeholder="Exemplo: Ana"></b-form-input>
						<b-input-group-append>                
							<b-button variant="outline-secondary" @click="getEmployee"><i class="fas fa-search"></i> Buscar</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-col>
				<b-col>
					<router-link :to="{ name: 'CadastrarFuncionario'}">
						<b-button variant="primary"><i class="fas fa-plus"></i> Novo Funcionário</b-button>
					</router-link>
				</b-col>
			</b-row>
			<b-alert v-model="alertChanged" variant="success" dismissible class="m-3 text-left">
				Funcionário alterado com sucesso!
				</b-alert>
			<b-alert v-model="alertCreated" variant="success" dismissible class="m-3 text-left">
				Funcionário criada com sucesso!
				</b-alert>
			<b-alert v-model="alertDeleted" variant="danger" dismissible class="m-3 text-left">
				Funcionário deletada com sucesso!
				</b-alert>
			<div class="d-flex justify-content-start m-3 mt-5">
				<router-link :to="{ name: 'CadastroPessoas'}">
					<div><i class="fa fa-reply fa-2x m-r-5"></i></div>
					<div class="text-uppercase font-300">Voltar</div>
				</router-link>
			</div>
		</b-container>
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'

export default {
	name: 'ConsultarDeEmpregado',
	components: {
		'page-title': PageTitle
	},

}
</script>

<style>

</style>