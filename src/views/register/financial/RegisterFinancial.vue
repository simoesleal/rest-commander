<template>
	<div>
		<div v-if="this.$route.path === '/cadastro-financeiro'">
			<page-title icon="fas fa-coins" main="Cadastro Financeiro"></page-title>
			<div class="row">
				<div class="col-12 col-md-4">
					<div class="material-card bg-fff">
						<div class="card-body">
							<h2 class="text-uppercase font-1-3em font-700">
								Tipo de Documento
							</h2>
							<router-link :to="'cadastro-financeiro/consulta-tipo-documento'" class="btn btn-info text-uppercase">
								Cadastrar
							</router-link>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="material-card bg-fff">
						<div class="card-body">
							<h2 class="text-uppercase font-1-3em font-700">
								Bancos
							</h2>
							<router-link :to="'cadastro-financeiro/consulta-banco'" class="btn btn-info text-uppercase">
								Cadastrar
							</router-link>
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="material-card bg-fff">
						<div class="card-body">
							<h2 class="text-uppercase font-1-3em font-700">
								Formas de Pagamento
							</h2>
							<router-link :to="'cadastro-financeiro/consulta-tipo-pagamento'" class="btn btn-info text-uppercase">
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
	name: 'CadastroFinanceiro',
  components: {
		'page-title': PageTitle
	},
}
</script>

<style>

</style>