<template>
	<div>
		<div v-if="this.$route.path === '/cadastro-estoque'">
			<page-title icon="fas fa-boxes" main="Cadastro de Estoque"></page-title>
			<div class="row">
				<div class="col-12 col-md-6">
					<div class="material-card bg-fff">
						<div class="card-body">
							<h2 class="text-uppercase font-1-3em font-700">
								Grupo de Produtos
							</h2>
							<router-link :to="'cadastro-estoque/consulta-grupo-produto'" class="btn btn-info text-uppercase">
								Cadastrar
							</router-link>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-6">
					<div class="material-card bg-fff">
						<div class="card-body">
							<h2 class="text-uppercase font-1-3em font-700">
							Unidades de Medida
							</h2>
							<router-link :to="'cadastro-estoque/consulta-unidade-medida'" class="btn btn-info text-uppercase">
								Cadastrar
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import PageTitle from '../../../components/template/PageTitle'
export default {
	name: 'CadastroEstoque',
  components: {
		'page-title': PageTitle
	},
}
</script>

<style>

</style>